import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrencyAll, getProject } from "../../api/apiEndpoints";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import TransactionTable from "../../utils/TransactionTable";
import CurrencyDropdown from "../../utils/buttons/CurrencyDropdown";
import { useLocation } from "react-router-dom";
import { Loader } from "../../utils/Loader";
import { InvestorDetails } from "../../redux/actions/investorActions";

const PortfolioMobile = () => {

  let CountryDropdown = CurrencyDropdown;

    const [transactions, setTransactions] = useState<any[]>([]);
    
    const [selectedProjectTransactions, setSelectedProjectTransactions] = useState<any[]>([]);
    
    const [accTransactions, setAccTransactions] = useState<any[]>([]);
  
    const [totalAmount, setTotalAmount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
  
    const [data, setData] = useState<{ name: string; value: number }[]>([]);
    const [transactionsData, setTransactionsData] = useState<{ name: string; value: number }[]>([]);
    const [graphProject, setGraphProject] = useState<number | null>(null); // Store the selected project ID
  
    const [selectedCurrency, setSelectCurrency] = useState<any>();
    const [selectedCurrencyVal, setSelectCurrencyVal] = useState<any>();
    const [countryWiseProjects, setCountryWiseProjects] = useState<any[]>([]);
    
    const [investorData, setInvestorData] = useState<InvestorDetails>();
  
    const { user, error, investor, accountsData, loading, projects } = useSelector((state: any) => ({
      loading: state.userDetails?.loading,
      user: state.userDetails?.user,
      error: state.userDetails?.error,
      investor: state.investorDetails?.investor,
      accountsData:state.investorAccsDetails?.accounts,
      projects: state.projectsDetail?.projects
    }));

    const [selectedCountry, setSelectCountry] = useState<any>();

    useEffect(() => {
      const fetchData = async () => {
        const allCurr = await getCurrencyAll()

        const assignedAcc = investor.accounts.map((acc: any) => {
          const currency = allCurr.find((curr: any) => curr.id === acc.currency); // Find matching currency
          return {
            currency: currency ? currency.name : "Unknown", // Use currency name if found
            id: acc.id,
            currencySymbol:currency.symbol
          };
        });
        setSelectCurrencyVal(assignedAcc)
      }
      fetchData()
    }, [])

    useEffect(() => {
      if(investor?.projects && selectedCountry) {
        const filteredProjects = investor?.projects?.filter((p:any) => p.countryName === selectedCountry)

        setCountryWiseProjects(filteredProjects);
      }
    }, [investor?.projects, selectedCountry])

    useEffect(() => {
      if(countryWiseProjects) {
        setGraphProject(countryWiseProjects[0]?.name)
      }
      setInvestorData(investor);
    }, [countryWiseProjects])

    const chartData = useMemo(() => {
      if (selectedProjectTransactions.length !== 0) {

        return selectedProjectTransactions;
      }
      return []; // Return an empty array or default value when there are no transactions
    }, [selectedProjectTransactions]);
    
    // ================================================================================================Line Chart

    
    // const formatAmount = (num:any) => {
    //   if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}m`;
    //   if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
    //   return num.toString();
    // };

    const formatAmount = (num:any) => {
      if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(1)}t`; // Trillion
      if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}b`; // Billion
      if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}m`; // Million
      if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`; // Thousand
      return num.toString(); // Less than 1,000
    };
    
      
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          
          const formattedTransactions = await Promise.all(
            accountsData.map(async (accounts: any) => {
              
              if (accounts.currency === selectedCurrency.id) {
                const validTransactions = await Promise.all(
                  accounts.transactions.map(async (transaction: any) => {
                    const project = await getProject(Number(transaction.projectId));
                    if (project.countryName === selectedCountry) {
                      return {
                        id: transaction.id,
                        accountId: accounts.currency,
                        credited: transaction.credited,
                        amount: transaction.amount,
                        createdDate: transaction.transactionDate,
                        userId: user.firstName, // Example if you want to include user data
                        projectId: project?.name,
                        details:transaction.details
                      };
                    }
                    return null;
                  })
                );
                return validTransactions.filter((t) => t !== null);
              }
              return []; // Return an empty array if currency does not match
            })
          );
        
          
          // setInvestorId(Number(id))
          setTransactions(formattedTransactions.flat()); // Set the fetched and formatted data to state
        } catch (err) {
          console.log('Failed to fetch transactions');
        }
      };
  
      fetchTransactions(); // Call the fetch function
    }, [accountsData, selectedCountry, selectedCurrency]);
  
  
    useEffect(() => {
      const accTransaction =
        transactions?.filter((t) => t?.accountId === selectedCurrency?.currencyName) || [];
  
        const projectWiseTransaction =
        transactions?.filter((t) => t.projectId === graphProject) || null;
    
      setAccTransactions(accTransaction);
      setSelectedProjectTransactions(projectWiseTransaction)
    }, [selectedCurrency, transactions]);
  
    useEffect(() => {
      const projectWiseTransaction =
      transactions?.filter((t) => t.projectId === graphProject) || null;
  
      setSelectedProjectTransactions(projectWiseTransaction)
    }, [graphProject, transactions]);
  
    useEffect(() => {
      // Calculate total transaction amount
      const total = transactions.reduce(
        (sum, t) => (t.credited ? sum + t.amount : sum),
        0
      );

      setTotalAmount(total);
      // Calculate unique project count
      const uniqueProjects = new Set(accTransactions.map((t) => t.projectId)).size;
  
      setProjectCount(uniqueProjects);

      const fetchTransactions = async () => {
        try {
          
          const formattedTransactions = await Promise.all(
            accountsData.map(async (accounts: any) => {              
              const validTransactions = await Promise.all(
                accounts.transactions.map(async (transaction: any) => {
                  if(transaction.credited){
                    const project = await getProject(Number(transaction.projectId));
                      return {
                        id: transaction.id,
                        accountId: accounts.currency,
                        credited: transaction.credited,
                        amount: transaction.amount,
                        createdDate: transaction.transactionDate,
                        userId: user.firstName, // Example if you want to include user data
                        projectId: project?.name
                      };
                    } else return null
                  })
                );
                return validTransactions.filter((t) => t !== null);
              })
            );          
          // Aggregate investments by projectId
          const aggregatedData = formattedTransactions.flat().reduce((acc, { projectId, amount }) => {
            const existingProject = acc.find((item:any) => item.projectName === projectId);
            if (existingProject) {
              existingProject.investmentAmount += amount;
            } else {
              acc.push({ projectName: projectId, investmentAmount: amount });
            }
            return acc;
          }, []);
          setData(aggregatedData);
        } catch (err) {
          console.log('Failed to fetch transactions');
        }
      };

      fetchTransactions();
      
    }, [accTransactions]);
  
    useEffect(() => {
      // Calculate total transaction amount
      const total = transactions.reduce(
        (sum, t) => (t.credited ? sum + t.amount : sum),
        0
      );
      
      // Calculate unique project count
      const uniqueProjects = new Set(transactions.map((t) => t.projectId)).size;
  
      setTotalAmount(total);
      setProjectCount(uniqueProjects);
      
      const aggregatedData = transactions.reduce((acc, { projectId, amount, credited }) => {
        const fetchproject = projects.find((item: any) => item.name === projectId);
        const existingProject = acc.find((item: any) => item.projectId === projectId);
        if (existingProject) {
          if (credited) {
            existingProject.creditedTotal += amount;
          } else {
            existingProject.debitedTotal += amount;
          }
          existingProject.investmentAmount = existingProject.creditedTotal - existingProject.debitedTotal;
        } else {
          acc.push({
            projectId,
            creditedTotal: credited ? amount : 0,
            debitedTotal: credited ? 0 : amount,
            investmentAmount: credited ? amount : -amount,
            overallCost:fetchproject.overallCost
          });
        }
        
        return acc;
      }, []);
      

      setTransactionsData(aggregatedData);
    }, [transactions]);
    
    const COLORS = ['#01276C', '#3476ec59', '#FF8042']; // Define colors for the pie segments
  

    if (loading) {
      return (
        <div className="smart-glass">
        <div className="logo">
          <div className="circle">
            <div className="circle">
              <div className="circle">
              </div>
            </div>
          </div>
          <div className="loading-text">
            Loading...
          </div>
        </div>
      </div>
      );
    }

    if (error || user.length === 0) {
      return (
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      );
    }
  
    // Check if the user has a "Viewer" role
    const isViewer = user?.roles?.some((role: any) => role.name === "Viewer");
  
    if (isViewer) {
      return (
        <div className="_dashboard_no-investments-container _dashboard_no-investments-container_web">
          <p className='_h1'>You have no invested amount.</p>
        </div>
      );
    }
  
    const totalInvestment = data.reduce((acc, cur:any) => acc + cur.investmentAmount, 0);

    const formatDate = (dateString:string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
      }).format(date);
    };


  return (
      <>
          <section className="_portfolio-mobile">
              <div className="_portfolio-mobile_wrapper _container">
                  <div style={{display:'flex', justifyContent:'space-around'}}>
                    <CountryDropdown projects={investor?.projects} selectedProjectName={null}  setSelectCountry={setSelectCountry} />
                    <CurrencyDropdown currency={selectedCurrencyVal} setSelectCurrency={setSelectCurrency} />
                  </div> 
                  {
                    transactionsData.length !== 0 ?
                    (
                        <div className="_portfolio-mobile_projects _container">
                            <Splide
                                options={{
                                    gap: "26px",
                                    drag: "free",
                                    arrows: false,
                                    // focus: 'center',
                                    pagination: true,
                                    breakpoints: {
                                        480: {
                                            perPage: 1,
                                        },
                                        768: {
                                            perPage: 1,
                                        },
                                        992: {
                                            perPage: 1,
                                        },
                                        1024: {
                                            perPage: 1,
                                        }
                                    },
                                    autoScroll: {
                                        pauseOnHover: true,
                                        pauseOnFocus: false,
                                        rewind: false,
                                        speed: 0.8,
                                    },
                                }}
                            >
                              <>
                                  {
                                    countryWiseProjects && countryWiseProjects?.map((project: any, index: number) => (<>
                                      {
                                        transactionsData?.length > 0 ? (
                                          transactionsData.some((p: any) => p.projectId === project.name) ? (
                                            transactionsData
                                              .filter((p: any) => p.projectId === project.name)
                                              .map((investment: any, idx: number) => (
                                      <SplideSlide
                                              key={idx}
                                            >
                                          <div
                                            className={`_dashboard-mobile_project_details_card ${graphProject === project.name
                                                ? '_dashboard-mobile_project_details_card_active'
                                                : ''
                                              }`}
                                            onClick={() => setGraphProject(project.name)}
                                          >
                                            <div className="_dashboard-mobile_project_details_card_header">
                                              <h4 className="_dashboard-mobile_project_details_card_title _title_h1">
                                                {project.name}:
                                              </h4>
                                              <figure className="_dashboard-mobile_project_details_card_media_wrapper">
                                                <img
                                                  className="_dashboard-mobile_project_details_card_media"
                                                  // alt={`${project.name}`}
                                                />
                                              </figure>
                                            </div>
                                            <div className="_dashboard-mobile_project_details_card_info_wrapper">
                                              <div className="_dashboard-mobile_project_details_card_info">
                                                <div className="_dashboard-mobile_project_details_card_info_name">
                                                  Amount invested
                                                </div>
                                                <div className="_dashboard-mobile_project_details_card_info_value">
                                                {selectedCurrency?.currencySymbol}{investment.creditedTotal !== undefined && investment.creditedTotal !== null ? formatAmount(investment.creditedTotal) : 0}
                                                </div>
                                              </div>
                                              <div className="_dashboard-mobile_project_details_card_info">
                                                <div className="_dashboard-mobile_project_details_card_info_name">
                                                  Current value
                                                </div>
                                                <div className="_dashboard-mobile_project_details_card_info_value">
                                                {selectedCurrency?.currencySymbol}{investment.investmentAmount !== undefined && investment.investmentAmount !== null ? formatAmount(investment.investmentAmount) : 0}
                                                </div>
                                              </div>
                                              <div className="_dashboard-mobile_project_details_card_info">
                                                <div className="_dashboard-mobile_project_details_card_info_name">
                                                  Lock-in period
                                                </div>
                                                <div className="_dashboard-mobile_project_details_card_info_value">
                                                  0
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </SplideSlide>                                                                                            ))
                                                  ) : (
                                                    <div className='_dashboard_project_details_card_info_value'></div>
                                                  )
                                                ) : (
                                                  <div className='_dashboard_project_details_card_info_value'>{selectedCurrency?.currencySymbol}0</div>
                                                )
                                              }
                                              </>
                                    ))
                                  }
                              </>
                            </Splide>
                        </div>
                      
                    ):
                    null
                  }
                  {
            
                    transactionsData.length !== 0 ?
                  <div className="_portfolio-mobile_graph">
                      <div className='_dashboard-mobile_project_details_graph_section'>
                          <TransactionTable data={chartData} currency={selectedCurrency}/>
                      </div>
                  </div>
                  :
                  null
                  }
              </div>
          </section>  
      </>
  );
}
 
export default PortfolioMobile;