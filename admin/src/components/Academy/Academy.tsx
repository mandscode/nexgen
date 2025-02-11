import { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { AcademyStore } from "./AcademyStore";
import  "./Academy.scss";
import { Button, Card } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import UseSearch from '../Utilities/Forms/useSearch';
import { X } from 'react-feather';
import { deleteAcademy } from '../../api/apiEndpoints';

export interface AcademyProps {
 className?: string;
}

export interface Academy {
  id?: number;
  title: string;
  imageUrl?: string;
  description: string;
}


const Academy = ({ className="" }:AcademyProps) => {
  const [academyStore] = useState(() => new AcademyStore());

  const [academy, setAcademy] = useState<Academy[]>([]);
  const [filteredData, setFilteredData] = useState<Academy[]>([]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const title = 'Academy List';
  const btntitle = !pathname.includes('add') ? 'Add Academy Form ' : 'Show Academy';

  const handleClick = async (id:number) => {
    try {
      await deleteAcademy(id);
      await academyStore.fetchAcademies();; // console result Content deleted successfully
    } catch (error) {
      console.log(error)
    }
  }

  const defaultColumns: ColumnDef<Academy>[] = [
    {
      header: 'Academies',
      columns: [
        {
          accessorKey: 'title',
          header: 'Title',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'description',
          header: 'Description',
          cell: info => {
            const value = info.getValue();
            const words = value.split(' ');
            return words.length > 20 ? words.slice(0, 10).join(' ') + '...' : value;
          },
        },
        {
          accessorKey: 'id',
          header: 'Delete Academy',
          cell: info => <Button variant="link" onClick={() => {handleClick(info.getValue())}}><X/></Button>
        },
      ],
    },
  ];

  const onClickNavigate = () => {
    if (pathname.includes('add')) {
      navigate("/academy"); // Change this to the correct "Show Roles" path
    } else {
      navigate("/academy/add");
    }
  };

  // Memoize the handleSearch function to prevent it from changing on every render
  const handleSearch = useCallback((filteredData: Academy[]) => {
    const plainData = filteredData.map(data => ({
      id:data.id,
      title: data.title.trim(),  // Trim any whitespace
      description: data.description.trim(),  // Trim any whitespace
    }));
    setFilteredData(plainData);
  }, []);


  return (
    <div className={`academy`}>
      <div className="header">
        <div className="container-fluid">
          <div className="header-body">
            <div className="row align-items-end row">
              <div className="col">
                <h6 className="header-pretitle">Search here</h6>
                <h1 className="header-title">
                  {
                    title === "Academy List" ? 
                    <UseSearch data={academyStore?.data} searchKeys={['title', 'description']} onSearch={handleSearch}/> : 
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
          !pathname.includes('add') ?
            <Card>
              <Card.Header></Card.Header>
              <Card.Body>
                <NexGenTable columns={defaultColumns} data={filteredData} ></NexGenTable>
              </Card.Body>
            </Card>
            :
            null
        }
        <Outlet context={academyStore} />
      </div>
    </div>
  );
};

export default observer(Academy);