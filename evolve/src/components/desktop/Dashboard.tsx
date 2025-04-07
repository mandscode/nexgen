import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css'; // Import Splide styles
import { getCurrencyAll, getProject, getProjects } from '../../api/apiEndpoints';
import CurrencyDropdown from '../../utils/buttons/CurrencyDropdown';
import { InvestorDetails } from '../../redux/actions/investorActions';
import TransactionTable from '../../utils/TransactionTable';

export class UserRespDTO {
  id!:number;
  firstName!:string;
  lastName!:string;
  status!:number;
  createdAt!:string;
  message?:string;
  Currencies?:CurrenciesRespDTO[];
  Investments?:InvestmentRespDTO[];
  projects?:ProjectRespDTO[];
}

export class ProjectRespDTO {
  id!:number;
  name!:string;
  address!:string;
  country!:string;
  latitude?:string;
  longitude?:string;
  startDate!:string;
  actualMaturityDate!:string;
  overallCost!:number;
  description!:string;
  ownerName!:string;
  legalId!:number;
}

export class InvestmentRespDTO {
  id!:number;
  ProjectId!:number;
  currencyId!:number;
  maturityLockingPeriod!:number;
  investedAmount!:number;
  totalValue!:number;
  transactions!:TransactionRespDTO[];
}

export class TransactionRespDTO {
  id!:number;
  title!:string;
  date!:string;
  credited!:boolean;
  amount!:number;
}

