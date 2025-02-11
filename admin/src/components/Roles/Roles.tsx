import { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Role, RolesStore } from "./RolesStore";
import  "./Roles.scss";
import UseSearch from '../Utilities/Forms/useSearch';
import { Button, Card } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'react-feather';
import { ColumnDef } from '@tanstack/react-table';
import { deleteRole } from '../../api/apiEndpoints';

export interface RolesProps {
 className?: string;
}

const Roles = ({ }:RolesProps) => {
  const [rolesStore] = useState(() => new RolesStore());

  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const title = pathname.includes('add')
  ? 'Add Roles'
  : pathname.includes('role-detail')
  ? <Link to={'/roles'}><ArrowLeft /> Roles</Link>
  : 'Roles';

  const btntitle = !pathname.includes('add') ? 'Add Role Form ' : 'Show Roles';

  const onClickNavigate = () => {
    if (pathname.includes('add')) {
      navigate("/roles"); // Change this to the correct "Show Roles" path
    } else {
      navigate("/roles/add");
    }
  };

  const handleClick = async (id:number) => {
    try {
      await deleteRole(id);
      await rolesStore.fetchRoles();; // console result Content deleted successfully
    } catch (error) {
      console.log(error)
    }
  }

  const defaultColumns: ColumnDef<Role>[] = [
    {
        header: 'All Roles',
        columns: [
            {
              accessorKey: 'name',
              header: 'Role Name',
              cell: info => info.getValue(),
            },
            // {
            //   accessorKey: 'id',
            //   header: 'Delete Role',
            //   cell: info => <Button variant="link" onClick={() => {handleClick(info.getValue())}}><X/></Button>
            // }
        ],
    },
  ];

  // Memoize the handleSearch function to prevent it from changing on every render
  const handleSearch = useCallback((filteredRoles: Role[]) => {
    const plainRoles = filteredRoles.map(role => ({
      id:role.id,
      name: role.name.trim(),  // Trim any whitespace
    }));
    setFilteredRoles(plainRoles);
  }, []);

  return (
    <>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-end row">
              <div className="col">
                <h6 className="header-pretitle">Search here</h6>
                <h1 className="header-title">
                  {
                    title === "Roles" ? 
                    <UseSearch data={rolesStore?.data} searchKeys={['name', 'id']} onSearch={handleSearch}/> : 
                    title
                  }
                </h1>
              </div>
              <div className="col-auto">
                <button onClick={onClickNavigate} type="button" className="lift btn btn-primary">{btntitle}</button></div>
            </div>
          </div>
        </div>
      </div> 
      <div className='container-fluid'>
      {
        !(pathname.includes('add') || pathname.includes('role-detail')) ? 
        <Card>
          <Card.Header>
            Roles
          </Card.Header>
          <Card.Body>
            <NexGenTable columns={defaultColumns} data={filteredRoles} ></NexGenTable>
          </Card.Body>
        </Card>
        :
        null
      }
        <Outlet context={rolesStore}/>
      </div>
    </>
  );
};

export default observer(Roles);