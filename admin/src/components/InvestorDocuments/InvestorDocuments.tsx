import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { InvestorDocumentsStore } from "./InvestorDocumentsStore";
import  "./InvestorDocuments.scss";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';

import exampleData from '../../json/example.json';
import { Card } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';

import { Document as InvestorDocumentsForm } from '../Utilities/interface/interface';

export interface InvestorDocumentsProps {
 className?: string;
}

const InvestorDocuments = ({  }:InvestorDocumentsProps) => {
  const [investorDocumentsStore] = useState(() => new InvestorDocumentsStore());

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const title = pathname.includes('add') ? 'Upload/Delete Documents' : 'Documents';
  const btntitle = !pathname.includes('add') ? 'Upload/Delete Documents' : 'Documents';

  const [data, setData] = useState<InvestorDocumentsForm[]>([{
    docName: "",
    docPath: "",
    status:""
  }]);

  const defaultColumns: ColumnDef<InvestorDocumentsForm>[] = [
    {
      header: 'All Docs',
      columns: [
        {
          accessorKey: 'docName',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'docPath',
          cell: info => <a target='main' href={info.getValue()}>Click ok to view</a>,
        },
        {
          accessorKey: 'status',
          cell: info => <input type='checkbox'/>,
        }
      ],
    },
  ];

  useEffect(() => {
    const investorsDocs = exampleData.Users.filter((user) => user.role === "investor").flatMap((user) => {
      let documents = user.investorProfile?.documents || [];
      
      // Map the documents and return them in the correct structure
      return documents.map((doc:any) => ({
        docName: doc?.docName || "", 
        docPath: doc?.docPath || "",
        status: doc?.status || ""
      }));
    });
  
    // Set the aggregated investors data
    setData(investorsDocs);
  }, [exampleData]);
  

  const onClickNavigate = () => {
    if (pathname.includes('add')) {
      navigate("/investors/documents-details"); // Change this to the correct "Show Users" path
    } else {
      navigate("/investors/documents-details/add");
    }
  };

  return (
    <>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-end row">
              <div className="col">
                <h6 className="header-pretitle">Overview</h6>
                <h1 className="header-title">{title}</h1>
              </div>
              <div className="col-auto">
                <button onClick={onClickNavigate} type="button" className="lift btn btn-primary">{btntitle}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        {
          !pathname.includes('add') ? 
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <NexGenTable columns={defaultColumns} data={data} ></NexGenTable>
            </Card.Body>
          </Card>
          :
          null
        }
        <Outlet />
      </div>
    </>
  );
};

export default observer(InvestorDocuments);