export class CurrenciesRespDTO {
  id!:number;
  name!:string;
  symbol!:string;
}

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState<UserRespDTO | null>(null);

  const [selectedCurrencyTransactions, setSelectedCurrencyTransactions] = useState<any[]>([]);
  const [selectedCurrencyInvestments, setSelectedCurrencyInvestments] = useState<any[]>([]);
  const [selectedCurrencyProjects, setSelectedCurrencyProjects] = useState<any[]>([]);
  const [selectedProjectTransactions, setSelectedProjectTransactions] = useState<any[]>([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [interest, setTotalInterest] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  const [graphProject, setGraphProject] = useState<number | null>(null);

  const [selectedCurrency, setSelectCurrency] = useState<any>();

  const { user, error, loading } = useSelector((state: any) => ({
    loading: state.userDetails?.loading,
    user: state.userDetails?.user,
    error: state.userDetails?.error
  }));


  useEffect(() => {
    if (user && user.id) {
      setUserDetails(user);
    }
  }, [user])



  const chartData = useMemo(() => {
    return selectedProjectTransactions.length > 0 ? selectedProjectTransactions : [];
  }, [selectedProjectTransactions]);

  // ================================================================================================Line Chart

  const formatAmount = (num: any) => {
    if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(1)}t`; // Trillion
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}b`; // Billion
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}m`; // Million
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`; // Thousand
    return num.toString(); // Less than 1,000
  };


  useEffect(() => {
    const fetchTransactions = async () => {
      try {

        if (
          userDetails?.Investments &&
          userDetails.Investments.length > 0 &&
          selectedCurrency
        ) {
          const UniqueInvestment: any[] = []
          const formattedTransactions = await Promise.all(
            userDetails.Investments.map(async (investment: any) => {
              if (investment.currencyId === selectedCurrency.id) {
                UniqueInvestment.push(investment);
                const projectId = investment?.ProjectId
                const currencies = userDetails.Currencies || []
                const currency = currencies.find(p => p.id === investment.currencyId);

                const validTransactions = await Promise.all(
                  investment.transactions.map(async (transaction: any) => {
                    return {
                      id: transaction.id,
                      currency: currency,
                      credited: transaction.credited,
                      amount: transaction.amount,
                      createdDate: transaction.date,
                      projectId: projectId,
                      details: transaction.title
                    };
                  })
                );

                return validTransactions;
              }
              return [];
            })
          );
          setSelectedCurrencyInvestments(UniqueInvestment);
          setSelectedCurrencyTransactions(formattedTransactions.flat());
        }
      } catch (err) {
        console.log('Failed to fetch transactions');
      }
    };

    fetchTransactions(); // Call the fetch function
  }, [selectedCurrency, userDetails]);

  useEffect(() => {

    const projectWiseTransaction =
      selectedCurrencyTransactions?.filter((t) => t.projectId === graphProject) || null;

    setSelectedProjectTransactions(projectWiseTransaction)
  }, [selectedCurrencyTransactions]);

  useEffect(() => {
    if (selectedCurrencyProjects) {
      setGraphProject(selectedCurrencyProjects[0]?.id)
    }

  }, [selectedCurrencyProjects])

  useEffect(() => {
    const projectWiseTransaction =
      selectedCurrencyTransactions?.filter((t) => t.projectId === graphProject) || null;

    setSelectedProjectTransactions(projectWiseTransaction)
  }, [graphProject]);


  useEffect(() => {

    const totalAsset = selectedCurrencyInvestments.reduce(
      (sum, t) => (sum + Number(t.totalValue)),
      0
    );
    const totalInvested = selectedCurrencyInvestments.reduce(
      (sum, t) => (sum + Number(t.earning)),
      0
    );

    setTotalAmount(totalAsset);
    setTotalInterest(totalInvested);

    const uniqueProjects = new Set(selectedCurrencyTransactions.map((t) => t.projectId)).size;

    setProjectCount(uniqueProjects);


    let uniqueData: any[] = [];

    const aggregatedData = selectedCurrencyTransactions.flat().reduce((acc, { projectId, amount, credited }) => {
      const projects = userDetails?.projects || [];
      const project = projects.find(p => p.id === projectId);
      let existingProject = acc.find((item: any) => item.id === projectId);

      if (!existingProject) {
        existingProject = { ...project, investmentAmount: 0 }; // Initialize if not found
        acc.push(existingProject);
      }

      if (credited) {
        existingProject.investmentAmount += Number(amount);
      }

      // Ensure uniqueData gets a proper reference
      if (!uniqueData.some((p) => p.id === projectId)) {
        uniqueData.push(existingProject);
      }

      return acc;
    }, []);

    setSelectedCurrencyProjects(uniqueData);
    setData(aggregatedData);

  }, [selectedCurrencyTransactions]);

  const COLORS = ['#2A333A', '#09BB81', '#FF8042'];

  const selectedProject = selectedCurrencyProjects?.find((p: ProjectRespDTO) => p.id === graphProject)
  const selectedInvestment = selectedCurrencyInvestments?.find((inv: InvestmentRespDTO) => inv.ProjectId === graphProject)

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
      <div className="_dashboard_no-account-container">
        <p className='_h1'>{error}</p>
      </div>
    );
  }


  const totalInvestment = data.reduce((acc, cur: any) => acc + cur.investmentAmount, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
  };


    return (
        <>
          <section className='_dashboard'>
            <div className='_container _dashboard_wrapper'>
              <nav className='_dashboard_nav'>
                <div className='_dashboard_nav_top'>
                  <div className='_dashboard_nav_top_left'>
                    <p className='_dashboard_nav_greeting'>Hello {userDetails?.firstName} {userDetails?.lastName}</p>
                    <h1 className='_dashboard_welcome-message _h1'>Welcome to your portfolio</h1>
                  </div>
                  <div className='_dashboard_nav_top_right'>
                    <p className="_dashboard_nav_status-label">Account status</p>
                    <div className="_dashboard_nav_status">
                      <span className="_dashboard_nav_status-indicator">
                        <span className={`${user?.status == 1 ? `_dashboard_nav_status-circle` : `_dashboard_nav_status-circle _dashboard_nav_status-circle_inactive`}`}></span>
                        <p className="_dashboard_nav_status-text">{user.status == 1 ? 'Active' : 'Inactive' }</p>
                      </span>
                      <p className="_dashboard_nav_status-date">Since {user?.createdAt && formatDate(user?.createdAt)}</p>
                    </div>
                  </div>
                </div>
                {
                  userDetails?.Currencies && userDetails?.Currencies?.length !== 0 ?
                    <div className='_dashboard_nav_bottom'>
                      <div className='_dashboard_nav_bottom_left'>
                        <p className="_dashboard_nav_currency-label">Currency</p>
                        <div className="_dashboard_nav_currency-select">
                          <CurrencyDropdown currency={userDetails?.Currencies} setSelectCurrency={setSelectCurrency} />
                        </div>
                      </div>
                    </div>
                    :
                    <div className="_dashboard_no-account-container">
                    <p className='_h1'>{userDetails?.message ? userDetails.message : `You have no Investment.`}</p>
                  </div>
                }
              </nav>
              {
                userDetails?.Investments && userDetails?.Investments.length !== 0 ?
                  <div className="_dashboard_content">
                    {
                      selectedCurrencyTransactions.length > 0 ? (
                        <>
                          <div className='_dashboard_overall_investment'>
                            <div className='_dashboard_overall_investment_info'>
                              <h2 className='_dashboard_overall_investment_info-label _sub_h2'>Overall Investment</h2>
                              <div className='_dashboard_overall_investment_info_details'>
                                <div className='_dashboard_overall_investment_info_detail'>
                                  <h6 className='_dashboard_overall_investment_info_detail-title _title_h2'>Total assets</h6>
                                  <span className='_dashboard_overall_investment_info_detail-value'>{selectedCurrency?.symbol} {totalAmount}</span>
                                </div>
                                <div className='_dashboard_overall_investment_info_detail'>
                                  <h6 className='_dashboard_overall_investment_info_detail-title _title_h2'>Total Earning</h6>
                                  <span className='_dashboard_overall_investment_info_detail-value'>{selectedCurrency?.symbol} {interest}</span>
                                </div>
                                <div className='_dashboard_overall_investment_info_detail'>
                                  <h6 className='_dashboard_overall_investment_info_detail-title _title_h2'>Total Projects</h6>
                                  <span className='_dashboard_overall_investment_info_detail-value'>{projectCount}</span>
                                </div>
                              </div>
                            </div>
                            <div className='_dashboard_overall_investment_graph'>
                              <h2 className='_dashboard_overall_investment_graph-label _sub_h2'>Overall Investment</h2>
                              <PieChart width={150} height={150}>
                                <Pie
                                  data={data}
                                  cx={75}
                                  cy={75}
                                  fill="#8884d8"
                                  dataKey="investmentAmount"
                                  outerRadius={70}
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
                                    const name = entry.payload.name; // Access currency from payload
                                    return [`${name}: ${formatAmount(value)}`]; // Return formatted value as an array
                                  }}
                                />
                              </PieChart>
                              <div style={{ position: 'absolute', right: '3rem' }}>
                                {data.map((entry: any, index) => {
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
                          <div className='_dashboard_project_details'>
                            <h2 className='_dashboard_project_details_label _sub_h2'>Project details</h2>
                            <div className='_dashboard_project_details_info'>
                              <div className='_dashboard_project_details_cards'>
                                <Splide
                                  options={{
                                    gap: "26px",
                                    drag: "free",
                                    arrows: false,
                                    // focus: 'center',
                                    pagination: false,
                                    breakpoints: {
                                      480: {
                                        perPage: 2,
                                      },
                                      768: {
                                        perPage: 2,
                                      },
                                      992: {
                                        perPage: 2,
                                      },
                                      1024: {
                                        perPage: 2,
                                      },
                                      1180: {
                                        perPage: 2,
                                      },
                                      1440: {
                                        perPage: 2,
                                      },
                                      1920: {
                                        perPage: 2,
                                      },
                                      2160: {
                                        perPage: 2,
                                      }
                                    },
                                    autoScroll: {
                                      pauseOnHover: true,
                                      pauseOnFocus: false,
                                      rewind: false,
                                      speed: 0.8,
                                    },
                                  }}
                                // extensions={{ AutoScroll }}
                                >
                                  {
                                    selectedCurrencyProjects?.length > 0 &&
                                    selectedCurrencyProjects.map((project, index) => (
                                      <React.Fragment key={index}>
                                        {selectedCurrencyInvestments?.length > 0 ? (
                                          selectedCurrencyInvestments
                                            .filter(investment => investment.ProjectId === project.id) // Ensure correct mapping
                                            .map((investment: any, idx: number) => (
                                              <SplideSlide key={idx}>
                                                <div
                                                  className={`_dashboard_project_details_card ${
                                                    graphProject === investment.ProjectId
                                                      ? '_dashboard_project_details_card_active'
                                                      : ''
                                                  }`}
                                                  onClick={() => setGraphProject(investment.ProjectId)}
                                                >
                                                  <div className="_dashboard_project_details_card_header">
                                                    <h4 className="_dashboard_project_details_card_title _title_h1">
                                                      {project.name}:
                                                    </h4>
                                                    <figure className="_dashboard_project_details_card_media_wrapper">
                                                      <img className="_dashboard_project_details_card_media" />
                                                    </figure>
                                                  </div>
                                                  <div className="_dashboard_project_details_card_info_wrapper">
                                                    <div className="_dashboard_project_details_card_info">
                                                      <div className="_dashboard_project_details_card_info_name">
                                                        Amount invested
                                                      </div>
                                                      <div className="_dashboard_project_details_card_info_value">
                                                        {selectedCurrency?.symbol}&nbsp;{investment.investedAmount}
                                                      </div>
                                                    </div>
                                                    <div className="_dashboard_project_details_card_info">
                                                      <div className="_dashboard_project_details_card_info_name">
                                                        Current value
                                                      </div>
                                                      <div className="_dashboard_project_details_card_info_value">
                                                        {selectedCurrency?.symbol}&nbsp;{investment.totalValue}
                                                      </div>
                                                    </div>
                                                    <div className="_dashboard_project_details_card_info">
                                                      <div className="_dashboard_project_details_card_info_name">
                                                        Lock-in period
                                                      </div>
                                                      <div className="_dashboard_project_details_card_info_value">
                                                        {formatDate(project.lockInPeriod)}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </SplideSlide>
                                            ))
                                        ) : (
                                          <div className="_dashboard_project_details_card_info_value"></div>
                                        )}
                                      </React.Fragment>
                                    ))
                                  }


                                </Splide>
                              </div>
                              {
                                graphProject ? (
                                  <div className='_dashboard_project_details_graph_section'>
                                          
                                    <div className='_dashboard_project_details_graph'>
                                      <h6 className='_dashboard_project_details_graph_title _title_h1'>
                                      10 Project transactions
                                      </h6>
                                      <TransactionTable data={chartData} currency={selectedCurrency} />
                                    </div>
                                  {
                                    selectedProject && selectedInvestment &&
                                    <div className='_dashboard_project_details_graph_info'>
                                      <h6 className='_title_h1 _dashboard_project_details_graph_info_title'>About this project</h6>

                                      <div className='_dashboard_project_details_graph_info_list'>
                                        <div className='_dashboard_project_details_graph_info_item'>
                                          <div className='_dashboard_project_details_graph_info_item_name'>
                                            Current value
                                          </div>
                                          <div className='_dashboard_project_details_graph_info_item_value'>
                                          {selectedCurrency?.symbol}&nbsp;{selectedInvestment.investedAmount}
                                          </div>
                                        </div>
                                        <div className='_dashboard_project_details_graph_info_item'>
                                          <div className='_dashboard_project_details_graph_info_item_name'>
                                            Project status
                                          </div>
                                          <div className='_dashboard_project_details_graph_info_item_value'>
                                            Active
                                          </div>
                                        </div>
                                        <div className='_dashboard_project_details_graph_info_item'>
                                          <div className='_dashboard_project_details_graph_info_item_name'>
                                            Location
                                          </div>
                                          <div className='_dashboard_project_details_graph_info_item_value'>
                                            {selectedProject.address}
                                          </div>
                                        </div>
                                      </div>
                                      <div className='_dashboard_project_details_graph_info_description'>
                                        <p className='_dashboard_project_details_graph_info_description_title'>
                                          Description
                                        </p>
                                        <p className='_dashboard_project_details_graph_info_description_text'>
                                          {selectedProject.description}
                                        </p>
                                      </div>
                                    </div>
                              }
                                  </div>
                                )

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
                            </div>
                          </div>
                        </>
                      )
                      :
                      <div className="_dashboard_no-account-container">
                        <p className='_h1'>{userDetails?.message ? userDetails.message : `You have no Investment.`}</p>
                      </div>
                    }
                  </div>
                  :
                  null
              }
            </div>
          </section> 
        </>
    );
}
 
export default Dashboard;