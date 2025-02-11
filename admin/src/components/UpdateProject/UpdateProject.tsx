import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { UpdateProjectStore } from "./UpdateProjectStore";
import  "./UpdateProject.scss";
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export interface UpdateProjectProps {
 className?: string;
}

export interface UpdateProjectForm {
  file: File[],
  imgType: string,
}

const UpdateProject = ({ className="" }:UpdateProjectProps) => {
  const [updateProjectStore] = useState(() => new UpdateProjectStore());
  const { id } = useParams();
  const navigate = useNavigate();  // Get the navigate function from react-router

  const schema = yup
  .object({
    file: yup.mixed<File[]>().required("Credited status is required"),
    imgType: yup.string().required('Must define')
  })
  .required()
  const { register, handleSubmit, formState: { errors } } = useForm<UpdateProjectForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: UpdateProjectForm) => updateProjectStore.updateDetails(data,  navigate, Number(id));

  // Define form fields array and filter out the 'Investor' role
  const fields = [
    { name: 'file', type: 'file', placeholder: 'Upload Images', isMultiple:'multiple' },
    { 
      name: 'imgType', 
      type: 'select', 
      placeholder: 'Image Type', 
      options: [
        { name: 'Default', id: 1 }, // United States Dollar
        { name: 'Others', id: 2 }, // Euro
      ] 
    },
  ];

  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof UpdateProjectForm];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }

  return (
    <div className={`updateProject`}>
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
                      className={`form-control ${errors[field.name as keyof UpdateProjectForm] ? 'is-invalid' : ''}`}
                      {...register(field.name as keyof UpdateProjectForm)} // Register the select field
                    >
                      <option>Open this select menu</option>
                      {
                        field.options && field.options.map((option: { name: string, id:number }, index: number) => (
                          <option key={index} value={option.name}>{option.name}</option>
                        ))
                      }
                    </Form.Select>
                    :
                      <Form.Control
                        type={field.type}
                        className={`form-control ${errors[field.name as keyof UpdateProjectForm] ? 'is-invalid' : ''}`}
                        multiple={field?.isMultiple ? true : undefined} // Properly handle the 'multiple' attribute
                        placeholder={field.placeholder}
                        isInvalid={!!errors[field.name as keyof UpdateProjectForm]}
                        {...register(field.name as keyof UpdateProjectForm)}
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
          Add Images
        </button>

      </form>
    </div>
  );
};

export default observer(UpdateProject);