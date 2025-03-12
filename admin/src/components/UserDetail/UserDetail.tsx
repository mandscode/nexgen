import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { UserDetailStore } from "./UserDetailStore";
import  "./UserDetail.scss";
import { useNavigate, useParams } from 'react-router-dom';

import Select from 'react-select';
import { ColumnDef } from '@tanstack/react-table';
import { Card, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';
import { ProjectBasicDetailInterface, Transaction } from '../Utilities/interface/interface';
import { getAccountOfInvestor, getCurrencyAll, getInvestor, getProject, getProjects, getUser, updateInvestorDocument } from '../../api/apiEndpoints';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Controller, useForm } from 'react-hook-form';
import AddTransactions from '../AddTransactions/AddTransactions';
import AddNominee from '../AddNominee/AddNominee';
import AddEmergencyContact from '../AddEmergencyContact/AddEmergencyContact';
import AddInvestorPersonalDetails from '../AddInvestorPersonalDetails/AddInvestorPersonalDetails';
import AddInvestorDocumentDetails from '../AddInvestorDocumentDetails/AddInvestorDocumentDetails';
import UpdateUserAccountDetails from '../UpdateUserAccountDetails/UpdateUserAccountDetails';

export interface UserDetailProps {
 className?: string;
}

interface InvestorPersonalDetails {
  mobile: string;
  dob: string;
  residentialAddress: string;
  mailingAddress: string;
}

export interface NomineeDetails {
  name: string;
  mobile: number;
  email: string;
  relation: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  personalDetails: string | null; // Assuming personalDetails could be a string or null
  googleId: string;
  picture: string;
  status:string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  roles: Role[]; // Assuming roles is an array of objects
}

export interface UserAccount {
  firstName: string;
  lastName: string;
  email: string;
  status:string;
  roles: Role[]; // Assuming roles is an array of objects
}

interface Role {
  // Define the structure of each role object based on its properties
  [key: string]: any; // Use this if the structure is unknown or flexible
}


// interface BasicDetails {
//   firstName: string;
//   lastName: string;
//   email: string;
//   accounts: {accountId: any, accountName: string}[];
// }

export interface InvestorEmergencyDetailsForm {
  name: string,
  mobile: number,
  relation: string
}


// interface Transaction {
//   id: number;              // Primary Key (Auto Incremented)
//   accountId: number;       // Foreign Key to Account (INT)
//   investmentId: number;    // Foreign Key to Investments (INT)
//   userId: number;          // Foreign Key to User (INT)
//   projectId: number;       // Foreign Key to Projects (INT)
//   credited: boolean;       // Boolean indicating whether the transaction is credited
//   amount: number;          // Decimal value (15,2) for the transaction amount
//   createdDate: any;       // Date when the transaction was created
// }


export interface InvestorOption {
  id: number;
  name: string;
}

// interface PieLabelRenderProps {
//   name: string;
//   value: number;
//   percent?: number;
// }

export interface AssignProjectOption {
  investorId: number;
  projectId: any;
}

interface CurrencyData {
  currency: string;
  value: number;
}

interface Project {
  name: string;
  value: any;
  currencyData?: CurrencyData[];
}

export interface InvestorDocumentsForm {
  id?:string,
  docName: string,
  docUrl: string
}

interface InvestorInterface {
  id: number;
  userId: number;
  createdAt: string; // Use `Date` if you prefer to handle it as a Date object
  updatedAt: string; // Use `Date` if you prefer to handle it as a Date object
  accounts: any[];
  documents: InvestorDocumentsForm[];
  emergencyContact: any;
  nomineeDetails: any | null; // Replace `any` with the appropriate type if known
  personalDetails: any | null; // Replace `any` with the appropriate type if known
  projects: Project[];
  settings: any | null; // Replace `any` with the appropriate type if known
}

