import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { observer } from 'mobx-react-lite'
import { AssignProjectStore } from "./AssignProjectStore";
import  "./AssignProject.scss";
import { InvestorStore } from '../Investor/InvestorStore';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Investor } from '../Utilities/interface/interface';
import { Col, Form, Row } from 'react-bootstrap';
import { getProjects, getUsers } from '../../api/apiEndpoints';

export interface AssignProjectProps {
 className?: string;
}

const AssignProject = ({ }:AssignProjectProps) => {
  const [assignProjectStore] = useState(() => new AssignProjectStore());
  const investorStore = useOutletContext<InvestorStore>();

  const [userOptions, setUserOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);

  const schema = yup
  .object({
    userId: yup.string().required('User ID is required'),
    projectIds: yup.number().required('User ID is required'),
    emergencyContact: yup.object().shape({
      name: yup.string().required('Emergency contact name is required'),
      mobile: yup.number().required('Emergency contact phone is required'),
      relation: yup.string().required('Emergency contact phone is required'),
    }),
    // projectIds: yup.array().min(1, "select atleast one role").required()
  })
  .required()
  const { register, handleSubmit, formState: { errors } } = useForm<Investor>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: Investor) => assignProjectStore.assignProject(data, investorStore, navigate);



  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      try {
        const users = await getUsers();

        setUserOptions(
          users
            .filter((user: any) => {
              // Check if the user doesn't have the "Investor" role
              return user.roles && !user.roles.some((role: any) => role.name === "Investor");
            })
            .map((user: any) => ({
              id: user.id,
              name: user.firstName,
            }))
        );
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    // Fetch projects
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();
        setProjectOptions(projects.map((project:any) => ({ id: project.id, name: project.name })));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchUsers();
    fetchProjects();
  }, []);

  // Define form fields array
  const fields = [
    { name: 'userId', type: 'select', placeholder: 'Select User', options:userOptions },
    { name: 'projectIds', type: 'select', placeholder: 'Select Project', options:projectOptions },
    { name: 'emergencyContact.name', type: 'text', placeholder: 'Emergency Contact Name' },
    { name: 'emergencyContact.relation', type: 'text', placeholder: 'Emergency Contact Relation' },
    { name: 'emergencyContact.mobile', type: 'number', placeholder: 'Emergency Contact Number' }
  ];

  // const [selectedOptions, setSelectedOptions] = useState<readonly {value: number, label: string}[]>([]);

  function getErrorMessage(name: string): string {
    const fieldError = errors[name as keyof Investor];
    if(fieldError) {
       if(Array.isArray(fieldError)) {
        return fieldError[0].message;
       }
       return fieldError.message as string;
    }
    return "";
  }

  return (
    <div className={`assignProject`}>
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
                      className={`form-control ${errors[field.name as keyof Investor] ? 'is-invalid' : ''}`}
                      {...register(field.name as keyof Investor)} // Register the select field
                    >
                      <option>Open this select menu</option>
                      {
                        field.options && field.options.map((option: { name: string, id:number }, index: number) => (
                          <option key={index} value={option.id}>{option.name}</option>
                        ))
                      }
                    </Form.Select>
                    :
                    <Form.Control
                      type={field.type}
                      className={`form-control ${errors[field.name as keyof Investor] ? 'is-invalid' : ''}`}
                      placeholder={field.placeholder}
                      isInvalid={!!errors[field.name as keyof Investor]}
                      {...register(field.name as keyof Investor)}
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

        <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
          Assign Project
        </button>

      </form>
    </div>
  );
};

export default observer(AssignProject);