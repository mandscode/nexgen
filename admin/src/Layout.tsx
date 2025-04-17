import { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownMenu } from "react-bootstrap";
import { User } from "react-feather";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "./AppContext";
import Sidenav from "./components/Sidenav/Sidenav";
import OldPasswordChangeModal from "./components/Utilities/OldPasswordChangeModal";

const Layout = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const appContext = useContext(AppContext);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem('userIds');
    setUserId(id || "");
  }, [])

    const [showModalForOldPassword, setShowModalForOldPassword] = useState(false);

  if (!appContext || appContext.isLoading) {
      return <p>Loading...</p>; // Handle case where context is not ready or still loading
  }

  const { setAuthenticated } = appContext;

  const logout = () => {
    localStorage.clear();
    setAuthenticated(false);
  }
 
return <>
<div data-bs-theme="">
  <nav className="navbar navbar-vertical fixed-start navbar-expand-md" id="sidebar">
    <div className="container-fluid">

      <a className="navbar-brand" href="./index.html">
        <img src="/images/logo.webp" className="navbar-brand-img mx-auto" alt="..." />
      </a>

      <div className="collapse navbar-collapse" id="sidebarCollapse">

        <Sidenav/>

        <div className="mt-auto"></div>

      </div>

    </div>
  </nav>
</div>
<div className="main-content">
  <nav className="navbar navbar-expand-md navbar-light d-none d-md-flex" id="topbar">
    <div className="container-fluid">


      <div className="navbar-user ms-auto">
        <Dropdown
          className="navbar-user-link"
        >
        <Dropdown.Toggle variant="link" className="avatar avatar-sm">
          
            <User className="rounded-circle p-1" style={{background: '#dbe0e6'}} />
          
        </Dropdown.Toggle>
          <DropdownMenu>
            <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => setShowModalForOldPassword(true)} eventKey="2">Change Password</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4" onClick={() => logout()}>Logout</Dropdown.Item>
          </DropdownMenu>
        </Dropdown>
      </div>

    </div>
  </nav>
  <div className="container-fluid">
    {isAuthenticated ?  <Outlet/> : <Navigate to="/login"></Navigate>}
  </div>
  <OldPasswordChangeModal show={showModalForOldPassword} onHide={() => setShowModalForOldPassword(false)} userId={userId}/>
</div>
</>
};

export default Layout;