const UserDetail = ({  }:UserDetailProps) => {
  const [userDetailStore] = useState(() => new UserDetailStore());
  
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [userOptions, setUserOptions] = useState<InvestorOption[]>([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [projects, setProjects] = useState<ProjectBasicDetailInterface[]>([]);

  const [investorDetails, setInvestorDetails] = useState<InvestorInterface>();
  const [userDetails, setUserDetails] = useState<User>();
  
  const [investrId, setInvestorId] = useState(0);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nominee, setNominee] = useState<NomineeDetails[]>([]);
  const [emergencyDetails, setEmergencyDetails] = useState<InvestorEmergencyDetailsForm[]>([]);
  const [personalDetails, setPersonalDetails] = useState<InvestorPersonalDetails[]>([]);
  const [nomineeList, setNomineeList] = useState(false);

  const [userAccount, setUserAccount] = useState<UserAccount[]>([]);
  const [userAccountlistShow, setUserAccountlistShow] = useState(false);
  const [userProjectListShow, setUserProjectListShow] = useState(false);
  const [updatedDocData, setUpdatedDocData] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<readonly {value: number, label: string}[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const investorAccounts = await getAccountOfInvestor(Number(id)); // Fetch the investor data

        // const investor = investorDetails;

        // Step 1: Group transactions by project
        const projectsData = projects.map((project) => {
          // Filter transactions by projectId
          const projectTransactions = investorAccounts
            .flatMap((currencyDetail: any) =>
              currencyDetail.transactions
                .filter((tx: any) => tx.projectId === project.id)
                .map((tx: any) => ({
                  ...tx,
                  currency: currencyDetail.currency,
                }))
            );

          // Step 2: Calculate total transaction amount for the project
          const totalValue = projectTransactions.reduce(
            (acc: number, transaction: any) => {
              if (transaction.credited) {
                return acc + Number(transaction.amount); // Add amount if credited
              } else {
                return acc - Number(transaction.amount); // Subtract amount if debited
              }
            }, 0
          );

          // Step 3: Calculate total per currency
          const currencyData = projectTransactions.reduce((acc: any, tx: any) => {
            const currencyItem = acc.find((item: any) => item.currency === tx.currency);

            const amount = tx.credited ? tx.amount : -tx.amount;

            if (currencyItem) {
              currencyItem.value += amount;
            } else {
              acc.push({ currency: tx.currency, value: tx.amount });
            }
            return acc;
          }, [] as { currency: string; value: number }[]);

          // Step 4: Return the project data
          return {
            name: project.name,
            value: totalValue,
            currencyData,
          };
        });
        // Convert to array format for PieChart
        setData(Object.values(projectsData));
      } catch (err) {
        setError('Failed to fetch investments');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [projects]);

  // const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

   // Custom label function to display percentages, now with TypeScript types
  // const renderLabel = ({ name, value }: PieLabelRenderProps) => {
  //   const percentage = ((value / totalValue) * 100).toFixed(2);
  //   return `${percentage}%`;
  // };

  const schema = yup
  .object({
    investorId: yup.number().required('User ID is required'),
    projectId:  yup.array().min(1, "select atleast one role").required(),
  })
  .required()
  const { register, handleSubmit, formState: { errors }, control } = useForm<AssignProjectOption>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: AssignProjectOption) => userDetailStore.assignAccount(data, setUserProjectListShow, projects, setProjects, Number(id));

  const transactionTitle = 'Transaction History';

  const [docDetailList, setDocDetailList] = useState(false);

  useEffect(() => {
    const fetchUsersAndProjects = async () => {
      try {
        // Fetch investor details using `id`
        const investor = await getInvestor(Number(id));
  
        // Extract the associated `userId` from the investor and fetch user details
        if (investor?.userId) {
          await userDetailStore.fetchAccountData(Number(investor.userId)); // Fetch user details by userId
  
          const user = userDetailStore.data;
          // Update state with user and investor details
          setUserOptions([
            {
              id: user.id,
              name: user.firstName,
            },
          ]);
  
          setUserAccount([
            {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              status: user.status,
              roles: user.roles,
            },
          ]);
  
          setUserDetails(user);
        }
  
          // Set investor-specific details
          setInvestorDetails(investor);
          setProjects(investor.projects);
  
        if (investor.nomineeDetails) {
          const parsedDataNominee = JSON.parse(investor.nomineeDetails);
          setNominee([parsedDataNominee]); // Wrap in an array
        }
  
        if (investor.personalDetails) {
          setPersonalDetails([JSON.parse(investor.personalDetails)]); // Wrap in an array
        }

        if (investor?.emergencyContact) {
          setEmergencyDetails([JSON.parse(investor.emergencyContact)]); // Wrap in an array
        }
      } catch (error) {
        console.error("Failed to fetch users and projects:", error);
      }
    };
  
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();
        setProjectOptions(
          projects.map((project: any) => ({ value: project.id, label: project.name }))
        );
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
  
    fetchUsersAndProjects();
    fetchProjects();
  }, [id, userAccountlistShow, updatedDocData, docDetailList]); // Ensure id and store are in dependency array
  

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const accountsData = await getAccountOfInvestor(Number(id)); // Await the asynchronous call

        const investor = await getInvestor(Number(id));

        const user = await getUser(investor.userId);          // Await the asynchronous call
        
        const formattedTransactions = await Promise.all(
          accountsData.map(async (item:any) => {
            const allCurr = await getCurrencyAll();
    

            const currency = allCurr.find((curr: any) => curr.id === item.currency); // Find matching currency
            const transactionsWithProjects = await Promise.all(
              item.transactions.map(async (transaction:any) => {
                const project = await getProject(Number(transaction.projectId));
                const projectName = project.name;

                return {
                  id: transaction.id,
                  accountId: currency.name,
                  credited: transaction.credited,
                  amount: transaction.amount,
                  createdDate: transaction.transactionDate,
                  userId: user.firstName, // Example if you want to include user data
                  projectId: projectName,
                  entityName:project.entity.name
                };
              })
            );
            return transactionsWithProjects;
          })
        )

        setTransactions(formattedTransactions.flat()); // Set the fetched and formatted data to state
      } catch (err) {
        console.log('Failed to fetch transactions');
      }
    };

    fetchTransactions(); // Call the fetch function
  }, []);

  useEffect(() => {
    setInvestorId(Number(id))
  }, [id])

  // Define form fields array
  const fields = [
    { name: 'investorId', type: 'select', placeholder: 'Select User', options:userOptions },
    {
      name: 'projectId',
      type: 'multiselect',
      placeholder: 'Select Projects',
      options: projectOptions
    },
  ];

  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof AssignProjectOption];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }


  const [transactionList, setTransactionList] = useState(false);
  
  const onClickNavigateForTransactions = (value:any) => {
      setTransactionList(!transactionList);
  };

  const [personalDetailList, setPersonalDetailList] = useState(false);
  
  const onClickNavigateForPersonalDetail = (value:any) => {
    setPersonalDetailList(!personalDetailList);
  };

  const onClickNavigateForDocDetail = (value:any) => {
    setDocDetailList(!docDetailList);
  };

  const onClickNavigateForNomineeDetails = (value:any) => {
      setNomineeList(!nomineeList);
  };

  // const [user, setUser] = useState<UserData>(undefined);
  // const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
  
  // const [userProjects, setUserProjects] = useState<BasicDetails>();

  // const [projects, setProjects] = useState<UserInvestedInProjects[]>([])


  const COLORS = ['#0088FE', '#FFBB28', '#FF8042']; // Define colors for the pie segments

  // Columns for an investor user
  const investorPersonalDetailColumns: ColumnDef<InvestorPersonalDetails>[] = [
    {
      header: 'Investor Details',
      columns: [
        {
          accessorKey: 'mobile',
          header: 'Mobile',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'dob',
          header: 'DOB',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'residentialAddress',
          header: 'Residential Address',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'mailingAddress',
          header: 'Mailing Address',
          cell: info => info.getValue(),
        },
      ],
    },
  ];

  // Columns for an investor user
  const userAccountDetailColumns: ColumnDef<UserAccount>[] = [
    {
      header: 'Account Details',
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
          accessorKey: 'email',
          header: 'Email Address',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'status',
          header: 'Account Status',
          cell: info => info.getValue(),
        },
      ],
    },
  ];

  // // Columns for an admin user (you can add admin-specific data here)
  // const adminPersonalDetailColumns: ColumnDef<UserData>[] = [
  //   {
  //     header: 'Admin Details',
  //     columns: [
  //       {
  //         accessorKey: 'firstName',
  //         header: 'First Name',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'lastName',
  //         header: 'Last Name',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'email',
  //         header: 'Email',
  //         cell: info => info.getValue(),
  //       },
  //     ],
  //   },
  // ];

  const investorNomineeDetailColumns: ColumnDef<NomineeDetails>[] = [
    {
      header: 'Investor Nominee Details',
      columns: [
        {
          accessorKey: 'mobile',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'email',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'relation',
          cell: info => info.getValue(),
        },
      ],
    },
  ];

  // const investorBasicDetailColumns: ColumnDef<BasicDetails>[] = [
  //   {
  //     header: 'All Investors',
  //     columns: [
  //       {
  //         accessorKey: 'firstName',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'lastName',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'email',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'accounts',
  //         accessorFn: (row) => row.accounts.map(accs => accs.accountName).join(","), 
  //         cell: info => info.getValue(),
  //       },
  //     ],
  //   },
  // ];

  const changeDocStatus = async (e:any, doc: InvestorDocumentsForm) => {
    const newStatus = e.target.checked; // New status from the checkbox
    const documentId = doc.id; // Assuming `id` is the unique identifier for the document

    try {
      if(documentId) {
        const response = await updateInvestorDocument(newStatus, Number(id), documentId);
        
        setUpdatedDocData(!updatedDocData)
        alert("File updated successfully!");
      }

      // navigate(`/investors/investor-detail/${id}`);
    } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
    }
  }

  const investorDocsColumns: ColumnDef<InvestorDocumentsForm>[] = [
    {
      header: 'All Docs',
      columns: [
        {
          accessorKey: 'docName',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'docUrl',
          cell: info => <a target='main' href={info.getValue()}>Click ok to view</a>,
        },
        {
          accessorKey: 'status',
          cell: info => <input type='checkbox' checked={info.getValue()} onChange={(e) => changeDocStatus(e, info.row.original)}/>,
        }
      ],
    },
  ];

  const [emergencyList, setEmergencyList] = useState(false);

  const investorEmergencyDetailsColumns: ColumnDef<InvestorEmergencyDetailsForm>[] = [
    {
      header: 'All Investors',
      columns: [
        {
          accessorKey: 'mobile',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'relation',
          cell: info => info.getValue(),
        },
      ],
    },
  ];

  const onClickNavigateForEmergencyDetails = (value:any) => {
    setEmergencyList(!emergencyList);
  };

  // const investorTransactionDetailsColumns: ColumnDef<Transaction>[] = [
  //   {
  //     header: 'All Transactios',
  //     columns: [
  //       {
  //         accessorKey: 'id',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'accountId',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'investmentId',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'userId',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'projectId',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'credited',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'amount',
  //         cell: info => info.getValue(),
  //       },
  //       {
  //         accessorKey: 'createdDate',
  //         cell: info => info.getValue(),
  //       }
  //     ],
  //   },
  // ];

  const projectsDetailsColumns: ColumnDef<ProjectBasicDetailInterface>[] = [
    {
      header: 'All Projects where user Invested',
      columns: [
        {
          accessorKey: 'id',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'name',
          cell: info => info.getValue(),
        }
      ],
    },
  ];

  const defaultColumns: ColumnDef<Transaction>[] = [
    {
      header: 'Transaction Details',
      columns: [
        {
          accessorKey: 'entityName',
          header: 'Entity Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'projectId',
          header: 'Project Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'userId',
          header: 'User Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'accountId',
          header: 'Currency',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'credited',
          header: 'Credited',
          cell: info => (info.getValue() ? 'Yes' : 'No'), // Display 'Yes' or 'No' based on boolean
        },
        {
          accessorKey: 'amount',
          header: 'Amount',
          cell: info => info.getValue().toFixed(2), // Format decimal amount
        },
        {
          accessorKey: 'createdDate',
          header: 'Created Date',
          cell: info => new Date(info.getValue()).toLocaleDateString(), // Format date to readable format
        },
      ],
    },
  ];

  const [selectedProject, setSelectedProject] = useState<Project>();
  // Handle click on project pie slice
  const handleProjectClick = (data:any) => {
    setSelectedProject(data);
  };

  // const getPercentage = (value:any, total:any) => ((value / total) * 100).toFixed(2);

  // Get total investment across all projects
  // const totalInvestment = data.reduce((acc, project) => acc + project.value, 0);


  const investorInvestmentsColumns: ColumnDef<Project>[] = [
    {
      header: 'Investor Investments Details',
      columns: [
        {
          accessorKey: 'name',
          header: 'Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'value',
          header: 'Value',
          cell: info => formatAmount(info.getValue()),
        }
      ],
    },
  ];

  const currencyBasedColumns: ColumnDef<CurrencyData>[] = [
    {
      header: 'Investor Investments Details',
      columns: [
        {
          accessorKey: 'currency',
          header: 'Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'value',
          header: 'Value',
          cell: info => formatAmount(info.getValue()),
        }
      ],
    },
  ];

  const formatAmount = (num:any) => {
    if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(1)}t`; // Trillion
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}b`; // Billion
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}m`; // Million
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`; // Thousand
    return num.toString(); // Less than 1,000
  };

  return (
    <div className={`userDetail`}>
      <div className='container-fluid'>
        <Tabs
          defaultActiveKey="assignProjects"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="dashboard" title="Dashboard">
            <Card>
              <Card.Header>Basic Details of </Card.Header>
              <Card.Body>
                <div className='d-flex justify-content-between'>
                  <div>
                    <h2>Investor Investments by Projects</h2>
                    <PieChart width={400} height={400}>
                      <Pie
                        data={data}
                        cx={200}
                        cy={200}
                        outerRadius={140}
                        fill="#8884d8"
                        dataKey="value"
                        onClick={handleProjectClick}
                        // label={({ name, value }) => `${name}`} // Label in percentage
                        // label={({ name, value }) => `${name}: ${getPercentage(value, totalInvestment)}%`} // Label in percentage
                        labelLine={false}
                      >
                        
                        {data.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${formatAmount(value)}`} />
                    </PieChart>
                    <NexGenTable columns={investorInvestmentsColumns} data={data}/>
                  </div>
                  {selectedProject && (
                    <div>
                      <h4>{selectedProject.name} Currency-based Investments</h4>
                      <PieChart width={400} height={400}>
                        <Pie
                          data={selectedProject.currencyData}
                          cx={200}
                          cy={200}
                          outerRadius={150}
                          overflow='visible'
                          labelLine={false}
                          fill="#83ca9d"
                          dataKey="value"
                          // label
                          // label={({ name, value }) => `${name}: ${value}`}
                          // label={({ name, value }) =>
                          //   `${name}`
                          // }
                          // labelLine
                        >
                          {selectedProject.currencyData && selectedProject.currencyData.map((_, index) => (
                            <Cell key={`cell-currency-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        {/* <Tooltip formatter={(name) => `${name}`} /> */}
                        <Tooltip
                        formatter={(value, _, entry) => {
                          // Ensure to access the currency correctly
                          const name = entry.payload.currency; // Access currency from payload
                          return [`${name}: ${formatAmount(value)}`]; // Return formatted value as an array
                        }}
                      />
                        {/* <Tooltip
                          formatter={(value) =>
                            `${getPercentage(value, selectedProject.currencyData.reduce((acc, curr) => acc + curr.value, 0))}%`
                          }
                        /> */}
                      </PieChart>
                      <NexGenTable columns={currencyBasedColumns} data={selectedProject.currencyData || []}/>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="assignProjects" title="Manage Projects">
            <div className="header">
              <div className="container-fluid">
                <div className="header-body">
                  <div className="row align-items-end row">
                    <div className="col">
                      <h1 className="header-title">User Account</h1>
                    </div>
                    <div className="col-auto">
                      {
                        <button 
                          onClick={() => setUserProjectListShow(!userProjectListShow)} 
                          type="button" 
                          className="lift btn btn-primary">
                          {!userProjectListShow ? "Projects Detail" : "Assign More Projects"}
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              userProjectListShow ?
              <Card>
                <Card.Header>Projects List if Invest by</Card.Header>
                <Card.Body>
                  { projects ? (
                    <NexGenTable columns={projectsDetailsColumns} data={projects} />
                  ) : (
                    null
                  )}
                </Card.Body>
              </Card>
              :
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  {fields.map((field) => (
                    <Col key={field.name} md={6} className="mb-3" >
                      <div className="form-group">
                        <label className="form-label">{field.placeholder}</label>
                        {
                          field.type === "select" ?
                            <Form.Select
                              aria-label="Default select example"
                              className={`form-control ${errors[field.name as keyof AssignProjectOption] ? 'is-invalid' : ''}`}
                              {...register(field.name as keyof AssignProjectOption)} // Register the select field
                            >
                              <option>Open this select menu</option>
                              {
                                field.options && field.options.map((option: { name: string, id: number }, index: number) => (
                                  <option key={index} value={option.id}>{option.name}</option>
                                ))
                              }
                            </Form.Select>
                            :
                            field.type === "multiselect" ?
                              
                              <Controller
                                name={field.name as keyof AssignProjectOption}
                                control={control}
                                render={({ field }) => <Select 
                                {...field}
                                isMulti
                                onChange={(selected:any) =>  {
                                  setSelectedOptions(selected || []);
                                  field.onChange(selected);
                                }}
                                options={projectOptions}
                                value={selectedOptions}/>
                              } />
                              :
                            <Form.Control
                              type={field.type}
                              className={`form-control ${errors[field.name as keyof AssignProjectOption] ? 'is-invalid' : ''}`}
                              placeholder={field.placeholder}
                              isInvalid={!!errors[field.name as keyof AssignProjectOption]}
                              {...register(field.name as keyof AssignProjectOption)}
                            />
                        }
                        <Form.Control.Feedback type="invalid" className={getErrorMessage(field.name) ? 'd-block' : 'd-none'}>
                          {
                            getErrorMessage(field.name)
                          }
                        </Form.Control.Feedback>
                      </div>
                    </Col>
                  ))}
                </Row>

                <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
                  Assign Project
                </button>

              </form>
            }
          </Tab>
          <Tab eventKey="transactions" title="Transactions">
            <div className="header">
              <div className="container-fluid">
                <div className="header-body">
                  <div className="row align-items-end row">
                    <div className="col">
                      <h6 className="header-pretitle">Overview</h6>
                      <h1 className="header-title">{transactionTitle}</h1>
                    </div>
                    <div className="col-auto">
                      {
                        transactionList ?
                        <button onClick={() => {onClickNavigateForTransactions(false)}} type="button" className="lift btn btn-primary">Transacrions</button>
                        :
                        <button onClick={() => {onClickNavigateForTransactions(true)}} type="button" className="lift btn btn-primary">Add Transactions</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='container-fluid'>
              {
                !transactionList ?
                  <Card>
                    <Card.Header></Card.Header>
                    <Card.Body>
                      <NexGenTable columns={defaultColumns} data={transactions} ></NexGenTable>
                    </Card.Body>
                  </Card>
                  :
                  <AddTransactions investrId={investrId} transactionList={setTransactionList}/>
              }
            </div>
          </Tab>
          <Tab eventKey="nomineeDetails" title="Nominee Details">
            <div className="header">
              <div className="container-fluid">
                <div className="header-body">
                  <div className="row align-items-end row">
                    <div className="col">
                      <h6 className="header-pretitle">Overview</h6>
                      <h1 className="header-title">Nominee Details</h1>
                    </div>
                    <div className="col-auto">
                      {
                        nomineeList ?
                          <button onClick={() => { onClickNavigateForNomineeDetails(false) }} type="button" className="lift btn btn-primary">Nominee</button>
                          :
                          <button onClick={() => { onClickNavigateForNomineeDetails(true) }} type="button" className="lift btn btn-primary">Update Nominee Details</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              !nomineeList ?
                <Card>
                  <Card.Header></Card.Header>
                  <Card.Body>
                    <NexGenTable columns={investorNomineeDetailColumns} data={nominee} ></NexGenTable>
                  </Card.Body>
                </Card>
                :
                // null
              <AddNominee nomineeList={setNomineeList} setNominee={setNominee}/>
            }
            {/* {
              user ? 
              <Card>
                <Card.Header>Nominee Details of {user.firstName} {user.lastName}</Card.Header>
                <Card.Body>
                  {user.role === 'investor' && user.investorProfile ? (
                    <NexGenTable columns={investorNomineeDetailColumns} data={[user.investorProfile.nomineeDetails]} />
                  ) : (
                    null
                  )}
                </Card.Body>
              </Card>
              :
              null
            } */}
          </Tab>
          <Tab eventKey="emergencyDetails" title="Emergency Details">
            <div className="header">
              <div className="container-fluid">
                <div className="header-body">
                  <div className="row align-items-end row">
                    <div className="col">
                      <h6 className="header-pretitle">Overview</h6>
                      <h1 className="header-title">Emergency Details</h1>
                    </div>
                    <div className="col-auto">
                      {
                        emergencyList ?
                          <button onClick={() => { onClickNavigateForEmergencyDetails(false) }} type="button" className="lift btn btn-primary">Emergency Details</button>
                          :
                          <button onClick={() => { onClickNavigateForEmergencyDetails(true) }} type="button" className="lift btn btn-primary">Update Emergency Details</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              !emergencyList ?
                <Card>
                  <Card.Header></Card.Header>
                  <Card.Body>
                    <NexGenTable columns={investorEmergencyDetailsColumns} data={emergencyDetails} ></NexGenTable>
                  </Card.Body>
                </Card>
                :
                // null
              <AddEmergencyContact emergencyList={setEmergencyList}/>
            }
            {/* {
              user ? 
              <Card>
                <Card.Header>Nominee Details of {user.firstName} {user.lastName}</Card.Header>
                <Card.Body>
                  {user.role === 'investor' && user.investorProfile ? (
                    <NexGenTable columns={investorNomineeDetailColumns} data={[user.investorProfile.nomineeDetails]} />
                  ) : (
                    null
                  )}
                </Card.Body>
              </Card>
              :
              null
            } */}
          </Tab>
          <Tab eventKey="personalDetails" title="Peronsal Details">
            <div className="header">
              <div className="container-fluid">
                <div className="header-body">
                  <div className="row align-items-end row">
                    <div className="col">
                      <h1 className="header-title">Personal Details</h1>
                    </div>
                    <div className="col-auto">
                      {
                        personalDetailList ?
                          <button onClick={() => { onClickNavigateForPersonalDetail(false) }} type="button" className="lift btn btn-primary">Personal Details</button>
                          :
                          <button onClick={() => { onClickNavigateForPersonalDetail(true) }} type="button" className="lift btn btn-primary">Update/Add Personal Details</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              !personalDetailList ?
                <Card>
                  <Card.Header></Card.Header>
                  <Card.Body>
                    <NexGenTable columns={investorPersonalDetailColumns} data={personalDetails} ></NexGenTable>
                  </Card.Body>
                </Card>
                :
              <AddInvestorPersonalDetails/>
            }
          </Tab>          
          <Tab eventKey="docsDetails" title="Docs Details">
            <div className="header">
              <div className="container-fluid">
                <div className="header-body">
                  <div className="row align-items-end row">
                    <div className="col">
                      <h1 className="header-title">Document Details</h1>
                    </div>
                    <div className="col-auto">
                      {
                        personalDetailList ?
                          <button onClick={() => { onClickNavigateForDocDetail(false) }} type="button" className="lift btn btn-primary">Document Details</button>
                          :
                          <button onClick={() => { onClickNavigateForDocDetail(true) }} type="button" className="lift btn btn-primary">Update/Add Documents</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              docDetailList ? 
              <Card>
                <Card.Header>Docs Details of {userDetails?.firstName} {userDetails?.lastName}</Card.Header>
                <Card.Body>
                    <NexGenTable columns={investorDocsColumns} data={investorDetails?.documents || []} />
                </Card.Body>
              </Card>
              :
              <AddInvestorDocumentDetails setDocDetailList={setDocDetailList}/>
            }
          </Tab>
          <Tab eventKey="userAccount" title="User Account">
            <div className="header">
              <div className="container-fluid">
                <div className="header-body">
                  <div className="row align-items-end row">
                    <div className="col">
                      <h1 className="header-title">User Account</h1>
                    </div>
                    <div className="col-auto">
                      {
                        userAccountlistShow ?
                          <button onClick={() => {setUserAccountlistShow(!userAccountlistShow) }} type="button" className="lift btn btn-primary">User Account Details</button>
                          :
                          <button onClick={() => {setUserAccountlistShow(!userAccountlistShow)}} type="button" className="lift btn btn-primary">Update/Add Details</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              !userAccountlistShow ?
                <Card>
                  <Card.Header></Card.Header>
                  <Card.Body>
                    <NexGenTable columns={userAccountDetailColumns} data={userAccount} ></NexGenTable>
                  </Card.Body>
                </Card>
                :
              <UpdateUserAccountDetails setUserAccountlistShow={setUserAccountlistShow}/>
            }
          </Tab>          
        </Tabs>
      </div>
    </div>
  );
};

export default observer(UserDetail);