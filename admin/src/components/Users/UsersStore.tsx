import { ColumnDef } from "@tanstack/react-table";
import { makeAutoObservable, runInAction  } from "mobx";
import { ArrowRight } from "react-feather";
import { Link } from "react-router-dom";
import { getRoles, getUsers } from "../../api/apiEndpoints";
import { Button } from "react-bootstrap";

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

  getColumns(setUserId: (id: string) => void, setShowModalForOldPassword: (show: boolean) => void) {
    return [
      {
        header: 'All Users',
        columns: [
          {
            accessorKey: 'firstName',
            cell: (info:any) => info.getValue(),
          },
          {
            accessorKey: 'lastName',
            cell: (info:any) => info.getValue(),
          },
          {
            accessorKey: 'email',
            cell: (info:any) => info.getValue(),
          },
          {
            accessorKey: 'roles',
            header: `Roles`,
            cell: (info:any) => info.getValue().join(' , '),
          },
          {
            accessorKey: 'details',
            cell: (info:any) => (
              <span style={{color:"blue", cursor:"pointer"}} onClick={() => {
                setUserId(info.getValue());  // Set the user ID from the row
                setShowModalForOldPassword(true); // Open the modal
              }}>
                Change Password
              </span>
            ),
          }
        ],
      }
    ];
  }
  

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

      runInAction(() => {
        this.data = users.map((user: any) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isMasterAdmin: user.isMasterAdmin, // ✅ Store isMasterAdmin in user data
          roles: user.roles.map((role: any) => {
            let roleName = role.name;
            // if (user.isMasterAdmin && roleName === "Admin") {
            //   roleName = "Master Admin"; // ✅ Replace "Admin" with "Master Admin" if user isMasterAdmin
            // }
            return roleName.toUpperCase();
          }),
          details: user.id
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