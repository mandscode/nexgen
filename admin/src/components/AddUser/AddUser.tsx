import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UsersStore } from '../Users/UsersStore';
import "./AddUser.scss";
import { AddUserStore } from "./AddUserStore";
import { getEntities, getUser } from '../../api/apiEndpoints';
import { Eye, EyeOff } from 'react-feather';

export interface AddUserForm {
  firstName: string;
  lastName: string;
  email: string;
  roles: any;
  password?:string;
  entityIds?:any;
}

export interface AddUserProps {
 className?: string;
}

const AddUser = ({ }:AddUserProps) => {
  const [addUserStore] = useState(() => new AddUserStore());
  const [entities, setEntities] = useState<{value: number, label: string}[]>();
  const [showPassword, setShowPassword] = useState(false);

  const [selectedRole, setSelectedRole] = useState<string | null>(null); // Track selected role
  const [rolesData, setRoles] = useState<any>([]); // Track selected role
  
  const togglePassword = () => setShowPassword((prev) => !prev);
  const usersStore = useOutletContext<UsersStore>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entitiesData = await getEntities();
        // Use runInAction to modify observable data inside async functions
        
        const data = entitiesData.map((entity: any) => ({
          value: entity.id,
          label: entity.name
        }));
        
        setEntities(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    fetchData();
  }, [])  
  
  
  const roles = usersStore.roles;

    // 🔹 Get isMasterAdmin from localStorage and convert it to boolean
    const isMasterAdmin = localStorage.getItem("isMasterAdmin") === "true";


  const userId = localStorage.getItem('userIds')
  useEffect(() => {
    const apiData = async () => {
      try {
        const res = await getUser(Number(userId))
        
        
        if(res.roles) {
          let isAdmin = res.roles.find((role:any) => role.name === "Admin");
          if (isAdmin) {
            let filteredRoles = roles.filter(role => role.name !== "Master Admin" && role.name.toLowerCase() !== "investor");

            const a = filteredRoles.map(role => ({ value: role.id, label: role.name }));
            
            setRoles(a)
          } else {
            let filteredRoles = roles.filter(role => role.name.toLowerCase() !== "investor");
            const a = filteredRoles.map(role => ({ value: role.id, label: role.name }));
            setRoles(a)
            
          }
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    apiData()
  }, [userId, roles])
  const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    roles: yup.string().required(),
    entityIds: yup.array().when("roles", {
      is: (role: string) => role != '1' && role != '4',
      then: (schema) => schema.min(1, "Select at least one Entity").required(),
      otherwise: (schema) => schema.notRequired().default([]) // Provide a static default
    })
  })
  .required()
  const { register, handleSubmit, formState: { errors }, control, watch, setValue   } = useForm<AddUserForm>({
    resolver: yupResolver(schema),
  });
  const selectedRoleIds = watch("roles"); // Get selected roles from form
  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: AddUserForm) => addUserStore.addUser(data, usersStore,  navigate);


  // Define form fields array and filter out the 'Investor' role
  const fields = [
    { name: 'firstName', type: 'text', placeholder: 'First Name' },
    { name: 'lastName', type: 'text', placeholder: 'Last Name' },
    { name: 'email', type: 'email', placeholder: 'Email Address' },
    { 
      name: 'password', 
      type: 'password', 
      placeholder: 'password',
      validation: {
        required: 'Password is required',
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
        },
      },
    },
    {
      name: 'roles',
      type: 'select',
      placeholder: 'Roles',
      options: rolesData
    },
    ...(selectedRole?.toLowerCase() !== "admin" && selectedRole?.toLowerCase() !== "master admin"
      ? [
          {
            name: 'entityIds',
            type: 'multiselect',
            placeholder: 'Select Entity',
            options: entities, // Replace with your entities data
          },
        ]
      : [])
  ];

  const [selectedOptions, setSelectedOptions] = useState<{value: number, label: string}>();
  const [selectedOptionsMulti, setSelectedOptionsMulti] = useState<readonly {value: number, label: string}[]>([]);

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

  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({});
  const [personalInfo, setPersonalInfo] = useState({ firstName: "", email: "" });
  const handleValidation = (name: string, value: string) => {
    if (name === "firstName" || name === "email") {
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "password") {
      let errorMessage = "";
  
      // Rule 1: Minimum Length (8-16 characters)
      if (value.length < 8 || value.length > 16) {
        errorMessage = "Password must be 8-16 characters long.";
      }
  
      // Rule 2: Upper & Lowercase Letters
      else if (!/[A-Z]/.test(value) || !/[a-z]/.test(value)) {
        errorMessage = "Password must include at least one uppercase and one lowercase letter.";
      }
  
      // Rule 3: Numbers
      else if (!/\d/.test(value)) {
        errorMessage = "Password must include at least one number.";
      }
  
      // Rule 4: Special Characters
      else if (!/[@$!%*?&]/.test(value)) {
        errorMessage = "Password must include at least one special character (@, #, $, %, &, *, !).";
      }
  
      // Rule 5: No Common Words or Patterns
      else if (/(password|admin|12345678)/i.test(value)) {
        errorMessage = "Password cannot be a common word or pattern.";
      }
  
      // ✅ Rule 6: No Personal Information (First Name, Email)
      else if (
        personalInfo.firstName &&
        value.toLowerCase().includes(personalInfo.firstName.toLowerCase())
      ) {
        errorMessage = "Password cannot contain your first name.";
      } 
      else if (
        personalInfo.email &&
        value.toLowerCase().includes(personalInfo.email.split("@")[0].toLowerCase())
      ) {
        errorMessage = "Password cannot contain your email.";
      }
  
      // Rule 7: No Consecutive or Repetitive Characters
      else if (/(.)\1{2,}/.test(value) || /(0123|1234|abcd)/i.test(value)) {
        errorMessage = "Password cannot contain consecutive or repetitive characters.";
      }
  
      // If no errors, clear the error message
      if (errorMessage) {
        setInputErrors((prev) => ({ ...prev, [name]: errorMessage }));
      } else {
        setInputErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };
  


  // Handle role selection change
  const handleRoleChange = (selected: any) => {
    setSelectedRole(selected?.label); // Update selected role
    if (selected?.value === 1 || selected?.value === 4) {
      setValue("entityIds", []); // ✅ Reset entityIds when selecting Admin/Master Admin
    }
  };

  return (
    <div className={`addUser`}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
          {fields.map((fld) => (
              <Col key={fld.name} md={6} className="mb-3" >
                <div className="form-group">
                  <label className="form-label">{fld.placeholder}</label>
                  {
                    fld.type === "select" ?
                    // fld.type === "multiselect" ?
                    
                    <Controller
                      name={fld.name as keyof AddUserForm}
                      control={control}
                      render={({ field }) => <Select 
                      {...field}
                      // isMulti
                      onChange={(selected) => {
                        field.onChange(selected?.value);
                        if (fld.name === 'roles') {
                          handleRoleChange(selected); // Update selected role
                        }
                      }}
                      options={fld.options} 
                      value={selectedOptions}/>
                    } />
                    :
                    fld.type === "multiselect" ?
                  
                  <Controller
                    name={fld.name as keyof AddUserForm}
                    control={control}
                    render={({ field }) => <Select 
                    {...field}
                    isMulti
                    onChange={(selected) =>  {
                      setSelectedOptionsMulti(selected || []);
                      field.onChange(selected);
                    }}
                    options={fld.options} 
                    value={selectedOptions}/>
                  } />
                  :
                  <div className="position-relative">
                    <Form.Control
                      type={fld.type === "password" ? (showPassword ? "text" : "password") : fld.type} className={`form-control ${errors[fld.name as keyof AddUserForm] ? 'is-invalid' : ''}`}
                      placeholder={fld.placeholder}
                      isInvalid={!!errors[fld.name as keyof AddUserForm]}
                      {...register(fld.name as keyof AddUserForm, {
                        onChange: (e) => handleValidation(fld.name, e.target.value), // Call validation on change
                      })}
                      
                    />
                    {fld.type === "password" && (
                      <span
                        onClick={togglePassword}
                        className="position-absolute end-0 top-50 translate-middle-y me-2 cursor-pointer"
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </span>
                    )}
                  </div>
                  }
                  <Form.Control.Feedback type="invalid" className={getErrorMessage(fld.name) || inputErrors[fld.name] ? 'd-block': 'd-none'}>
                    {
                      getErrorMessage(fld.name)
                    } 
                    {inputErrors[fld.name] ? inputErrors[fld.name] : ''}

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