import React, { useState } from "react";
import { Collapse, Nav } from "react-bootstrap";
import { ChevronDown } from "react-feather";

const SidenavDropdown = ({title, icon, children}: {title: string, icon: React.ReactNode, children: React.ReactNode}) => {
    const [open, setOpen] = useState(false);
    return (
        
        <Nav.Item>
            <Nav.Link onClick={() => setOpen(!open)}>
             <span className="me-3 mb-1">{icon}</span>   
                {title}
             <ChevronDown width={15} height={15} className={`ms-auto nav-chevron ${open ? 'active' : ''}`}/>   
            </Nav.Link>
            <Collapse in={open}>
            <div>
                <Nav className="nav-sm flex-column">
                    {children} 
                </Nav> 
            </div>
            </Collapse>
        </Nav.Item>
        
      
    )
  }
  export default SidenavDropdown