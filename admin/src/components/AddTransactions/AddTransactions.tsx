import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AddTransactionsStore } from "./AddTransactionsStore";
import  "./AddTransactions.scss";
import { Col, Form, Row } from 'react-bootstrap';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TransactionHistoryStore } from '../TransactionHistory/TransactionHistoryStore';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAccountOfInvestor, getCurrencyAll, getEntities, getInvestor, getProjects, getUser } from '../../api/apiEndpoints';

export interface AddTransactionsProps {
 className?: string;
 investrId?: number;
 transactionList:any;
}

export interface TransactionDetails {
  [key: string]: number; // This will allow any string keys with number values
}

export interface TransactionDTO {
  details?: TransactionDetails; // Details containing credit card information
  projectId: number;          // Project ID
  entityId: number;          // Project ID
  accountId: number;          // Account/><<<<<<<<, ID
  amount: number;             // Amount of the transaction
  credited: string;          // Indicates if the transaction is credited
  intrestRate: number;        // Interest rate for the transaction
  transactionDate?: Date; // New field
}



const AddTransactions = ({ investrId, transactionList }:AddTransactionsProps) => {
  const [addTransactionsStore] = useState(() => new AddTransactionsStore());

  const transactionHistoryStore = useOutletContext<TransactionHistoryStore>();
  const [projects, setProjects] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(0);


  const [entitesOptions, setEntitesOptions] = useState([]);



  const schema = yup
  .object({
    projectId: yup.number().required("Project ID is required").positive("Project ID must be a positive number"),
    entityId: yup.number().required("Entity ID is required").positive("Entity ID must be a positive number"),
    accountId: yup.number().required("Account ID is required").positive("Account ID must be a positive number"),
    amount: yup.number().required("Transaction amount is required").positive("Transaction amount must be positive"),
    credited: yup.string().required("Credited status is required"),
    intrestRate: yup.number().required("Interest rate is required").min(0, "Interest rate must be 0 or higher"),
  })
  .required()
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionDTO>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: TransactionDTO) => addTransactionsStore.addTransaction(data, transactionHistoryStore,  navigate, transactionList);

  useEffect(() => {
    const fetchEntities = async () => {
    try {
        const entitiesData = await getEntities(); // Fetch Entities
  
        const entitesOptionsData = entitiesData.map((ent:any) => {
          return {
            id:ent.id,
            name:ent.name
          }
        }) 
        
      }
      catch (error) {
        console.error('Error fetching entities:', error);
      }
    } 
    
    fetchEntities();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getProjects(); // Fetch projects
        // const projectsData2 = await getInvestor(Number(id)); // Fetch projects
        const userData = await getUser(Number(investrId)); // Fetch projects
        
        const accountsOfInvestor = await getAccountOfInvestor(Number(investrId)); // Fetch accounts
        if (userData?.entities?.length > 0) {
          setEntitesOptions(userData.entities);
        }
        const filteredProjects = projectsData
        .filter((project: any) => { return project.entityID === selectedOption;}) // Filter projects by entity ID
        .map((project: any) => ({
          id: project.id,
          name: project.name,
        }));
          
        const allCurr = await getCurrencyAll();

        const assignedAcc = accountsOfInvestor.map((acc: any) => {
          const currency = allCurr.find((curr: any) => curr.id === acc.currency); // Find matching currency
          return {
            name: currency ? currency.name : "Unknown", // Use currency name if found
            id: acc.id,
          };
        });
        // Extract only 'id' and 'currency' for accounts
  
        // Set the state with the filtered data
        setProjects(filteredProjects);
        setAccounts(assignedAcc);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (selectedOption !== 0) {
      fetchData(); // Fetch data only if an entity is selected
    }
  }, [selectedOption, investrId]); // Empty dependency array means it runs once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const investor = await getInvestor(Number(investrId))
        const userData = await getUser(Number(investor?.userId)); // Fetch projects

        if (userData?.entities?.length > 0) {
          setEntitesOptions(userData.entities);
          console.log(userData.entities)

        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); // Fetch data only if an entity is selected
  }, [ investrId]); // Empty dependency array means it runs once on component mount

  // Define form fields array and filter out the 'Investor' role
    const fields = [
      { name: 'entityId', type: 'select', placeholder: 'Select Entity', options:entitesOptions},
      { name: 'projectId', type: 'select', placeholder: 'Projects', options:projects},
      { name: 'accountId', type: 'select', placeholder: 'Accounts', options:accounts},
      { name: 'amount', type: 'number', placeholder: 'Amount' },
      { name: 'transactionDate', type: 'date', placeholder: 'Transaction Date' },
      { name: 'details', type: 'text', placeholder: 'Details' },

      { name: 'intrestRate', type: 'number', placeholder: 'Intrest Rate' },
      { name: 'credited', type: 'select', placeholder: 'Credit/Debit', options:[
            {
              id: 1,
              value: true,
              name: "Credit",
            },
            {
              id: 2,
              value: false,
              name: "Debit",
            },
      ]},
    ];

  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof TransactionDTO];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }

  return (
    <div className={`addTransactions`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {fields.map((field) => (
            <Col key={field.name} md={6} className="mb-3" >
              <div className="form-group">
                <label className="form-label">{field.placeholder}</label>
                {
                  field.type === "select" && field.name !== "credited" && field.name !== "entityId" ?
                    <Form.Select
                      aria-label="Default select example"
                      className={`form-control ${errors[field.name as keyof TransactionDTO] ? 'is-invalid' : ''}`}
                      {...register(field.name as keyof TransactionDTO)} // Register the select field
                    >
                      <option>Open this select menu</option>
                      {
                        field.options && field.options.map((option: { name: string, id: any }, index: number) => (
                          <option key={index} value={option.id}>{option.name}</option>
                        ))
                      }
                    </Form.Select>
                    :
                    field.type === "select" && field.name === "credited" ?
                      <Form.Select
                        aria-label="Default select example"
                        className={`form-control ${errors[field.name as keyof TransactionDTO] ? 'is-invalid' : ''}`}
                        {...register(field.name as keyof TransactionDTO)} // Register the select field
                      >
                        <option>Open this select menu</option>
                        {
                          field.options && field.options.map((option: { name: string, id: any }, index: number) => (
                            <option key={index} value={option.name}>{option.name}</option>
                          ))
                        }
                      </Form.Select>
                      :
                      field.type === "select" && field.name === "entityId" ?
                      <Form.Select
                        aria-label="Default select example"
                        className={`form-control ${errors[field.name as keyof TransactionDTO] ? 'is-invalid' : ''}`}
                        {...register(field.name as keyof TransactionDTO)} // Register the select field
                        onChange={(e) => setSelectedOption(Number(e.target.value))}
                      >
                        <option>Open this select menu</option>
                        {
                          field.options && field.options.map((option: { name: string, id: any }, index: number) => (
                            <option key={index} value={option.id}>{option.name}</option>
                          ))
                        }
                      </Form.Select>
                      :
                      <Form.Control
                        type={field.type}
                        className={`form-control ${errors[field.name as keyof TransactionDTO] ? 'is-invalid' : ''}`}
                        placeholder={field.placeholder}
                        isInvalid={!!errors[field.name as keyof TransactionDTO]}
                        {...register(field.name as keyof TransactionDTO)}
                        max={field.type === "date" ? new Date().toISOString().split("T")[0] : undefined} // Prevent future dates
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
          Add Transaction
        </button>

      </form>
    </div>
  );
};

export default observer(AddTransactions);