import { useContext } from "react";
import { Dropdown, DropdownMenu } from "react-bootstrap";
import { User } from "react-feather";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "./AppContext";
import Sidenav from "./components/Sidenav/Sidenav";

const Layout = ({isAuthenticated}: {isAuthenticated: boolean}) =>  {

  const {setAuthenticated} = useContext(AppContext)

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
            <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4" onClick={() => setAuthenticated(false)}>Logout</Dropdown.Item>
          </DropdownMenu>
        </Dropdown>
      </div>

    </div>
  </nav>
  <div className="container-fluid">
    {isAuthenticated ?  <Outlet/> : <Navigate to="/login"></Navigate>}
  </div>
</div>
</>
};

export default Layout;