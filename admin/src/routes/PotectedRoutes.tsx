import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Layout from "../Layout";
import { AppStore } from "../AppStore";
import {AppContext} from "../AppContext";
import { useContext } from "react";
import Users from "../components/Users/Users";
import AddUser from "../components/AddUser/AddUser";
import Project from "../components/Project/Project";
import AddProject from "../components/AddProject/AddProject";
import Entity from "../components/Entity/Entity";
import AddEntity from "../components/AddEntity/AddEntity";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
import Investor from "../components/Investor/Investor";
import UserDetail from "../components/UserDetail/UserDetail";
import EntityDetail from "../components/EntityDetail/EntityDetail";
import ProjectDetail from "../components/ProjectDetail/ProjectDetail";
import Roles from "../components/Roles/Roles";
import AddRole from "../components/AddRole/AddRole";
import AssignProject from "../components/AssignProject/AssignProject";
import AssignAccount from "../components/AssignAccount/AssignAccount";
import AddTransactions from "../components/AddTransactions/AddTransactions";
import Accounts from "../components/Accounts/Accounts";
import UpdateProject from "../components/UpdateProject/UpdateProject";
import Academy from "../components/Academy/Academy";
import AddAcademy from "../components/AddAcademy/AddAcademy";

const ProtectedRoutes = () => 
{

const { isAuthenticated } = useContext<AppStore>(AppContext);

return <Routes>
    <Route element={<Layout isAuthenticated={!!isAuthenticated}/>}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/roles" element={<Roles />}>
            <Route path="add" element={<AddRole />} />
        </Route>
        <Route path="/transactions" element={<TransactionHistory />}>
            <Route path="add" element={<AddTransactions transactionList={undefined} />} />
        </Route>
        <Route path="/projects" element={<Project />}>
            <Route path="add" element={<AddProject />} />
            <Route path="project/:id" element={<ProjectDetail />} />
        </Route>
        <Route path="/users" element={<Users />}>
            <Route path="add" element={<AddUser />} />
        </Route>
        <Route path="/entities" element={<Entity />}>
            <Route path="add" element={<AddEntity />} />
            <Route path="entity/:id" element={<EntityDetail/>}/>
        </Route>
        <Route path="/investors" element={<Investor />}>
            <Route path="add" element={<AssignProject />} />
            <Route path="assign/account/:id" element={<AssignAccount />} />
            <Route path="accounts" element={<Accounts setShowAccounts={undefined} showAccounts={undefined} />} />
            <Route path="investor-detail/:id" element={<UserDetail/>}/>
        </Route>
        <Route path="/academy" element={<Academy/>}>
            <Route path="add" element={<AddAcademy/>}/>
        </Route>
    </Route>
</Routes>

}

export default ProtectedRoutes;