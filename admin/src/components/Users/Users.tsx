import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import NexGenTable from '../NexGenTable/NexGenTable';
import "./Users.scss";
import { User, UsersStore } from "./UsersStore";
import { ArrowLeft } from 'react-feather';
import UseSearch from '../Utilities/Forms/useSearch';
import OldPasswordChangeModal from '../Utilities/OldPasswordChangeModal';


export interface UsersProps {
  className?: string;
}

const Users = ({ }: UsersProps) => {
  const [usersStore] = useState(() => new UsersStore());
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [userId, setUserId] = useState("");
  
  const [showModalForOldPassword, setShowModalForOldPassword] = useState(false);
  

  const title = pathname.includes('add')
  ? 'Add Users'
  : pathname.includes('user-detail')
  ? <Link to={'/users'}><ArrowLeft /> Users</Link>
  : 'User';

  const btntitle = !pathname.includes('add') ? 'Add User Form ' : 'Show Users';

  const onClickNavigate = (role:string) => {
    if (pathname.includes('add')) {
      navigate("/users"); // Change this to the correct "Show Users" path
    } else {
      navigate(`/${role}/add`);
    }
  };

  // Memoize the handleSearch function to prevent it from changing on every render
  const handleSearch = useCallback((filteredUsers: User[]) => {
    const plainUsers = filteredUsers.map(user => ({
      firstName: user.firstName.trim(),  // Trim any whitespace
      lastName: user.lastName.trim(),    // Trim any whitespace
      email: user.email,
      roles: user.roles,
      details: user.details,
    }));
    setFilteredUsers(plainUsers);
  }, []);


  return (
    <>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-end row">
              <div className="col">
                <h6 className="header-pretitle">Search here</h6>
                <h1 className="header-title">{title === "User" ? <UseSearch searchKeys={['firstName', 'lastName', 'email']} data={usersStore?.data} onSearch={handleSearch}/> : title}</h1>
              </div>
              <div className="col-auto">
                <button onClick={() => {onClickNavigate("users")}} type="button" className="lift btn btn-primary">{btntitle}</button>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div className='container-fluid'>
      {
        !(pathname.includes('add') || pathname.includes('user-detail')) ? 
        <Card>
          <Card.Header>
            Users
          </Card.Header>
          <Card.Body>
            <NexGenTable 
              columns={usersStore.getColumns(setUserId, setShowModalForOldPassword)} 
              data={filteredUsers} ></NexGenTable>
          </Card.Body>
        </Card>
        :
        null
      }
        <Outlet context={usersStore}/>
      </div>
      <OldPasswordChangeModal show={showModalForOldPassword} onHide={() => setShowModalForOldPassword(false)} userId={userId} isFirstLogin={true}/>
    </>
  );
};

export default observer(Users);