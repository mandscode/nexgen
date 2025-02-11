import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AssignAccountStore } from "./AssignAccountStore";
import  "./AssignAccount.scss";
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { InvestorStore } from '../Investor/InvestorStore';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { getInvestor, getUsers } from '../../api/apiEndpoints';
import Select from 'react-select';
import Accounts from '../Accounts/Accounts';

export interface AssignAccountProps {
 className?: string;
}

export interface AssignAccountInterface {
  currency: string,
  investorId: number
}

export interface InvestorOption {
  id: number;
  name: string;
}


const AssignAccount = ({ }:AssignAccountProps) => {
  const [assignAccountStore] = useState(() => new AssignAccountStore());

  const investorStore = useOutletContext<InvestorStore>();

  const [investorOptions, setInvestorOptions] = useState<InvestorOption[]>([]);

  const [showAccounts, setShowAccounts] = useState<boolean>(false);

  const [selectedOptions, setSelectedOptions] = useState<readonly {id: number, name: string}[]>([]);
  
  const { id } = useParams();

  const schema = yup
  .object({
    currency: yup.string().required(),
    investorId: yup.number().required('Investor ID is required')
    // projectIds: yup.array().min(1, "select atleast one role").required()
  })
  .required()
  const { register, handleSubmit, formState: { errors }, control } = useForm<AssignAccountInterface>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: AssignAccountInterface) => assignAccountStore.assignAccount(data, investorStore, navigate, setShowAccounts);


  
  useEffect(() => {
    // Fetch users
    const fetchInvesters = async () => {
      try {
        const investor = await getInvestor(Number(id)); // Fetch investor by ID
        const users = await getUsers();                 // Fetch all users
      
        // Find the user that matches the investor's userId
        const user = users.find((user: any) => user.id === investor.userId);
      
        // Set investor options with user's name, handling missing users
        setInvestorOptions([{
          id: investor.id,
          name: user ? user.firstName : 'Unknown', // Fallback to 'Unknown' if no user is found
        }]);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };


    fetchInvesters();
  }, []);
  
  const fields = [
    { name: 'investorId', type: 'select', placeholder: 'Select Investor', options: investorOptions },
    { 
      name: 'currency', 
      type: 'select', 
      placeholder: 'Select Currency', 
      options: [
        { name: 'USD', id: 1 }, // United States Dollar
        { name: 'EUR', id: 2 }, // Euro
        { name: 'GBP', id: 3 }, // British Pound
        { name: 'JPY', id: 4 }, // Japanese Yen
        { name: 'INR', id: 5 }, // Indian Rupee
      ] 
    },
  ];

  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof AssignAccountInterface];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }
  

  return (
    <div className={`assignAccount`}>
      {
        showAccounts ?
        <Accounts setShowAccounts={setShowAccounts} showAccounts={showAccounts}/>
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
                      className={`form-control ${errors[field.name as keyof AssignAccountInterface] ? 'is-invalid' : ''}`}
                      {...register(field.name as keyof AssignAccountInterface)} // Register the select field
                    >
                      <option>Open this select menu</option>
                      {
                        field.options && field.options.map((option: { name: string, id:number }, index: number) => (
                          <option key={index} value={option.id}>{option.name}</option>
                        ))
                      }
                    </Form.Select>
                    :
                    field.type === "multiselect" ?
                    <Controller
                    name={field.name as keyof AssignAccountInterface}
                    control={control}
                    render={({ field }) => <Select 
                    {...field}
                    isMulti
                    onChange={(selected:any) =>  {
                      setSelectedOptions(selected || []);
                      field.onChange(selected);
                    }}
                    options={[
                      { label: 'USD', value: 1 }, // United States Dollar
                      { label: 'EUR', value: 2 }, // Euro
                      { label: 'GBP', value: 3 }, // British Pound
                      { label: 'JPY', value: 4 }, // Japanese Yen
                      { label: 'INR', value: 5 }, // Indian Rupee
                    ]}
                    value={selectedOptions}/>
                  } />

                    :
                    <Form.Control
                      type={field.type}
                      className={`form-control ${errors[field.name as keyof AssignAccountInterface] ? 'is-invalid' : ''}`}
                      placeholder={field.placeholder}
                      isInvalid={!!errors[field.name as keyof AssignAccountInterface]}
                      {...register(field.name as keyof AssignAccountInterface)}
                    />
                }
                <Form.Control.Feedback type="invalid" className={getErrorMessage(field.name) ? 'd-block': 'd-none'}>
                  {
                    getErrorMessage(field.name)
                  }                
                </Form.Control.Feedback>
              </div>
            </Col>
          ))}
        </Row>
        <div className="d-flex gap-3">
        <button className="btn btn-lg w-75 btn-primary mb-3 w-75" type='submit'>
          Assign Account
        </button>
        {!showAccounts && (
          <button
            className="btn btn-lg w-25 btn-primary mb-3"
            onClick={() => setShowAccounts(true)}
          >
            Show Account
          </button>
        )}
        </div>

      </form>
      }
    </div>
  );
};

export default observer(AssignAccount);