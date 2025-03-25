import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import '@splidejs/splide/css'; // Import Splide styles
import CurrencyDropdown from '../../utils/buttons/CurrencyDropdown';
import { Loader } from '../../utils/Loader';
import { InvestmentRespDTO, ProjectRespDTO, UserRespDTO } from '../desktop/Dashboard';
import { useNavigate } from 'react-router-dom';

const DashboardMobile = () => {

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

  const navigate = useNavigate();

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
      <div className="_dashboard-mobile_no-account-container">
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
                <p className='_dashboard-mobile_nav_greeting'>Hello {userDetails?.firstName} {userDetails?.lastName}</p>
                <h1 className='_dashboard-mobile_welcome-message _h1'>Welcome to your portfolio</h1>
              </div>
              <div className='_dashboard-mobile_nav_bottom'>
                <div className='_dashboard-mobile_nav_status-section'>
                  <p className="_dashboard-mobile_nav_status-label">Account status</p>
                  <div className="_dashboard-mobile_nav_status">
                    <span className="_dashboard-mobile_nav_status-indicator">
                      <span className={`${userDetails?.status == 1 ? `_dashboard-mobile_nav_status-circle` : `_dashboard-mobile_nav_status-circle _dashboard-mobile_nav_status-circle_inactive`}`}></span>
                      <p className="_dashboard-mobile_nav_status-text">{userDetails?.status == 1 ? 'Active' : 'Inactive'}</p>
                    </span>
                    <p className="_dashboard-mobile_nav_status-date">Since {userDetails?.createdAt && formatDate(userDetails?.createdAt)}</p>
                  </div>
                </div>
                {
                  userDetails?.Currencies && userDetails?.Currencies?.length !== 0 ?
                  <div className='_dashboard-mobile_nav_currency'>
                    <div className="_dashboard-mobile_nav_currency-select">
                      <CurrencyDropdown currency={userDetails?.Currencies} setSelectCurrency={setSelectCurrency}/>
                    </div>
                  </div>
                  :
                  null
                }
              </div>
            </nav>
            {
                userDetails?.Investments && userDetails?.Investments.length !== 0 ?
                <div className="_dashboard-mobile_content">
                  <div className='_dashboard-mobile_overall_investment'>
                    <div className='_dashboard-mobile_overall_investment_info'>
                      <h2 className='_dashboard-mobile_overall_investment_info-label _sub_h2'>Overall Investment</h2>
                      <div className='_dashboard-mobile_overall_investment_info_details'>
                        <div className='_dashboard-mobile_overall_investment_info_detail'>
                          <h6 className='_dashboard-mobile_overall_investment_info_detail-title _title_h2'>Total assets</h6>
                          <span className='_dashboard-mobile_overall_investment_info_detail-value'>{selectedCurrency?.currencySymbol} {totalAmount}</span>
                        </div>
                        <hr className='_dashboard-mobile_overall_investment_info_detail-divider'/>
                        <div className='_dashboard-mobile_overall_investment_info_detail'>
                          <h6 className='_dashboard-mobile_overall_investment_info_detail-title _title_h2'>Total earning</h6>
                          <span className='_dashboard-mobile_overall_investment_info_detail-value'>{interest}</span>
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
                            const name = entry.payload.name; // Access currency from payload
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
                <div className="_dashboard-mobile_no-account-container">
                  <p className='_h1'>{userDetails?.message ? userDetails.message : `You have no Investment.`}</p>
                </div>      
              }
          </div>
        </section> 
      </>
  );
}
 
export default DashboardMobile;