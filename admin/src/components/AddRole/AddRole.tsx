import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AddRoleStore } from "./AddRoleStore";
import  "./AddRole.scss";
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { RolesStore } from '../Roles/RolesStore';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


export interface AddRoleProps {
 className?: string;
}

export interface AddRoleForm {
  name: string;
}

const AddRole = ({ }:AddRoleProps) => {
  const [addRoleStore] = useState(() => new AddRoleStore());
  const rolesStore = useOutletContext<RolesStore>();

  // const roles = rolesStore.roles;
  const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required()
  const { register, handleSubmit, formState: { errors } } = useForm<AddRoleForm>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: AddRoleForm) => addRoleStore.addRole(data, rolesStore,  navigate);

  // Define form fields array
  const fields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
  ];


  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof AddRoleForm];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }


  return (
    <div className={`addRole`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {fields.map((fld) => (
            <Col key={fld.name} md={6} className="mb-3" >
              <div className="form-group">
                <label className="form-label">{fld.placeholder}</label>
                  <Form.Control
                    type={fld.type}
                    className={`form-control ${errors[fld.name as keyof AddRoleForm] ? 'is-invalid' : ''}`}
                    placeholder={fld.placeholder}
                    isInvalid={!!errors[fld.name as keyof AddRoleForm]}
                    {...register(fld.name as keyof AddRoleForm)}
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
          Add Role
        </button>

      </form>
    </div>
  );
};

export default observer(AddRole);