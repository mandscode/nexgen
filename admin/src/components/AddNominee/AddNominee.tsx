import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AddNomineeStore } from "./AddNomineeStore";
import  "./AddNominee.scss";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { NomineeDetails } from '../UserDetail/UserDetail';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';

export interface AddNomineeProps {
 className?: string;
 nomineeList:any;
 setNominee:any;
}

// NomineeDetails

const AddNominee = ({nomineeList, setNominee }:AddNomineeProps) => {
  const [addNomineeStore] = useState(() => new AddNomineeStore());

  const { id } = useParams();

  const schema = yup
  .object({
    mobile: yup.number().required("Project ID is required").positive("Project ID must be a positive number"),
    name: yup.string().required("Credited status is required"),
    email: yup.string().required("Credited status is required"),
    relation: yup.string().required("Credited status is required")
  })
  .required()
  const { register, handleSubmit, formState: { errors } } = useForm<NomineeDetails>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: NomineeDetails) => addNomineeStore.addNominee(data,  navigate, Number(id), nomineeList, setNominee);

  // Define form fields array and filter out the 'Investor' role
  const fields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'mobile', type: 'number', placeholder: 'Mobile Number' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'relation', type: 'text', placeholder: 'Relation' },
  ];


  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof NomineeDetails];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }

  return (
    <div className={`addNominee`}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
          {fields.map((field) => (
            <Col key={field.name} md={6} className="mb-3" >
              <div className="form-group">
                <label className="form-label">{field.placeholder}</label>
                    <Form.Control
                      type={field.type}
                      className={`form-control ${errors[field.name as keyof NomineeDetails] ? 'is-invalid' : ''}`}
                      placeholder={field.placeholder}
                      isInvalid={!!errors[field.name as keyof NomineeDetails]}
                      {...register(field.name as keyof NomineeDetails)}
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
          Add Nominee
        </button>

      </form>
    </div>
  );
};

export default observer(AddNominee);