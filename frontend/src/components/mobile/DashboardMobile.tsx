import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import '@splidejs/splide/css'; // Import Splide styles
import { getCurrencyAll, getProject } from '../../api/apiEndpoints';
import CurrencyDropdown from '../../utils/buttons/CurrencyDropdown';
import CountryDropdown from '../../utils/buttons/CountryDropdown';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../utils/Loader';

const DashboardMobile = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    
    const [accTransactions, setAccTransactions] = useState<any[]>([]);
  
    const [totalAmount, setTotalAmount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);

    const [selectedCurrencyVal, setSelectCurrencyVal] = useState<any>();

    const [data, setData] = useState<{ name: string; value: number }[]>([]);
  
    const [selectedCurrency, setSelectCurrency] = useState<any>();
    const [LoaderState, setLoader] = useState<boolean>(false);
    
    const [transactionsData, setTransactionsData] = useState<{ name: string; value: number }[]>([]);

    const navigate = useNavigate();
  
    const { user, error, investor, accountsData, loading, projects } = useSelector((state: any) => ({
      loading: state.userDetails?.loading,
      user: state.userDetails?.user,
      error: state.userDetails?.error,
      investor: state.investorDetails?.investor,
      accountsData:state.investorAccsDetails?.accounts,
      projects: state.projectsDetail?.projects
    }));

        useEffect(() => {
          const fetchData = async () => {
            const allCurr = await getCurrencyAll()
            if(investor) {

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
            }
          fetchData()
        }, [investor])
    
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          
          setLoader(true)
          const formattedTransactions = await Promise.all(
            accountsData.map(async (accounts: any) => {
              
              if (accounts.currency === selectedCurrency.id) {
                const validTransactions = await Promise.all(
                  accounts.transactions.map(async (transaction: any) => {
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
                  })
                );
                return validTransactions.filter((t) => t !== null);
              }
              return []; // Return an empty array if currency does not match
            })
          );
        
          // setInvestorId(Number(id))
          setTransactions(formattedTransactions.flat()); // Set the fetched and formatted data to state
          setLoader(false);
        } catch (err) {
          console.log('Failed to fetch transactions');
        }
      };
  
      fetchTransactions(); // Call the fetch function
    }, [accountsData, selectedCurrency]);

    useEffect(() => {
      const accTransaction =
        transactions?.filter((t) => t.accountId === selectedCurrency?.id) || [];
    
      setAccTransactions(accTransaction);
  
    }, [selectedCurrency, transactions]);

    const formatAmount = (num:any) => {
      if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(1)}t`; // Trillion
      if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}b`; // Billion
      if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}m`; // Million
      if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`; // Thousand
      return num.toString(); // Less than 1,000
    };
  
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
        <Loader/>
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
        <div className="_dashboard-mobile_no-investments-container _dashboard-mobile_no-investments-container_mobile">
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

    // Handle click on project pie slice
    const handleProjectClick = (data:any) => {
      navigate('portfolio',{
        state:{
          projectName:data.projectName
        }
      })
    };

    return (
        <>
          <section className='_dashboard-mobile'>
            <div className='_container _dashboard-mobile_wrapper'>
              <nav className='_dashboard-mobile_nav'>
                <div className='_dashboard-mobile_nav_top'>
                  <p className='_dashboard-mobile_nav_greeting'>Hello {user.firstName} {user.lastName}</p>
                  <h1 className='_dashboard-mobile_welcome-message _h1'>Welcome to your portfolio</h1>
                </div>
                <div className='_dashboard-mobile_nav_bottom'>
                  <div className='_dashboard-mobile_nav_status-section'>
                    <p className="_dashboard-mobile_nav_status-label">Account status</p>
                    <div className="_dashboard-mobile_nav_status">
                      <span className="_dashboard-mobile_nav_status-indicator">
                        <span className={`${user?.status == 'active' ? `_dashboard-mobile_nav_status-circle` : `_dashboard-mobile_nav_status-circle _dashboard-mobile_nav_status-circle_inactive`}`}></span>
                        <p className="_dashboard-mobile_nav_status-text">{user.status}</p>
                      </span>
                      <p className="_dashboard-mobile_nav_status-date">Since {formatDate(user.updatedAt)}</p>
                    </div>
                  </div>
                  {
                    investor?.accounts && investor?.accounts?.length > 0 ? 
                    <div className='_dashboard-mobile_nav_currency'>
                      <div className="_dashboard-mobile_nav_currency-select">
                        <CurrencyDropdown currency={selectedCurrencyVal} setSelectCurrency={setSelectCurrency}/>
                      </div>
                    </div>
                    :
                    null
                  }
                </div>
              </nav>
              {
                  investor?.accounts && investor?.accounts.length > 0 && transactions.length > 0 ? 
                  <div className="_dashboard-mobile_content">
                    <div className='_dashboard-mobile_overall_investment'>
                      <div className='_dashboard-mobile_overall_investment_info'>
                        <h2 className='_dashboard-mobile_overall_investment_info-label _sub_h2'>Overall Investment</h2>
                        <div className='_dashboard-mobile_overall_investment_info_details'>
                          <div className='_dashboard-mobile_overall_investment_info_detail'>
                            <h6 className='_dashboard-mobile_overall_investment_info_detail-title _title_h2'>Total assets</h6>
                            <span className='_dashboard-mobile_overall_investment_info_detail-value'>{selectedCurrency?.currencySymbol} {formatAmount(totalAmount)}</span>
                          </div>
                          <hr className='_dashboard-mobile_overall_investment_info_detail-divider'/>
                          <div className='_dashboard-mobile_overall_investment_info_detail'>
                            <h6 className='_dashboard-mobile_overall_investment_info_detail-title _title_h2'>Total interest</h6>
                            <span className='_dashboard-mobile_overall_investment_info_detail-value'>0</span>
                          </div>
                          <hr className='_dashboard-mobile_overall_investment_info_detail-divider'/>
                          <div className='_dashboard-mobile_overall_investment_info_detail'>
                            <h6 className='_dashboard-mobile_overall_investment_info_detail-title _title_h2'>Total Projects</h6>
                            <span className='_dashboard-mobile_overall_investment_info_detail-value'>{projectCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='_dashboard-mobile_project_details'>
                      <h2 className='_dashboard-mobile_project_details_label _sub_h2'>Projects Overview</h2>
                      {/* <div className='_dashboard-mobile_project_details_info'>
                          <div className='_dashboard-mobile_project_details_cards'>
                          {countryWiseProjects
                                      .map((selectedProject: any) => (
                                        <>
                                          {transactionsData ?
                                            transactionsData
                                              .filter((project: any) => project.projectId === selectedProject.name)
                                              .map((selectedProjectInvestment: any, index:any) => (
                                    <div className={`_dashboard-mobile_project_details_card `} key={index}>
                                      <div className='_dashboard-mobile_project_details_card_header'>
                                        <div className='_dashboard-mobile_project_details_card_header_top'>
                                          <h4 className='_dashboard-mobile_project_details_card_title _title_h1'>{selectedProject.name}:</h4>
                                          <p className='_dashboard-mobile_project_details_card_status-label'>Project Status</p>
                                        </div>
                                        <div className='_dashboard-mobile_project_details_card_header_bottom'>
                                          <p className='_dashboard-mobile_project_details_card_location'>Location: Gurugram</p>
                                          <p className='_dashboard-mobile_project_details_card_status'>In Progress</p>
                                        </div>
                                      </div>
                                      <hr className='_dashboard-mobile_project_details_card_divider'/>
                                      <div className='_dashboard-mobile_project_details_card_info_wrapper'>
                                        <div className='_dashboard-mobile_project_details_card_info'>
                                          <div className='_dashboard-mobile_project_details_card_info_name'>
                                          Amount invested
                                          </div>
                                          <div className='_dashboard-mobile_project_details_card_info_value'>
                                          {selectedCurrency?.currencySymbol}{formatAmount(selectedProjectInvestment.creditedTotal)}
                                          </div>
                                        </div>
                                        <div className='_dashboard-mobile_project_details_card_info'>
                                          <div className='_dashboard-mobile_project_details_card_info_name'>
                                          Current value
                                          </div>
                                          <div className='_dashboard-mobile_project_details_card_info_value'>
                                          {selectedCurrency?.currencySymbol}{formatAmount(selectedProjectInvestment.investmentAmount)}
                                          </div>
                                        </div>
                                        <div className='_dashboard-mobile_project_details_card_info'>
                                          <div className='_dashboard-mobile_project_details_card_info_name'>
                                          Lock-in period
                                          </div>
                                          <div className='_dashboard-mobile_project_details_card_info_value'>
                                          {formatDate(selectedProject.startDate)}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                              ))
                                              :
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
                                            }
                                          </>
                                        ))}
                          </div>
                      </div> */}
                    </div>
                    <div className='_dashboard-mobile_overall_investment_graph'>
                        <PieChart width={200} height={200}>
                          <Pie
                            data={data}
                            cx={100}
                            cy={100}
                            fill="#8884d8"
                            dataKey="investmentAmount"
                            onClick={handleProjectClick}
                          >
                            {data.map((_, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          {/* <Tooltip /> */}
                          <Tooltip
                            formatter={(value, _, entry) => {
                              // Ensure to access the currency correctly
                              const name = entry.payload.projectName; // Access currency from payload
                              return [`${name}: ${formatAmount(value)}`]; // Return formatted value as an array
                            }}
                          />
                        </PieChart>
                        <div className='recharts-labels-wrapper' style={{ position: 'absolute', right:'3rem' }}>
                          {data.map((entry:any, index) => {
                            const percentage = ((entry.investmentAmount / totalInvestment) * 100).toFixed(2);
                            return (
                              <div
                                key={index}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  gap: '10px',
                                  marginBottom: '5px',
                                }}
                              >
                                <div
                                  style={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: COLORS[index % COLORS.length],
                                    borderRadius: '50%',
                                  }}
                                ></div>
                                <span>{percentage}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                  </div>
                  :
                  (
                    LoaderState ?
                    <Loader/>
                    :
                  <div className="_dashboard-mobile_no-account-container">
                    <p className='_h1'>You have no any transaction.</p>
                  </div>      

                  )
                }
            </div>
          </section> 
        </>
    );
}
 
export default DashboardMobile;