import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
// import { AccountsStore } from "./AccountsStore";
import  "./Accounts.scss";
import { useParams } from 'react-router-dom';
import { getAccountOfInvestor, removeAccountOfInvestor } from '../../api/apiEndpoints';
import { Button, Card } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';
import { ColumnDef } from '@tanstack/react-table';
import { X } from 'react-feather';

export interface AccountsProps {
 className?: string;
 setShowAccounts:any;
 showAccounts:any;
}

export interface AccountsInterface {
  id:number;
  accountName?: string;
}


const Accounts = ({ setShowAccounts, showAccounts }:AccountsProps) => {
  // const [accountsStore] = useState(() => new AccountsStore());
  const {id} = useParams();

  const [accountsData, showAccountsData] = useState([]);

  const fetchAccounts = async () => {
    try {
      const accounts = await getAccountOfInvestor(Number(id));
      const assignedAcc = accounts.map((acc: any) => {return {accountName:acc.currency, id:acc.id}}); // Map account names

      showAccountsData(assignedAcc) // Uncomment if needed
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [id]); // Adding `id` as a dependency

  const handleClick = async (accId:number) => {
    try {
      await removeAccountOfInvestor(accId);
      await fetchAccounts();
    } catch (error) {
      console.log(error)
    }
  }

  const defaultColumns: ColumnDef<AccountsInterface>[] = [
    {
      header: 'All Accounts',
      columns: [
        {
          accessorKey: 'accountName',
          cell: info => info.getValue(),
        },
        // {
        //   accessorKey: 'id',
        //   header: 'Delete Account for this Investor',
        //   cell: info => <Button variant="link" onClick={() => {handleClick(Number(info.getValue()))}}><X/></Button>
        // }
      ]
    },
  ];

  return (
    <div className={`accounts`}>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <NexGenTable columns={defaultColumns} data={accountsData} ></NexGenTable>
        {showAccounts && (
          <button
            className="btn btn-lg w-25 btn-primary mb-3"
            onClick={() => setShowAccounts(false)}
          >
            Assign Account
          </button>
        )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default observer(Accounts);