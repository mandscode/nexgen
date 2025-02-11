import { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { ProjectStore } from "./ProjectStore";
import  "./Project.scss";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowLeft } from 'react-feather';

// import exampleData from "../../json/example.json";
import { AllProjectsInterface } from '../Utilities/interface/interface';

// import { getEntities, getProjects } from "../../api/apiEndpoints";
import UseSearch from '../Utilities/Forms/useSearch';

export interface Project {
  id: number;
  entityID: number;
  name: any;
  address: string;
  latitude: number;
  longitude: number;
  startDate: string;
  actualMaturityDate: string;
  overallCost: number;
  description: string;
  ownerName: string;
  legalId: number;
  maturityLockingPeriod: number;
  resourceGroupId: number;
  entityName: string;
}

export interface ProjectProps {
 className?: string;
}

const Project = ({ }:ProjectProps) => {
  const [projectStore] = useState(() => new ProjectStore());
  const navigate = useNavigate();

  const [filteredProject, setFilteredProjects] = useState<AllProjectsInterface[]>([]);

  const { pathname } = useLocation();
  
  
  const title = pathname.includes('add') ? 'Add Project' : pathname.includes('project/') ? <Link to={'/projects'}><ArrowLeft/></Link> : 'Projects';

  const btntitle = pathname.includes('/projects/project/')
  ? 'Update Project Details'
  : !pathname.includes('add')
  ? 'Add Project'
  : 'Show Project';


  const defaultColumns: ColumnDef<AllProjectsInterface>[] = [
    {
      header: 'Project Details',
      columns: [
        {
          accessorKey: 'entityName',
          header: 'Entity Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'name',
          header: 'Project Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'countryName',
          header: 'Country Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'startDate',
          header: 'Start Date',
          cell: info => formatDate(info.getValue()),
        },
        {
          accessorKey: 'actualMaturityDate',
          header: 'Actual Maturity Date',
          cell: info => formatDate(info.getValue()),
        },
        {
          accessorKey: 'overallCost',
          header: 'Overall Cost',
          cell: info => formatAmount(info.getValue()),
        },
        {
          accessorKey: 'maturityLockingPeriod',
          header: 'Maturity Locking Period',
          cell: info => info.getValue(),
        }
      ],
    },
  ];
  
  const onClickNavigate = () => {
    if (pathname.includes('/projects/project/')) {
      navigate("/projects/project/details"); // Navigate to the project details page
    } else if (pathname.includes('add')) {
      navigate("/projects"); // Navigate to the main projects page
    } else {
      navigate("/projects/add"); // Navigate to the add project page
    }
  };
  

  // Memoize the handleSearch function to prevent it from changing on every render
  const handleSearch = useCallback((filteredProjects: Project[]) => {
    const plainEnties = filteredProjects.map(project => ({
      ...project,
      name:<Link to={`/projects/project/${project.id}`}>{project.name}</Link>
    }));
    setFilteredProjects(plainEnties);
  }, []);

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    }).format(date);
  };

  const formatAmount = (num:any) => {
    if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(1)}t`; // Trillion
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}b`; // Billion
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}m`; // Million
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`; // Thousand
    return num.toString(); // Less than 1,000
  };

  return (
    <div className={`project`}>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-end row">
              <div className="col">
                <h6 className="header-pretitle">Overview</h6>
                <h1 className="header-title">{title === "Projects" ? <UseSearch searchKeys={['name', 'address']} data={projectStore?.data} onSearch={handleSearch}/> : title}</h1>
              </div>
              <div className="col-auto">
                {
                  btntitle !== 'Update Project Details' ? (
                    <button onClick={onClickNavigate} type="button" className="lift btn btn-primary">
                      {btntitle}
                    </button>
                  ) : null
                }
              </div>
            </div>
          </div>
        </div> 
        <div className='container-fluid'>
          {
            !pathname.includes('add') && !pathname.includes('project/') ? 
            <Card>
              <Card.Header></Card.Header>
              <Card.Body>
                <NexGenTable columns={defaultColumns} data={filteredProject} ></NexGenTable>
              </Card.Body>
            </Card>
            :
            null
          }
          <Outlet context={projectStore}/>
        </div>
      </div>
    </div>
  );
};

export default observer(Project);