import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import "./Sidenav.scss";
import SidenavDropdown from './SidenavDropdown';
import { SidenavStore } from "./SidenavStore";
import { useNavigate } from 'react-router-dom';

export interface SidebarProps {
 className?: string;
}

const Sidenav = ({ }:SidebarProps) => {
  const [sidebarStore] = useState(() => new SidenavStore());
  const navigator = useNavigate();

  return (
    <Nav activeKey={"dashboard1"} className="flex-column navbar-nav" onSelect={(eventKey) => sidebarStore.showPage(eventKey, navigator)}>
      {
        sidebarStore.nodes.map(node =>
          <>
            {node.children ?
              <SidenavDropdown title={node.label} icon={node.icon}>
                {node.children.map(child => <Nav.Item>
                  <Nav.Link eventKey={child.id}>{child.label}</Nav.Link>
                </Nav.Item>)}
              </SidenavDropdown> :
              <Nav.Item>
                <Nav.Link eventKey={node.id}>
                  <span className="me-3 mb-1">{node.icon}</span>
                  {node.label}</Nav.Link>
              </Nav.Item>
            }
          </>
        )
      }
    </Nav>
  );
};

export default observer(Sidenav);