import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UsersStore } from '../Users/UsersStore';
import "./AddUser.scss";
import { AddUserStore } from "./AddUserStore";

export interface AddUserForm {
  firstName: string;
  lastName: string;
  email: string;
  roles: any;
}

export interface AddUserProps {
 className?: string;
}

const AddUser = ({ }:AddUserProps) => {
  const [addUserStore] = useState(() => new AddUserStore());
  const usersStore = useOutletContext<UsersStore>();

  const roles = usersStore.roles;

  const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    roles: yup.array().min(1, "select atleast one role").required()
  })
  .required()
  const { register, handleSubmit, formState: { errors }, control } = useForm<AddUserForm>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: AddUserForm) => addUserStore.addUser(data, usersStore,  navigate);

  // Define form fields array and filter out the 'Investor' role
  const fields = [
    { name: 'firstName', type: 'text', placeholder: 'First Name' },
    { name: 'lastName', type: 'text', placeholder: 'Last Name' },
    { name: 'email', type: 'email', placeholder: 'Email Address' },
    {
      name: 'roles',
      type: 'multiselect',
      placeholder: 'Roles',
      options: roles
        .filter(role => role.name !== 'Investor') // Filter out 'Investor' role
        .map(role => ({ value: role.id, label: role.name }))
    },
  ];


  const [selectedOptions, setSelectedOptions] = useState<readonly {value: number, label: string}[]>([]);

  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof AddUserForm];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }

  return (
    <div className={`addUser`}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
          {fields.map((fld) => (
            <Col key={fld.name} md={6} className="mb-3" >
              <div className="form-group">
                <label className="form-label">{fld.placeholder}</label>
                {
                  fld.type === "multiselect" ?
                  
                  <Controller
                    name={fld.name as keyof AddUserForm}
                    control={control}
                    render={({ field }) => <Select 
                    {...field}
                    isMulti
                    onChange={(selected) =>  {
                      setSelectedOptions(selected || []);
                      field.onChange(selected);
                    }}
                    options={fld.options} 
                    value={selectedOptions}/>
                  } />
                  :
                  <Form.Control
                    type={fld.type}
                    className={`form-control ${errors[fld.name as keyof AddUserForm] ? 'is-invalid' : ''}`}
                    placeholder={fld.placeholder}
                    isInvalid={!!errors[fld.name as keyof AddUserForm]}
                    {...register(fld.name as keyof AddUserForm)}
                  />
                }
                <Form.Control.Feedback type="invalid" className={getErrorMessage(fld.name) ? 'd-block': 'd-none'}>
                  {
                    getErrorMessage(fld.name)
                  }                
                </Form.Control.Feedback>
              </div>
            </Col>
          ))}
        </Row>

        <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
          Add User
        </button>

      </form>
    </div>
  );
};

export default observer(AddUser);