import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AddEmergencyContactStore } from "./AddEmergencyContactStore";
import  "./AddEmergencyContact.scss";
import { useNavigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { InvestorEmergencyDetailsForm } from '../UserDetail/UserDetail';
import { useForm } from 'react-hook-form';
import { Col, Form, Row } from 'react-bootstrap';

export interface AddEmergencyContactProps {
 className?: string;
 emergencyList:any;
}

const AddEmergencyContact = ({ }:AddEmergencyContactProps) => {
  const [addEmergencyContactStore] = useState(() => new AddEmergencyContactStore());

  const { id } = useParams();

  const schema = yup
  .object({
    mobile: yup.number().required("Project ID is required").positive("Project ID must be a positive number"),
    name: yup.string().required("Credited status is required"),
    relation: yup.string().required("Credited status is required")
  })
  .required()
  const { register, handleSubmit, formState: { errors } } = useForm<InvestorEmergencyDetailsForm>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: InvestorEmergencyDetailsForm) => addEmergencyContactStore.addDetails(data,  navigate, Number(id));

  // Define form fields array and filter out the 'Investor' role
  const fields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'mobile', type: 'number', placeholder: 'Mobile Number' },
    { name: 'relation', type: 'text', placeholder: 'Relation' },
  ];


  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof InvestorEmergencyDetailsForm];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }

   // Function to restrict input to numbers only
   const handleNumericInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className={`addEmergencyContact`}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
          {fields.map((field) => (
            <Col key={field.name} md={6} className="mb-3" >
              <div className="form-group">
                <label className="form-label">{field.placeholder}</label>
                    <Form.Control
                      type={field.type}
                      className={`form-control ${errors[field.name as keyof InvestorEmergencyDetailsForm] ? 'is-invalid' : ''}`}
                      placeholder={field.placeholder}
                      isInvalid={!!errors[field.name as keyof InvestorEmergencyDetailsForm]}
                      onKeyDown={field.name === 'number' ? handleNumericInput : undefined} // Restrict input for mobile field
                      {...register(field.name as keyof InvestorEmergencyDetailsForm)}
                      
                    />
                <Form.Control.Feedback type="invalid" className={getErrorMessage(field.name) ? 'd-block': 'd-none'}>
                  {
                    getErrorMessage(field.name)
                  }                
                </Form.Control.Feedback>
              </div>
            </Col>
          ))}
        </Row>

        <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
          Add Details
        </button>

      </form>
    </div>
  );
};

export default observer(AddEmergencyContact);