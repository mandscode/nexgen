import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { UpdateUserAccountDetailsStore } from "./UpdateUserAccountDetailsStore";
import  "./UpdateUserAccountDetails.scss";
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Col, Form, Row } from 'react-bootstrap';
import { getInvestor, getUser } from '../../api/apiEndpoints';
import { UserDetailStore } from '../UserDetail/UserDetailStore';
import { UserAccount } from '../UserDetail/UserDetail';

export interface UpdateUserAccountDetailsProps {
 className?: string;
 setUserAccountlistShow:React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UpdateUserAccount {
  id?:number;
  firstName: string;
  lastName: string;
  email: string;
  status:string;
  roleIds?: Role[]; // Assuming roles is an array of objects
}

interface Role {
  // Define the structure of each role object based on its properties
  [key: string]: any; // Use this if the structure is unknown or flexible
}

const UpdateUserAccountDetails = ({ className="", setUserAccountlistShow }:UpdateUserAccountDetailsProps) => {
  const [updateUserAccountDetailsStore] = useState(() => new UpdateUserAccountDetailsStore());
  const rolesStore = useOutletContext<UserDetailStore>();
  
  const [user, setUser] = useState<UpdateUserAccount>({
    id:0,
    firstName: '',
    lastName: '',
    email: '',
    status:'',
    roleIds: [] // Assuming roles is an array of objects
  });
  const {id} = useParams();

  const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    status: yup.string().required(),
    
  }).required();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateUserAccount>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      status: '',
    },
  });
  
  const navigate = useNavigate();  // Get the navigate function from react-router

  const onSubmit = (data: UpdateUserAccount) => updateUserAccountDetailsStore.updateDetails(data, navigate, Number(user?.id), user, rolesStore, setUserAccountlistShow);
      
  // Define form fields array
  const fields = [
    { name: 'firstName', type: 'text', placeholder: 'First Name', value:user?.firstName },
    { name: 'lastName', type: 'text', placeholder: 'Last Name', value:user?.lastName },
    { name: 'email', type: 'email', placeholder: 'Email', value:user?.email },
    { name: 'status', type: 'switch', placeholder: 'Status', value:user?.status },
  ];

  useEffect(() => {
    // Fetch users
    const fetchUser = async () => {
      try {
        const investor = await getInvestor(Number(id));

        const userDetail = await getUser(Number(investor.userId));

        setUser({
          id:userDetail?.id,
          firstName: userDetail?.firstName,
          lastName: userDetail?.lastName,
          email:userDetail?.email,
          status:userDetail?.status,
          roleIds:userDetail?.roles
        });

        reset({
          firstName: userDetail?.firstName,
          lastName: userDetail?.lastName,
          email:userDetail?.email,
          status:userDetail?.status,
        })
        
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUser();
  }, []);

  const onChangeStatus = async () => {
    try {
      if(user) {
        const currentStatus = user.status || 'inactive';
        const updatedStatus = currentStatus === 'active' ? 'inactive' : 'active';

        // Directly update the user object
        setUser((prevUser:any) => ({
          ...prevUser,
          status: updatedStatus,
        }));
      }  
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleChange = (fieldName: keyof UpdateUserAccount, value: string) => {
    setUser((prevUser:any) => ({
      ...prevUser,
      [fieldName]: value,
    }));

  };

  return (
    <div className={`updateUserAccountDetails`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {fields.map((field) => (
            <Col key={field.name} md={6} className="mb-3">
              <div className="form-group">
                <label className="form-label">{field.placeholder}</label>
                {
                  field.type == 'switch' ? 
                    <Form.Check
                      type="switch"
                      checked={user?.status == 'active'} // Set the checked state based on the status
                      id={`custom-switch-${user?.status}`}
                      onChange={() => onChangeStatus()}
                    />
          :
                  <Form.Control
                    type={field.type}
                    className={`form-control ${errors[field.name as keyof UpdateUserAccount] ? 'is-invalid' : ''}`}
                    placeholder={field.placeholder}
                    isInvalid={!!errors[field.name as keyof UpdateUserAccount]}
                    value={field.value || ''}
                    {...register(field.name as keyof UpdateUserAccount, {
                      onChange: (e) => handleChange(field.name as keyof UpdateUserAccount, e.target.value),
                    })}
                  />
                }
                <Form.Control.Feedback type="invalid">
                  {errors[field.name as keyof UpdateUserAccount]?.message && String(errors[field.name as keyof UpdateUserAccount]?.message)}
                </Form.Control.Feedback>
              </div>
            </Col>
          ))}
        </Row>
        <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
          Update Details
        </button>

      </form>
    </div>
  );
};

export default observer(UpdateUserAccountDetails);