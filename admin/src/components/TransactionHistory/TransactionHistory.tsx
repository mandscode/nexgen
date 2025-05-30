import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { TransactionHistoryStore } from "./TransactionHistoryStore";
import  "./TransactionHistory.scss";
import { Outlet, useLocation } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { Card } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';
// import { TransactionDTO } from '../AddTransactions/AddTransactions';
import { getAccount, getCurrencyAll, getInvestor, getProject, getTransactions, getUser } from '../../api/apiEndpoints';


interface Transaction {
  id: number;              // Primary Key (Auto Incremented)
  accountId: number;       // Foreign Key to Account (INT)
  userId: number;          // Foreign Key to User (INT)
  projectId: number;       // Foreign Key to Projects (INT)
  credited: boolean;       // Boolean indicating whether the transaction is credited
  amount: number;          // Decimal value (15,2) for the transaction amount
  createdDate: Date;       // Date when the transaction was created
}


export interface TransactionHistoryProps {
 className?: string;
}

const TransactionHistory = ({ }:TransactionHistoryProps) => {
  const [transactionHistoryStore] = useState(() => new TransactionHistoryStore());

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const title = 'Transaction History';

  // const btntitle = !pathname.includes('add') ? 'Add Transactions' : 'Show Transactions';

  const defaultColumns: ColumnDef<Transaction>[] = [
    {
      header: 'Transaction Details',
      columns: [
        // {
        //   accessorKey: 'id',
        //   header: 'ID',
        //   cell: info => info.getValue(),
        // },
        {
          accessorKey: 'entityName',
          header: 'Entity Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'projectId',
          header: 'Project Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'userId',
          header: 'User Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'accountId',
          header: 'Currency',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'credited',
          header: 'Credited',
          cell: info => (info.getValue() ? 'Yes' : 'No'), // Display 'Yes' or 'No' based on boolean
        },
        {
          accessorKey: 'amount',
          header: 'Amount',
          cell: info => info.getValue().toFixed(2), // Format decimal amount
        },
        {
          accessorKey: 'createdDate',
          header: 'Created Date',
          cell: info => new Date(info.getValue()).toLocaleDateString(), // Format date to readable format
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(); // Call the getTransactions function

        const formattedData = await Promise.all(
          data.map(async (value: any) => {
            const allCurr = await getCurrencyAll();
            const account = await getAccount(value.accountId); // Await the asynchronous call
            const investor = await getInvestor(account.investorId); // Await the asynchronous call
            const user = await getUser(investor.userId); 
            const project = await getProject(value.projectId)         // Await the asynchronous call


            const currency = allCurr.find((curr: any) => curr.id === account.currency); // Find matching currency
              

            return {
              id: value.id,
              accountId: currency.name,
              entityName: project.entity.name,
              projectId: project.name,
              credited: value.credited,
              amount: value.amount,
              createdDate: value.transactionDate,
              userId: user.firstName, // Example if you want to include user data
            };
          })
        );
        setTransactions(formattedData); // Set the fetched and formatted data to state
      } catch (err) {
        console.log('Failed to fetch transactions');
      }
    };

    fetchTransactions(); // Call the fetch function
  }, []);
  
  
  

  // const onClickNavigate = () => {
  //   if (pathname.includes('add')) {
  //     navigate("/transactions");
  //   } else {
  //     navigate("/transactions/add"); // Change this to the correct "Show Users" path
  //   }
  // };

  return (
    <div className={`transactionHistory`}>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-end row">
              <div className="col">
                <h6 className="header-pretitle">Overview</h6>
                <h1 className="header-title">{title}</h1>
              </div>
              <div className="col-auto">
                {/* <button onClick={onClickNavigate} type="button" className="lift btn btn-primary">{btntitle}</button> */}
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
                <NexGenTable columns={defaultColumns} data={transactions} ></NexGenTable>
              </Card.Body>
            </Card>
            :
            null
        }
        <Outlet context={transactionHistoryStore} />
      </div>
    </div>
  );
};

export default observer(TransactionHistory);