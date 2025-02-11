import { makeAutoObservable } from "mobx"
import { Activity, BookOpen, Box, Home, Shield, Trello, UserCheck, Users } from "react-feather";
import { NavigateFunction } from "react-router-dom";

export interface NavNode {
  label: string;
  id: string;
  icon?: React.ReactNode;
  children?: NavNode[];
  route?: string;
}

export class SidenavStore {

    nodes: NavNode [] = [
      {
        label: "Dashboards", 
        id: "dashboards", 
        icon: <Home width={15} height={15}/>, 
        children: [
          {label: "Dashboard", id:"dashboard", route:"/dashboard"}
        ]
      },
      {label: "Roles", id: "roles", route:"/roles", icon: <Shield width={15} height={15}/>},
      {label: "Users", id: "users", route:"/users", icon: <Users width={15} height={15}/>},
      {
        label: "Investors", 
        id: "investors-dashboard", 
        icon: <UserCheck width={15} height={15}/>, 
        children: [
          {label: "Basic", id: "investors", route:"/investors"},     
          // {label: "Personal Details", id: "personal-details", route:"/investors/personal-details"},     
          // {label: "Nominee Details", id: "nomineeDetails", route:"/investors/nominee-details"},     
          // {label: "Documents", id: "documents", route:"/investors/documents-details"},     
          // {label: "Emergency Contact", id: "emergencyContact", route:"/investors/emergency-contact-details"}     
        ]
      },
      {label: "Entities", id: "entities", route:"/entities", icon: <Box width={15} height={15}/>},     
      {label: "Projects", id: "projects", route:"/projects", icon: <Trello width={15} height={15}/>},    
      {label: "Transactions", id: "transactions", route:"/transactions", icon: <Activity width={15} height={15}/>},
      {label: "Academy", id: "academy", route:"/academy", icon: <BookOpen width={15} height={15}/>}  
    ]
    
    constructor() {
      makeAutoObservable(this);
    }

    findNodeByKey(eventKey: string, nodes: NavNode[]): string | null {
      let route = null;
      nodes.some(node => {
        if(node.id === eventKey) {
          route = node.route;
          return true;
        }
        if(node.children) {
          route = this.findNodeByKey(eventKey, node.children);
          if(route) {
            return true;
          }
        }
      });
      return route;
    }

    showPage(eventKey: string | null, navigate: NavigateFunction) {
      const route = this.findNodeByKey(eventKey || '', this.nodes);
      navigate(route || "");
    }
}