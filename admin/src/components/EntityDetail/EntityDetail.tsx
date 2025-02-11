import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
// import { EntityDetailStore } from "./EntityDetailStore";
import  "./EntityDetail.scss";
import { Link, useParams } from 'react-router-dom';

import exampleData from '../../json/example.json';
import { EntityBasicDetailInterface, EntityInterface, EntityInvestorListInterface, ProjectBasicDetailInterface } from '../Utilities/interface/interface';
// import Project from '../Project/Project';
import { Card, Tab, Tabs } from 'react-bootstrap';
import NexGenTable from '../NexGenTable/NexGenTable';
import { ColumnDef } from '@tanstack/react-table';

export interface EntityDetailProps {
 className?: string;
}

const EntityDetail = ({ }:EntityDetailProps) => {
  // const [entityDetailStore] = useState(() => new EntityDetailStore());
  const { id } = useParams();

  const [entityData, setEntityData] = useState<EntityInterface>({
    id: 0,
    name: "",
    address: "",
    country: "",
    regId: "",
    ownerId: 0,
    caId: 0,
    projects: []
  });

  // const [entityProjectsList, setEntityProjectsList] = useState<ProjectBasicDetailInterface>({
  //   id: 0,
  //   name: "",
  //   address: "",
  //   startDate:"20-10-2020",
  //   actualMaturityDate:"20-10-2020",
  //   overallCost:0
  // });

  const [entityInvestorList, setEntityInvestorList] = useState<EntityInvestorListInterface[]>([{
    id: 0,
    investorId: 0,
    firstName: "",
    lastName:"",
    emailId:""
  }]);
  
  useEffect(() => {
    if(exampleData.Entities.length > 0) {
      let entities = exampleData.Entities;

      const entitiesData = entities.find((ent) => ent.id == Number(id))

      if (entitiesData) {
        // setEntityData(entitiesData);
      } else {
        setEntityData({
          id: 0,
          name: "",
          address: "",
          country: "",
          regId: "",
          ownerId: 0,
          caId: 0,
          projects: []
        });
      }
    }
  }, [exampleData])

  const removeDuplicates = (investorsList: any[]) => {
    const uniqueInvestors = investorsList.filter((investor, index, self) => {
      // Check if the current investor's id is unique in the array
      return index === self.findIndex((i) => i?.investorId === investor?.investorId);
    });
  
    return uniqueInvestors;
  };

  useEffect(() => {
    if(entityData.projects.length > 0) {
      const InvestorsList = entityData.projects.flatMap((project) => {
          return project.investors.map(() => {
            // let investorProfile = exampleData.Users.find(user => user.investorProfile?.id == investor.investorId)
            
            // if(investorProfile) {
            //   return {
            //     id: <Link to={`/users/user-detail/${investorProfile.id}`}>{Number(investorProfile.id)}</Link>,
            //     investorId: investorProfile?.investorProfile?.id,
            //     firstName: investorProfile.firstName,
            //     lastName:investorProfile.lastName,
            //     emailId:investorProfile.email
            //   };
            // }
          })
      })

      const uniqueInvestorsList = removeDuplicates(InvestorsList);
      setEntityInvestorList(uniqueInvestorsList);

    }
  }, [entityData, exampleData.Users])

  const entityBasicDetailColumns: ColumnDef<EntityBasicDetailInterface>[] = [
    {
      header: 'Entity Details',
      columns: [
        {
          accessorKey: 'id',
          header: 'ID',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'name',
          header: 'Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'address',
          header: 'Address',
          cell: info => info.getValue(),
        },
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

  const entityProjectDetailColumns: ColumnDef<ProjectBasicDetailInterface>[] = [
    {
      header: 'Entity Details',
      columns: [
        {
          accessorKey: 'id',
          header: 'ID',
          cell: info => <Link to={`/projects/project/${info.getValue()}`}> {info.getValue()}</Link>,
        },
        {
          accessorKey: 'name',
          header: 'Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'address',
          header: 'Address',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'startDate',
          header: 'Start Date',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'actualMaturityDate',
          header: 'Actual Maturity Date',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'overallCost',
          header: 'Overall Cost',
          cell: info => info.getValue(),
        }
        // Additional fields can be added here as needed
      ],
    },
  ];

  const entityInvestorsColumns: ColumnDef<EntityInvestorListInterface>[] = [
    {
      header: 'Entity Details',
      columns: [
        {
          accessorKey: 'id',
          header: 'ID',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'investorId',
          header: 'Investor Profile Id',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'firstName',
          header: 'First Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'emailId',
          header: 'Email Id',
          cell: info => info.getValue(),
        }
        // Additional fields can be added here as needed
      ],
    },
  ];

  return (
    <div className={`entityDetail`}>
      <Tabs
        defaultActiveKey="basicDetails"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="basicDetails" title="Basic Details">
          {
            entityData ? 
            <Card>
              <Card.Header>Basic Details of {entityData.name}</Card.Header>
              <Card.Body>
                  <NexGenTable columns={entityBasicDetailColumns} data={[entityData]} />
              </Card.Body>
            </Card>
            :
            null
          }
        </Tab>
        <Tab eventKey="entityProjectsDetails" title="Projects Details">
          {
            entityData ? 
            <Card>
              <Card.Header>Projects related to {entityData.name}</Card.Header>
              <Card.Body>
                  <NexGenTable columns={entityProjectDetailColumns} data={entityData.projects} />
              </Card.Body>
            </Card>
            :
            null
          }
        </Tab>
        <Tab eventKey="entityInvestorsDetails" title="Entity Investors">
          {
            entityData ? 
            <Card>
              <Card.Header>Investors related to {entityData.name}</Card.Header>
              <Card.Body>
                  <NexGenTable columns={entityInvestorsColumns} data={entityInvestorList} />
              </Card.Body>
            </Card>
            :
            null
          }
        </Tab>
      </Tabs>
    </div>
  );
};

export default observer(EntityDetail);