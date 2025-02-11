import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getProject } from "../../api/apiEndpoints";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import TransactionTable from "../../utils/TransactionTable";
import CountryDropdown from "../../utils/buttons/CountryDropdown";
import CurrencyDropdown from "../../utils/buttons/CurrencyDropdown";
import { useLocation } from "react-router-dom";
import { Loader } from "../../utils/Loader";

const PortfolioMobile = () => {

  const [transactions, setTransactions] = useState<any[]>([]);    
  const [selectedCountry, setSelectCountry] = useState<any>();
  const [selectedProjectName, setSelectedProjectName] = useState<any>(null);
  const [transactionsData, setTransactionsData] = useState<any[]>([]);
  const [selectedCurrency, setSelectCurrency] = useState<any>();
  const [selectedProjectTransactions, setSelectedProjectTransactions] = useState<any[]>([]);    
  const [countryWiseProjects, setCountryWiseProjects] = useState<any[]>([]);
  const [graphProject, setGraphProject] = useState<number | null>(null); // Store the selected project ID

  const location = useLocation();
  const splideRef = useRef<any>(null);
  
  
  const { user, error, investor, accountsData, loading, projects } = useSelector((state: any) => ({
    loading: state.userDetails?.loading,
    user: state.userDetails?.user,
    error: state.userDetails?.error,
    investor: state.investorDetails?.investor,
    accountsData: state.investorAccsDetails?.accounts,
    projects: state.projectsDetail?.projects,
  }));

    // Set selected project based on location
  useEffect(() => {
    const projectName = location.state?.projectName;
    const project = projects.find((p: any) => p.name === projectName) || null;
    setSelectedProjectName(project);
  }, [location.state, projects]);

  // Filter projects by country
  useEffect(() => {
    if (investor?.projects && selectedCountry) {
      const filteredProjects = investor.projects.filter(
        (p: any) => p.countryName === selectedCountry
      );
      setCountryWiseProjects(filteredProjects);
    }
  }, [investor?.projects, selectedCountry]);

  // Set graph project dynamically
  useEffect(() => {
    const project = selectedProjectName || countryWiseProjects[0] || null;
  }, [selectedProjectName, countryWiseProjects]);

  useEffect(() => {
    if(selectedProjectName) {
      const country = projects.find((p:any) => p.countryName == selectedProjectName.countryName)
      setSelectCountry(country.countryName)
    }
  }, [selectedProjectName, projects])
    

  const chartData = useMemo(() => {
    if (selectedProjectTransactions.length !== 0) {

      return selectedProjectTransactions;
    }
    return []; // Return an empty array or default value when there are no transactions
  }, [selectedProjectTransactions]);
    
  // Aggregate transactions
  useEffect(() => {
    const aggregatedData = transactions.reduce((acc, transaction) => {
      const { projectId, amount, credited } = transaction;
      const project = projects.find((p: any) => p.name === projectId);
      const existing = acc.find((item: any) => item.projectId === projectId);
      
      if (existing) {
        credited ? (existing.creditedTotal += amount) : (existing.debitedTotal += amount);
        existing.investmentAmount = existing.creditedTotal - existing.debitedTotal;
      } else {
        acc.push({
          projectId,
          creditedTotal: credited ? amount : 0,
          debitedTotal: credited ? 0 : amount,
          investmentAmount: credited ? amount : -amount,
          overallCost: project?.overallCost,
        });
      }
      return acc;
    }, []);
    setTransactionsData(aggregatedData);
  }, [transactions, projects]);
  

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!accountsData || !selectedCountry || !selectedCurrency) return;
      try {
        const formattedTransactions = accountsData
        .filter((account: any) => account.currency === selectedCurrency.currencyName)
        .flatMap((account: any) =>
          account.transactions
        .map((transaction: any) => {
          const project = projects.find(
            (p: any) => p.id === transaction.projectId && p.countryName === selectedCountry
          );

          if (project) {
            return {
                  id: transaction.id,
                  accountId: selectedCurrency.currencyName,
                  credited: transaction.credited,
                  amount: transaction.amount,
                  createdDate: transaction.transactionDate,
                  details:transaction.details,
                  userId: user.firstName, // Example if you want to include user data
                  projectId: project?.name
                };
              }
              return null;
            })
            .filter(Boolean)
          );
          
          // setInvestorId(Number(id))
          setTransactions(formattedTransactions); // Set the fetched and formatted data to state
      } catch (err) {
        console.log('Failed to fetch transactions');
      }
    };

    fetchTransactions(); // Call the fetch function
  }, [accountsData, selectedCountry, selectedCurrency, projects]);
  // console.log()

  useEffect(() => {
    
    const projectWiseTransaction =
    transactions?.filter((t) => t.projectId === graphProject) || null;
  
    setSelectedProjectTransactions(projectWiseTransaction)
  }, [selectedCurrency, transactions, graphProject]);
  

  useEffect(() => {
    if (selectedProjectName && splideRef.current) {
      const targetIndex = transactionsData.findIndex(
        (transaction) => transaction.projectId === selectedProjectName.name
      );
      
      if (targetIndex !== -1) {
        splideRef.current.go(targetIndex);
      }
    }
  }, [selectedProjectName, transactionsData]);

  useEffect(() => {
    if(selectedProjectName) {
      setGraphProject(selectedProjectName?.name)
    } else {
      setGraphProject(countryWiseProjects[0]?.name)
    }
  }, [selectedProjectName, countryWiseProjects])

  
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
  
  if (error) {
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
      <div className="_dashboard-mobile_no-investments-container _dashboard-mobile_no-investments-container_mobile">
        <p className='_h1'>You have no invested amount.</p>
      </div>
    );
  }
  
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
  };
  
  const formatAmount = (num:any) => {
    if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(1)}t`; // Trillion
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}b`; // Billion
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}m`; // Million
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`; // Thousand
    return num.toString(); // Less than 1,000
  };
  
  return (
      <>
          <section className="_portfolio-mobile">
              <div className="_portfolio-mobile_wrapper _container">
                  <div style={{display:'flex', justifyContent:'space-around'}}>
                    <CountryDropdown projects={investor?.projects} selectedProjectName={selectedProjectName}  setSelectCountry={setSelectCountry} />
                    <CurrencyDropdown currency={investor?.accounts} setSelectCurrency={setSelectCurrency} />
                  </div> 
                  {
                    transactionsData.length !== 0 ?
                    (
                        <div className="_portfolio-mobile_projects _container">
                            <Splide
                                ref={splideRef}
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
                            {
                              countryWiseProjects.length !== 0 ?
                              countryWiseProjects.map((project: any, index: number) => (
                                <React.Fragment key={index}>
                                  {transactionsData.length !== 0 ? (
                                    transactionsData
                                      .filter((transaction: any) => transaction.projectId === graphProject)
                                      .map((selectedProjectInvestment: any, transactionIndex: number) => (
                                      <SplideSlide
                                              key={transactionIndex}
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
                                                  {selectedCurrency?.currencySymbol}
                                                  {formatAmount(selectedProjectInvestment.creditedTotal)}
                                                </div>
                                              </div>
                                              <div className="_dashboard-mobile_project_details_card_info">
                                                <div className="_dashboard-mobile_project_details_card_info_name">
                                                  Current value
                                                </div>
                                                <div className="_dashboard-mobile_project_details_card_info_value">
                                                  {selectedCurrency?.currencySymbol}
                                                  {formatAmount(selectedProjectInvestment.creditedTotal - selectedProjectInvestment.debitedTotal)}
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
                                        </SplideSlide>
                                      ))
                                    ) : (
                                      <>

                                      </>
                                    )}
                                </React.Fragment>
                              ))

                              :

                              <Loader/>
                            }

                            </Splide>
                        </div>
                      
                    ):
                    <Loader/>
                  }
                  <div className="_portfolio-mobile_graph">
                      <div className='_dashboard-mobile_project_details_graph_section'>
                          <TransactionTable data={chartData} currency={selectedCurrency}/>
                      </div>
                  </div>
              </div>
          </section>  
      </>
  );
}
 
export default PortfolioMobile;