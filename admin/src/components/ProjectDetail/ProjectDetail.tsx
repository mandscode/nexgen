import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { ProjectDetailStore } from "./ProjectDetailStore";
import  "./ProjectDetail.scss";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EntityInvestorListInterface, ProjectBasicDetailsInterface, ProjectDetailInterface, ProjectFinancialDetailsInterface } from '../Utilities/interface/interface';

import exampleData from "../../json/example.json"
import { Card, Col, Container, Form, Image, Row, Tab, Tabs } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';
import { ColumnDef } from '@tanstack/react-table';
import fetchAwsImages from '../Utilities/FetchImagesComponent';
import { getAccountOfInvestor, getCurrencyDetail, getProject, getUser, updateProjectSettings } from '../../api/apiEndpoints';
import UpdateProject from '../UpdateProject/UpdateProject';



export interface ProjectDetailProps {
 className?: string;
}

const ProjectDetail = ({ }:ProjectDetailProps) => {
  const [projectDetailStore] = useState(() => new ProjectDetailStore());

  const [projectDetail, setProjectDetail] = useState<any>();

  const [projectBasicDetail, setProjectBasicDetail] = useState<ProjectBasicDetailsInterface>();
  
  const [projectInvestors, setProjectInvestors] = useState<EntityInvestorListInterface[]>([]);
  const [isAddImagesForm, showIsAddImagesForm] = useState<boolean>(false);
  
  // Fetch images call ..................................................................................
  const [images, setImages] = useState<any[]>([]);
  const [projectMedia, setProjectImages] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageUrls = await fetchAwsImages();
        setImages(imageUrls);
      } catch (err) {
        setError('Failed to fetch images');
      }
    };

    loadImages();
  }, []);
  // Fetch images call ..................................................................................


  const {id} = useParams();
  
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const project = await getProject(Number(id)); // Fetch project data
  
        if (project) {
          setProjectDetail(project);

          const words = project.description.split(' ');
          ;
  
          setProjectBasicDetail({
            entityName: project.entity?.name || "",
            name: project.name,
            countryName: project.countryName,
            description: words.length > 20 ? words.slice(0, 10).join(' ') + '...' : project.description,
            ownerName: project.ownerName,
          });
  
          if (project.investors?.length) {
            // Fetch user details for each investor
            const investorDetails = await Promise.all(
              project.investors.map(async (investor: any) => {
                const user = await getUser(Number(investor.userId)); // Fetch user details
                
                // Fetch investor's account transactions
                const accounts = await getAccountOfInvestor(Number(investor.id));
  
                const totalInvestedAmount = {} as any; 

                accounts.forEach((account:any) => {
                  account.transactions.forEach((transaction:any) => {
                    if (!totalInvestedAmount[account.currency]) {
                      totalInvestedAmount[account.currency] = 0;
                    }
                    totalInvestedAmount[account.currency] += transaction.amount;
                  });
                });
        
                // Fetch currency details asynchronously
                const currWiseTransactions = await Promise.all(
                  Object.entries(totalInvestedAmount).map(async ([currency, amount]) => {
                    const curr = await getCurrencyDetail(Number(currency)); // Await API response
                    return `${curr.symbol} ${amount}`;
                  })
                );
        
                
                return {
                  firstName: user.firstName || "",
                  lastName: user.lastName || "",
                  emailId: user.email || "",
                  totalInvestedAmount: currWiseTransactions.join(' , ')
                };
              })
            );

            setProjectInvestors(investorDetails);
          } else {
            setProjectInvestors([
              { firstName: "", lastName: "", emailId: "", totalInvestedAmount: [] },
            ]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
      }
    };
  
    fetchProjectDetails();
  }, [id]); // Runs when `id` changes
  
  
  

  useEffect(() => {
    let projectDetailsAPIData:any = projectDetailStore.data;
    if (projectDetailsAPIData.length > 0 ) {
      
      const project = projectDetailsAPIData.find((p:any) => p.id === Number(id));
      
      if (project) {
        async function setImg () {
          const projectImages = await getProjectImages(project.name); // Get filtered images
          setProjectImages(projectImages);
        }
        setImg();
      }
    }
  }, [images, projectDetailStore.data, id])

  useEffect(() => {
    if (projectDetail?.settings) {
      setStatus(JSON.parse(projectDetail?.settings)?.status === 'active');
    }
  }, [projectDetail]);

  const getProjectImages = (projectName: string) => {
    if (!projectName || !images || images.length === 0) return [];
    const formattedName = projectName.replace(/\s+/g, ''); // Remove spaces
    return images.filter((image: string) =>
        image.includes(`projects/${formattedName}/Default`)
    );
  };

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

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickNavigate = () => {
    if (pathname.includes('/projects/project/')) {
      navigate(`/projects/project/update/${id}`); // Navigate to the project details page
    } else if (`/projects/project/update/${id}`) {
      navigate("/projects/project/view/media"); // Navigate to the main projects page
    } else {
      navigate("/projects/add"); // Navigate to the add project page
    }
  };
  
  const [status, setStatus] = useState<boolean>(false); // false means inactive, true means activ
  
  const onChangeStatus = async (projectId: number) => {
    try {
      if(projectDetail) {
        const currentStatus = JSON.parse(projectDetail.settings)?.status || 'inactive';
        const updatedStatus = currentStatus === 'active' ? 'inactive' : 'active';
        

        const data = {
          settings: {
            status: updatedStatus
          }
        }
        
        await updateProjectSettings(Number(id), data)
        await projectDetailStore.fetchProjects();
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const projectBasicDetailColumns: ColumnDef<ProjectBasicDetailsInterface>[] = [
    {
      header: 'Project Basic Details',
      columns: [
        {
          accessorKey: 'entityName',
          cell: info => info.getValue(),
        },
        // {
        //   accessorKey: 'id',
        //   header: 'Project Status',
        //   cell: info => <Form.Check
        //     type="switch"
        //     checked={status} // Set the checked state based on the status
        //     id={`custom-switch-${info.getValue()}`}
        //     onChange={() => onChangeStatus(info.getValue())}
        //   />
        // },
        {
          accessorKey: 'countryName',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'description',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'ownerName',
          cell: info => info.getValue(),
        },
      ],
    },
  ];

  const projectFinancialDetailColumns: ColumnDef<ProjectFinancialDetailsInterface>[] = [
    {
      header: 'Project Financial Details',
      columns: [
        {
          accessorKey: 'startDate',
          cell: info => formatDate(info.getValue()),
        },
        {
          accessorKey: 'actualMaturityDate',
          cell: info => formatDate(info.getValue()),
        },
        {
          accessorKey: 'maturityLockingPeriod',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'overallCost',
          cell: info => info.getValue(),
        }
      ],
    },
  ];

  const projectInvestorDetailColumns: ColumnDef<EntityInvestorListInterface>[] = [
    {
      header: 'Entity Details',
      columns: [
        {
          accessorKey: 'firstName',
          header: 'First Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'emailId',
          header: 'Email Id',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'totalInvestedAmount',
          header: 'Total Invested Amount',
          cell: info => info.getValue(),
        }
        // Additional fields can be added here as needed
      ],
    }
  ];
  

  return (
    <div className={`projectDetail`}>
      <Tabs
        defaultActiveKey="basicDetails"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="basicDetails" title="Basic Details">
          {
            projectBasicDetail ? 
            <Card>
              <Card.Header>Basic Details of {projectBasicDetail.name}</Card.Header>
              <Card.Body>
                {projectBasicDetail && (
                  <NexGenTable columns={projectBasicDetailColumns} data={[projectBasicDetail]} />
                )}
              </Card.Body>
            </Card>
            :
            null
          }
        </Tab>
        <Tab eventKey="financialDetails" title="Financial Details">
          {
            projectDetail ? 
            <Card>
              <Card.Header>Financial Details of {projectDetail.name}</Card.Header>
              <Card.Body>
                {projectDetail ? (
                  <NexGenTable columns={projectFinancialDetailColumns} data={[projectDetail]} />
                ) : (
                  null
                )}
              </Card.Body>
            </Card>
            :
            null
          }
        </Tab>
        <Tab eventKey="investorDetails" title="Investor Details">
          {
            projectDetail ? 
            <Card>
              <Card.Header>Investor Details of {projectDetail.name}</Card.Header>
              <Card.Body>
                {projectDetail ? (
                  <NexGenTable columns={projectInvestorDetailColumns} data={projectInvestors} />
                ) : (
                  null
                )}
              </Card.Body>
            </Card>
            :
            null
          }
        </Tab>
        <Tab eventKey="mediaDetails" title="Project Images">
          <div className="header">
            <div className="container-fluid">
              <div className="header-body">
                <div className="row align-items-end row">
                  <div className="col">
                    <h6 className="header-pretitle">Overview</h6>
                  </div>
                  <div className="col-auto">
                    <button onClick={()=>showIsAddImagesForm(!isAddImagesForm)} type="button" className="lift btn btn-primary">{isAddImagesForm ? 'Show Project Images' : 'Upload Project Images'}</button></div>
                </div>
              </div>
            </div>
          </div> 
          {
            !isAddImagesForm ? 
            <Card>
              <Card.Header>Project Images</Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                {
                  projectMedia && projectMedia?.map((img:any, index:number) => (
                    
                      <Col xs={6} md={2}>
                        <Image src={`${img}`} thumbnail  />
                      </Col>
                    
                  ))
                }
                  </Row>
                </Container>
                {/* {error && <p>Error: {error}</p>}
                {images && images.length > 0 ? (
                  <p>Images fetched successfully!</p>
                ) : (
                  <p>No images found.</p>
                )} */}
                {/* {projectDetail ? (
                  <NexGenTable columns={projectInvestorDetailColumns} data={projectInvestors} />
                ) : (
                  null
                )} */}
              </Card.Body>
            </Card>
            :
            <UpdateProject/>
          }
        </Tab>
      </Tabs>
    </div>
  );
};

export default observer(ProjectDetail);