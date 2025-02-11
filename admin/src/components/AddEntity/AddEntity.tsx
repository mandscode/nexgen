import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AddEntityStore } from "./AddEntityStore";
import  "./AddEntity.scss";

import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { EntityStore } from '../Entity/EntityStore';
import { getCountriesWithCurrencies } from '../../api/apiEndpoints';

export interface AddEntityForm {
  name: string;             // Name (Required, max length 255)
  address?: string;         // Address (Optional TEXT field)
  country?: string;         // Country (Optional, max length 100)
  regId?: string;           // regId (Optional, max length 100)
  ownerId: number;          // ownerId (Foreign Key, probably an INT)
  caId: number;             // caId (Foreign Key, probably an INT)
  // Additional fields can be added here
}

export interface AddEntityProps {
 className?: string;
}

const AddEntity = ({ }:AddEntityProps) => {
  const [addEntityStore] = useState(() => new AddEntityStore());

  const entitiesStore = useOutletContext<EntityStore>();

  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  

  const schema = yup.object({
    name: yup.string().max(255).required(),           // Required name field, max length 255
    address: yup.string().optional(),                 // Optional address field (TEXT)
    country: yup.string().max(100).optional(),        // Optional country field, max length 100
    regId: yup.string().max(100).optional(),          // Optional regId, max length 100
    ownerId: yup.number().required().positive().integer(), // Foreign key, required positive integer
    caId: yup.number().required().positive().integer(),    // Foreign key, required positive integer
    // Additional validation fields can be added here as needed
  }).required();
  const { register, handleSubmit, formState: { errors } } = useForm<AddEntityForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
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
  }, [])
  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: AddEntityForm) => addEntityStore.addEntity(data, entitiesStore, navigate);

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Entity Name' },            // Name (Required, max length 255)
    { name: 'address', type: 'text', placeholder: 'Address' },             // Address (Optional TEXT field)
    { name: 'country', type: 'select', placeholder: 'Select Country', options:countryOptions},
    { name: 'regId', type: 'text', placeholder: 'Registration ID' },       // regId (Optional, max length 100)
    { name: 'ownerId', type: 'number', placeholder: 'Owner ID' },          // ownerId (Foreign Key, required)
    { name: 'caId', type: 'number', placeholder: 'CA ID' },                // caId (Foreign Key, required)
    // Add more fields as necessary
  ];
  

  return (
    <div className={`addEntity`}>
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
                                className={`form-control ${errors[field.name as keyof AddEntityForm] ? 'is-invalid' : ''}`}
                                {...register(field.name as keyof AddEntityForm)} // Register the select field
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
                                className={`form-control ${errors[field.name as keyof AddEntityForm] ? 'is-invalid' : ''}`}
                                placeholder={field.placeholder}
                                isInvalid={!!errors[field.name as keyof AddEntityForm]}
                                {...register(field.name as keyof AddEntityForm)}
                              />
                          }
                          <Form.Control.Feedback type="invalid">
                            {errors[field.name as keyof AddEntityForm]?.message && String(errors[field.name as keyof AddEntityForm]?.message)}
                          </Form.Control.Feedback>
                        </div>
                      </Col>
                    ))}
        </Row>

        <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
          Add Entity
        </button>

      </form>
    </div>
  );
};

export default observer(AddEntity);