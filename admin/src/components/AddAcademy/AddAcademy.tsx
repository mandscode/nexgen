import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AddAcademyStore } from "./AddAcademyStore";
import  "./AddAcademy.scss";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { AcademyStore } from '../Academy/AcademyStore';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Academy } from '../Academy/Academy';
import { useForm } from 'react-hook-form';
import { Col, Form, Row } from 'react-bootstrap';

export interface AddAcademyProps {
 className?: string;
}

export interface AddAcademyInterface {
  id?: number;
  title: string;
  imageUrl?: File[];
  description: string;
}

const AddAcademy = ({ className="" }:AddAcademyProps) => {
  const [addAcademyStore] = useState(() => new AddAcademyStore());
  const academyStore = useOutletContext<AcademyStore>();

  const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required()
  const { register, handleSubmit, formState: { errors } } = useForm<AddAcademyInterface>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: AddAcademyInterface) => addAcademyStore.addAcademy(data, academyStore,  navigate);

  // Define form fields array
  const fields = [
    { name: 'title', type: 'text', placeholder: 'Title' },
    { name: 'description', type: 'text', placeholder: 'Description', as:"textarea" },
    { name: 'imageUrl', type: 'file', placeholder: 'Upload Image', isMultiple:'multiple' }
  ];

  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof Academy];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }

  return (
    <div className={`addAcademy`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {fields.map((fld) => (
            <Col key={fld.name} md={6} className="mb-3" >
              <div className="form-group">
                <label className="form-label">{fld.placeholder}</label>
                  <Form.Control
                    type={fld.type}
                    className={`form-control ${errors[fld.name as keyof Academy] ? 'is-invalid' : ''}`}
                    placeholder={fld.placeholder}
                    isInvalid={!!errors[fld.name as keyof Academy]}
                    {...register(fld.name as keyof Academy)}
                  />
                  <Form.Control.Feedback type="invalid" className={getErrorMessage(fld.name) ? 'd-block' : 'd-none'}>
                    {
                      getErrorMessage(fld.name)
                    }
                  </Form.Control.Feedback>
              </div>
            </Col>
          ))}
        </Row>

        <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
          Add Academy
        </button>

      </form>
    </div>
  );
};

export default observer(AddAcademy);