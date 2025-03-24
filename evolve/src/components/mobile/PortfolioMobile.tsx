import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrencyAll, getProject } from "../../api/apiEndpoints";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import TransactionTable from "../../utils/TransactionTable";
import CurrencyDropdown from "../../utils/buttons/CurrencyDropdown";
import { useLocation } from "react-router-dom";
import { Loader } from "../../utils/Loader";
import { InvestorDetails } from "../../redux/actions/investorActions";
import { InvestmentRespDTO, ProjectRespDTO, UserRespDTO } from "../desktop/Dashboard";

const PortfolioMobile = () => {
  const [userDetails, setUserDetails] = useState<UserRespDTO | null>(null);

  const [selectedCurrencyTransactions, setSelectedCurrencyTransactions] = useState<any[]>([]);
  const [selectedCurrencyInvestments, setSelectedCurrencyInvestments] = useState<any[]>([]);
  const [selectedCurrencyProjects, setSelectedCurrencyProjects] = useState<any[]>([]);
  const [selectedProjectTransactions, setSelectedProjectTransactions] = useState<any[]>([]);


  const [totalAmount, setTotalAmount] = useState(0);
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

  useEffect(() => {
    let currency = localStorage.getItem('currencyId');

    if(currency && currency !== 'undefined') {
      currency = JSON.parse(currency)
      setSelectCurrency(currency)
    }
  }, [])

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
    const total = selectedCurrencyTransactions.reduce(
      (sum, t) => (t.credited ? sum + Number(t.amount) : sum),
      0
    );

    setTotalAmount(total);

    const uniqueProjects = new Set(selectedCurrencyTransactions.map((t) => t.projectId)).size;

    setProjectCount(uniqueProjects);


    let uniqueData: any[] = [];

    const aggregatedData = selectedCurrencyTransactions.flat().reduce((acc, { projectId, amount }) => {
      const projects = userDetails?.projects || [];
      const project = projects.find(p => p.id === projectId);
      let existingProject = acc.find((item: any) => item.id === projectId);

      if (!existingProject) {
        existingProject = { ...project, investmentAmount: 0 }; // Initialize if not found
        acc.push(existingProject);
      }

      existingProject.investmentAmount += Number(amount);

      // Ensure uniqueData gets a proper reference
      if (!uniqueData.some((p) => p.id === projectId)) {
        uniqueData.push(existingProject);
      }

      return acc;
    }, []);

    setSelectedCurrencyProjects(uniqueData);
    setData(aggregatedData);

  }, [selectedCurrencyTransactions]);

  const COLORS = ['#2A333A', '#3476ec59', '#FF8042'];

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
      <div className="error-container">
        <p>Error: {error}</p>
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
          <section className="_portfolio-mobile">
              <div className="_portfolio-mobile_wrapper _container">
                  {
                    selectedCurrencyTransactions.length !== 0 ?
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
                              {
                                selectedCurrencyProjects?.length > 0 &&
                                selectedCurrencyProjects.map((project, index) => (
                                  <React.Fragment key={index}>
                                    {selectedCurrencyInvestments?.length > 0 ? (
                                      selectedCurrencyInvestments
                                        .filter(investment => investment.ProjectId === project.id) // Ensure correct mapping
                                        .map((investment: any, idx: number) => (
                                          <SplideSlide
                                            key={idx}
                                          >
                                            <div
                                              className={`_dashboard-mobile_project_details_card ${graphProject === project.id
                                                ? '_dashboard-mobile_project_details_card_active'
                                                : ''
                                                }`}
                                              onClick={() => setGraphProject(project.id)}
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
                                                  {selectedCurrency?.symbol}&nbsp;{investment.investedAmount}
                                                  </div>
                                                </div>
                                                <div className="_dashboard-mobile_project_details_card_info">
                                                  <div className="_dashboard-mobile_project_details_card_info_name">
                                                    Current value
                                                  </div>
                                                  <div className="_dashboard-mobile_project_details_card_info_value">
                                                  {selectedCurrency?.symbol}&nbsp;{investment.totalValue}
                                                  </div>
                                                </div>
                                                <div className="_dashboard-mobile_project_details_card_info">
                                                  <div className="_dashboard-mobile_project_details_card_info_name">
                                                    Lock-in period
                                                  </div>
                                                  <div className="_dashboard-mobile_project_details_card_info_value">
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
                      
                    ):
                    <div className="_dashboard_no-account-container">
                    <p className='_h1'>You have no create any transaction.</p>
                  </div>
                  }
                  {
            
                    selectedCurrencyTransactions.length !== 0 ?
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