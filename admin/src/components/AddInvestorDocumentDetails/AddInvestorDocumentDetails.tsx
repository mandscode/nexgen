import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AddInvestorDocumentDetailsStore } from "./AddInvestorDocumentDetailsStore";
import  "./AddInvestorDocumentDetails.scss";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { AppStore } from '../../AppStore';
import { AppContext } from '../../AppContext';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Col, Form, Row } from 'react-bootstrap';
import { InvestorDocumentsForm } from '../UserDetail/UserDetail';

export interface AddInvestorDocumentDetailsProps {
 className?: string;
 setDocDetailList?:any;
}

export interface AddInvestorDocumentsForm {
  docName: string,
  docUrl: File[],
  status:boolean
}

const AddInvestorDocumentDetails = ({setDocDetailList }:AddInvestorDocumentDetailsProps) => {
  const [addInvestorDocumentDetailsStore] = useState(() => new AddInvestorDocumentDetailsStore());
  const docsDetailStore = useOutletContext<InvestorDocumentsForm>();

  const { id } = useParams();

  const schema = yup
  .object({
    docName: yup.string().required(),
    docUrl: yup.mixed<File[]>().required("Credited status is required"),
    status:yup.boolean().required(' status is required')
  })
  .required()
  const { register, handleSubmit, formState: { errors } } = useForm<AddInvestorDocumentsForm>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();  // Get the navigate function from react-router
  
  const onSubmit = (data: AddInvestorDocumentsForm) => addInvestorDocumentDetailsStore.addInvestorDocsDetails(data, docsDetailStore, navigate, Number(id), setDocDetailList);

   // Define form fields array
   const fields = [
    { name: 'docName', type: 'text', placeholder: 'Doc Name' },
    { name: 'docUrl', type: 'file', placeholder: 'Doc File' },
    { name: 'status', type: 'switch', placeholder: 'is Verified ?' },
  ];

  return (
    <div className={`addInvestorDocumentDetails`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {fields.map((field) => (
            <Col key={field.name} md={6} className="mb-3">
              <div className="form-group">
                <label className="form-label">{field.placeholder}</label>
                {
                  field.type == 'switch' ?
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="status"
                    // label={field.placeholder}
                    isInvalid={!!errors[field.name as keyof AddInvestorDocumentsForm]}
                    {...register(field.name as keyof AddInvestorDocumentsForm)}
                  />
                  :
                  <Form.Control
                    type={field.type}
                    className={`form-control ${errors[field.name as keyof AddInvestorDocumentsForm] ? 'is-invalid' : ''}`}
                    placeholder={field.placeholder}
                    isInvalid={!!errors[field.name as keyof AddInvestorDocumentsForm]}
                    {...register(field.name as keyof AddInvestorDocumentsForm)}
                  />
                }
                
                <Form.Control.Feedback type="invalid">
                  {errors[field.name as keyof AddInvestorDocumentsForm]?.message && String(errors[field.name as keyof AddInvestorDocumentsForm]?.message)}
                </Form.Control.Feedback>
              </div>
            </Col>
          ))}
        </Row>

        <button className="btn btn-lg w-100 btn-primary mb-3" type='submit'>
          Add Documents
        </button>

      </form>
    </div>
  );
};

export default observer(AddInvestorDocumentDetails);