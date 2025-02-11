import { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { EntityStore } from "./EntityStore";
import  "./Entity.scss";
import { Card } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
// import { getEntities } from "../../api/apiEndpoints";
import UseSearch from '../Utilities/Forms/useSearch';

export interface Entity {
  id: number;               // Id (Primary Key, Auto Incremented)
  name: any;             // Name (Required, max length 255)
  address?: string;         // Address (Optional TEXT field)
  country?: string;         // Country (Optional, max length 100)
  regId?: string;           // regId (Optional, max length 100)
  ownerId: number;          // ownerId (Foreign Key, probably an INT)
  caId: number;             // caId (Foreign Key, probably an INT)
  // Additional fields can be added here
}


export interface EntityProps {
 className?: string;
}

const Entity = ({ }:EntityProps) => {
  const [entityStore] = useState(() => new EntityStore());
  const [filteredEntities, setFilteredUEntities] = useState<Entity[]>([])

  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const title = pathname.includes('add') ? 'Add Entity' : 'Entites';

  const btntitle = !pathname.includes('add') ? 'Add Entity' : 'Show Entities';

  const defaultColumns: ColumnDef<Entity>[] = [
    {
      header: 'Entity Details',
      columns: [
        // {
        //   accessorKey: 'id',
        //   header: 'ID',
        //   cell: info => <Link to={`/entities/entity/${info.getValue()}`}>{info.getValue()}</Link>,
        // },
        {
          accessorKey: 'name',
          header: 'Name',
          cell: info => info.getValue(),
        },
        // {
        //   accessorKey: 'address',
        //   header: 'Address',
        //   cell: info => info.getValue(),
        // },
        {
          accessorKey: 'country',
          header: 'Country',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'regId',
          header: 'Registration ID',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'ownerId',
          header: 'Owner ID',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'caId',
          header: 'CA ID',
          cell: info => info.getValue(),
        },
        // Additional fields can be added here as needed
      ],
    },
  ];

  const onClickNavigate = () => {
    if (pathname.includes('add')) {
      navigate("/entities"); // Change this to the correct "Show Users" path
    } else {
      navigate("/entities/add");
    }
  };

  // Memoize the handleSearch function to prevent it from changing on every render
  const handleSearch = useCallback((filteredUsers: Entity[]) => {
    const plainEnties = filteredUsers.map(entity => ({
      id: entity.id,
      name: entity.name,
      address: entity.address,
      country: entity.country,
      regId: entity.regId,
      ownerId: entity.ownerId,
      caId: entity.caId
    }));
    setFilteredUEntities(plainEnties);
  }, []);

  return (
    <div className={`entity`}>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-end row">
              <div className="col">
                <h6 className="header-pretitle">Overview</h6>
                <h1 className="header-title">{title === "Entites" ? <UseSearch searchKeys={['name', 'address', 'country']} data={entityStore?.data} onSearch={handleSearch}/> : title}</h1>
              </div>
              <div className="col-auto">
                <button onClick={onClickNavigate} type="button" className="lift btn btn-primary">{btntitle}</button></div>
            </div>
          </div>
        </div>
      </div> 
      <div className='container-fluid'>
      {
        !pathname.includes('add') && !pathname.includes('entity') ? 
        <Card>
          <Card.Header></Card.Header>
          <Card.Body>
            <NexGenTable columns={defaultColumns} data={filteredEntities} ></NexGenTable>
          </Card.Body>
        </Card>
        :
        null
      }
        <Outlet context={entityStore}/>
      </div>
    </div>
  );
};

export default observer(Entity);