import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { InvestorStore } from "./InvestorStore";
import  "./Investor.scss";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { Card } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';

// import UseSearch from '../Utilities/Forms/useSearch';
import { ArrowRight } from 'react-feather';

export interface InvestorProps {
 className?: string;
}

export interface InvestorInterface {
  firstName:string;
  lastName:string;
  email:string;
  accountInfo:string;
  details?:any;
}

const Investor = ({ }:InvestorProps) => {
  const { pathname } = useLocation();
  const [investorStore] = useState(() => new InvestorStore());

  const navigate = useNavigate();

  const defaultColumns: ColumnDef<InvestorInterface>[] = [
    {
      header: 'All Investors',
      columns: [
        {
          accessorKey: 'firstName',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'lastName',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'email',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'accountInfo',
          cell: info => {
            const accountInfoValue = info.getValue();
            
            return (
              <Link to={`/investors/assign/account/${accountInfoValue}`} style={{ cursor: 'pointer' }}>
                <ArrowRight />
              </Link>
            );
          },
        },
        {
          accessorKey: 'details',
          cell: info => <Link to={`investor-detail/${info.getValue()}`}><ArrowRight/></Link>
        }
      ],
    },
  ];

  const title = pathname.includes('add')
  ? 'Assign Projects to Investor'
  : 'Investors';

  const btntitle = !pathname.includes('add') ? 'Create Investor and Assign Project ' : 'Show Investors';

  const onClickNavigate = (role:string) => {
    if (pathname.includes('add')) {
      return navigate("/investors"); // Change this to the correct "Show Users" path
    } if(role.includes('account')) {
      return navigate("/investors/assign/account"); // Change this to the correct "Show Users" path
    }
    if(pathname.includes("investors/assign/account")) {
      return navigate("/investors"); // Change this to the correct "Show Users" path
    }
    if(pathname.includes("investors/accounts")) {
      return navigate(-1); // Change this to the correct "Show Users" path
    }
    else {
      navigate(`/${role}/add`);
    }
  };

  return (
    <>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-end row">
              <div className="col">
                <h6 className="header-pretitle">Search here</h6>
                <h1 className="header-title">{title === "Investors" ? 
                  // <UseSearch searchKeys={['firstName', 'lastName', 'email']} data={investorStore?.data} onSearch={handleSearch} /> 
                  <></>
                  : 
                  title}
                </h1>
              </div>
              {
                !pathname.includes("investor-detail") && !pathname.includes("account") ?
                  <div className="col-auto">
                    <button onClick={() => { onClickNavigate("investors") }} type="button" className="lift btn btn-primary">
                      {btntitle}
                    </button>
                </div>
              :
              pathname.includes("investors/assign/account") ?
              <div className="col-auto">
                <button onClick={() => { onClickNavigate("investors/add") }} type="button" className="lift btn btn-primary">
                  Show Investors
                </button>
            </div>
            :             
            pathname.includes("investors/accounts") ?
            <div className="col-auto">
              <button onClick={() => { onClickNavigate("investors/add") }} type="button" className="lift btn btn-primary">
                Assign Accounts
              </button>
          </div>
              :
              !pathname.includes("investor-detail") ?
              <div className="col-auto">
                <button onClick={() => { onClickNavigate("investors") }} type="button" className="lift btn btn-primary">
                  {btntitle}
                </button>
              </div>
              :
              null
              }
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        {
          !(pathname.includes('add') || pathname.includes('investor-detail') || pathname.includes('account')) ?
            <Card>
              <Card.Header></Card.Header>
              <Card.Body>
                <NexGenTable columns={defaultColumns} data={investorStore.data} ></NexGenTable>
              </Card.Body>
            </Card>
            :
            null
        }
        <Outlet context={investorStore} />
      </div>
      </>
  );
};

export default observer(Investor);