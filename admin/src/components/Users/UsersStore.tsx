import { ColumnDef } from "@tanstack/react-table";
import { makeAutoObservable, runInAction  } from "mobx";
import { ArrowRight } from "react-feather";
import { Link } from "react-router-dom";
import { getRoles, getUsers } from "../../api/apiEndpoints";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  roles: {name: string, id: number}[];
  details:string;
}

export class UsersStore {
  data: User[] = []; // Initialize as empty array
  roles: {name: string, id: number}[] = [];

  defaultColumns: ColumnDef<User>[] = [
    {
      header: 'All Users',
      columns: [
        {
          accessorKey: 'firstName',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'lastName',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'email',
          cell: info => info.getValue(),
        },
        {
          accessorKey: 'roles',
          header:`Roles`,
          cell: info => info.getValue().join(' , '),
        },
        // {
        //   accessorKey: 'details',
        //   cell: info => <Link to={info.getValue()}><ArrowRight/></Link>
        // }
      ],
    },
  ];

  // data = [{ firstName: "test", lastName: "test", email: "test@email.com", roles: ['role1', 'role2'] }];
  // data: User[] = exampleData.Users.map((user: any) => ({
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   email: user.email,
  //   roles: user.role, // Assuming roles is a single string in the JSON
  //   details: `/users/user-detail/${user.id}`
  // }));
    
  constructor() {
    makeAutoObservable(this);
    this.fetchUsers(); // Fetch users when the store is initialized
    this.fetchRoles();
  }

  // Fetch users from the API
  async fetchUsers() {
    try {
      const users = await getUsers();
      
      // Use runInAction to modify observable data inside async functions
      runInAction(() => {
        this.data = users.map((user: any) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: user.roles.map((role: any) => role.name.toUpperCase()), // Assuming roles is a single string, adjust if necessary
          details: `/users/user-detail/${user.id}`
        }));
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }

  *fetchRoles() {
    try {
      this.roles = yield getRoles();
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }
}