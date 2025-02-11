import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AddProjectStore } from "./AddProjectStore";
import  "./AddProject.scss";

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { AppStore } from '../../AppStore';
import { AppContext } from '../../AppContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { getCountriesWithCurrencies, getEntities } from '../../api/apiEndpoints';
import { AcademyStore } from '../Academy/AcademyStore';
import { ProjectStore } from '../Project/ProjectStore';

export interface AddProjectForm {
  entityID: number;
  name: string;
  address: string;
  // latitude: number;
  // longitude: number;
  startDate: string;
  actualMaturityDate: string;
  overallCost: number;
  description: string;
  ownerName: string;
  legalId: number;
  maturityLockingPeriod: number;
  countryName: string;
  // resourceGroupId: number;
}

export interface AddProjectProps {
 className?: string;
}

const AddProject = ({ }:AddProjectProps) => {
  const [addProjectStore] = useState(() => new AddProjectStore());

  const [entityOptions, setEntityOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the entities from the API
    const fetchEntities = async () => {
      try {
        const response = await getEntities();
        // Assuming the response is an array of entities with `entityID` and `name` fields
        const formattedEntities = response.map((entity: any) => ({
          value: entity.id,
          label: entity.name,
        }));
        setEntityOptions(formattedEntities);
      } catch (error) {
        console.error('Failed to fetch entities:', error);
      }
    };

    // Fetch the entities from the API
    const fetchCountriesWithCurrencies = async () => {
      try {
        const response = await getCountriesWithCurrencies();
        // Assuming the response is an array of entities with `entityID` and `name` fields
        const formattedData = response.map((entity: any) => ({
          value: entity.country_name,
          label: entity.country_name,
        }));
        setCountryOptions(formattedData);
      } catch (error) {
        console.error('Failed to fetch entities:', error);
      }
    };

    fetchCountriesWithCurrencies()
    fetchEntities();
  }, []);


  const appStore = useOutletContext<ProjectStore>();

  const schema = yup
  .object({
    entityID: yup.number().required(),
    name: yup.string().required(),
    address: yup.string().required(),
    countryName: yup.string().required(),
    // latitude: yup.number().required(),
    // longitude: yup.number().required(),
    startDate: yup.string().required(),
    actualMaturityDate: yup.string().required(),
    overallCost: yup.number().required(),
    description: yup.string().required(),
    ownerName: yup.string().required(),
    legalId: yup.number().required(),
    maturityLockingPeriod: yup.number().required(),
    // resourceGroupId: yup.number().required(),
  })
  .required();

  const { register, handleSubmit, formState: { errors } } = useForm<AddProjectForm>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router

  const onSubmit = (data: AddProjectForm) => addProjectStore.addProject(data, appStore, navigate);
  
  const fields = [
    { name: 'entityID', type: 'select', placeholder: 'Entity', options:entityOptions},
    { name: 'name', type: 'text', placeholder: 'Project Name' },
    { name: 'address', type: 'text', placeholder: 'Address' },
    { name: 'countryName', type: 'select', placeholder: 'Select Country', options:countryOptions},
    // { name: 'latitude', type: 'number', placeholder: 'Latitude' },
    // { name: 'longitude', type: 'number', placeholder: 'Longitude' },
    { name: 'startDate', type: 'date', placeholder: 'Start Date' },
    { name: 'actualMaturityDate', type: 'date', placeholder: 'Actual Maturity Date' },
    { name: 'overallCost', type: 'number', placeholder: 'Overall Cost' },
    { name: 'description', type: 'textarea', placeholder: 'Project Description' },
    { name: 'ownerName', type: 'text', placeholder: 'Owner Name' },
    { name: 'legalId', type: 'number', placeholder: 'Legal ID' },
    { name: 'maturityLockingPeriod', type: 'number', placeholder: 'Maturity Locking Period (Days)' },
    // { name: 'resourceGroupId', type: 'number', placeholder: 'Resource Group ID' },
  ];
  
  return (
    <div className={`addProject`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {fields.map((field) => (
            <Col key={field.name} md={6} className="mb-3">
              <div className="form-group">
                <label className="form-label">{field.placeholder}</label>
                {
                  field.type === "select" ?
                    <Form.Select
                      aria-label="Default select example"
                      className={`form-control ${errors[field.name as keyof AddProjectForm] ? 'is-invalid' : ''}`}
                      {...register(field.name as keyof AddProjectForm)} // Register the select field
                    >
                      <option>Open this select menu</option>
                      {
                        field.options && field.options.map((entity: { value: number, label:string }, index: number) => (
                          <option key={index} value={entity.value}>{entity.label}</option>
                        ))
                      }
                    </Form.Select>
                    :
                    <Form.Control
                      type={field.type}
                      className={`form-control ${errors[field.name as keyof AddProjectForm] ? 'is-invalid' : ''}`}
                      placeholder={field.placeholder}
                      isInvalid={!!errors[field.name as keyof AddProjectForm]}
                      {...register(field.name as keyof AddProjectForm)}
                    />
                }
                <Form.Control.Feedback type="invalid">
                  {errors[field.name as keyof AddProjectForm]?.message && String(errors[field.name as keyof AddProjectForm]?.message)}
                </Form.Control.Feedback>
              </div>
            </Col>
          ))}
        </Row>
        <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
          Add Project
        </button>

      </form>
    </div>
  );
};

export default observer(AddProject);