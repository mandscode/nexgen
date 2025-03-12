import {  useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AddInvestorPersonalDetailsStore } from "./AddInvestorPersonalDetailsStore";
import  "./AddInvestorPersonalDetails.scss";
import { Col, Form, Row } from 'react-bootstrap';
// import { AppStore } from '../../AppStore';
// import { AppContext } from '../../AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';

export interface AddInvestorPersonalDetailsProps {
 className?: string;
 personalDetailList?:any;
}

export interface AddInvestorPersonalDetails {
  mobile: number,
  dob: string,
  residentialAddress: string,
  mailingAddress: string
}

interface FormField {
  name: string; // Ensure the name is a key of your details interface
  type: string;
  placeholder: string;
  as?: React.ElementType; // Optional, for custom components
}

const AddInvestorPersonalDetails = ({  }:AddInvestorPersonalDetailsProps) => {
  const [addInvestorPersonalDetailsStore] = useState(() => new AddInvestorPersonalDetailsStore());

  const {id} = useParams();

  // const appStore = useContext<AppStore>(AppContext);
  // const investorPersonalDetailsStore = useOutletContext<InvestorPersonalDetailsStore>();

  const schema = yup.object({
    mobile: yup.number().required(),
    dob: yup.string().required(),
    residentialAddress: yup.string().required(),
    mailingAddress: yup.string().required()
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm<AddInvestorPersonalDetails>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: AddInvestorPersonalDetails) => addInvestorPersonalDetailsStore.addPersonalDetails(data, navigate, Number(id));
    
  // Define form fields array
  const fields:FormField[] = [
    { name: 'mobile', type: 'number', placeholder: 'Mobile Number' },
    { name: 'dob', type: 'date', placeholder: 'Date of birth' },
    { name: 'residentialAddress', type: 'text', placeholder: 'Residential Address', as:"textarea" },
    { name: 'mailingAddress', type: 'text', placeholder: 'Mailing Address', as:"textarea"  },
  ];

    // Function to restrict input to numbers only
    const handleNumericInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className={`addInvestorPersonalDetails`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {fields.map((field) => (
            <Col key={field.name} md={6} className="mb-3">
              <div className="form-group">
                <label className="form-label">{field.placeholder}</label>
                
                  <Form.Control
                    as={field.as || "input"}
                    type={field.type}
                    onKeyDown={field.type === 'number' ? handleNumericInput : undefined} // Restrict input for mobile field
                    className={`form-control ${errors[field.name as keyof AddInvestorPersonalDetails] ? 'is-invalid' : ''}`}
                    placeholder={field.placeholder}
                    isInvalid={!!errors[field.name as keyof AddInvestorPersonalDetails]}
                    {...register(field.name as keyof AddInvestorPersonalDetails)}
                  />
                
                <Form.Control.Feedback type="invalid">
                  {errors[field.name as keyof AddInvestorPersonalDetails]?.message && String(errors[field.name as keyof AddInvestorPersonalDetails]?.message)}
                </Form.Control.Feedback>
              </div>
            </Col>
          ))}
        </Row>

        <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
          Add/Update Investor Personal Details
        </button>

      </form>
    </div>
  );
};

export default observer(AddInvestorPersonalDetails);