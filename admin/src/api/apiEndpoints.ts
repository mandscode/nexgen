// src/apiEndpoints.ts
import axios from 'axios';
import { AddProjectForm } from '../components/AddProject/AddProject';
import { AddRoleForm } from '../components/AddRole/AddRole';
import { Investor, ProjectSettingsInterface } from '../components/Utilities/interface/interface';
import api from './api';
import { AssignAccountInterface } from '../components/AssignAccount/AssignAccount';
import { TransactionDetails } from '../components/AddTransactions/AddTransactions';
import { AddInvestorPersonalDetails } from '../components/AddInvestorPersonalDetails/AddInvestorPersonalDetails';
import { Academy } from '../components/Academy/Academy';
import { InvestorDocumentsForm } from '../components/UserDetail/UserDetail';
import { UpdateUserAccount } from '../components/UpdateUserAccountDetails/UpdateUserAccountDetails';
import staticCountries from "./static_countries.json"

import { S3Client, DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";



const region = import.meta.env.VITE_REACT_APP_AWS_REGION as string;
const bucketName = import.meta.env.VITE_REACT_APP_S3_BUCKET_NAME as string;
const accessKeyId = import.meta.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID as string;
const secretAccessKey = import.meta.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY as string;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});




// Example API call: Create a new user
export const createUser = async (userData: { firstName: string; lastName: string; email: string; roleIds: any[] }) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Example API call: Get a list of users
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUser = async (id:number) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};


// Example API call: Create a new Entity
export const createRole = async (roleData:AddRoleForm ) => {
  try {

    const formattedData = {
      ...roleData
    };

    const response = await api.post('/roles', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating roles:', error);
    throw error;
  }
};

export const deleteRole = async (id:number) => {
  try {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Create a new Entity
export const uploadInvestorDocs = async (docsData:InvestorDocumentsForm, id:number ) => {
  try {

    const formattedData = {
      ...docsData
    };

    const response = await api.put(`/investors/${id}/documents`, formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating roles:', error);
    throw error;
  }
};

// Example API call: Create a new Entity
export const updateInvestorDocument = async (docsData:InvestorDocumentsForm, id:number, docId:string ) => {
  try {

    const formattedData = {
      status:docsData
    };
    const response = await api.put(`/investors/${id}/documents/${docId}`, formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating roles:', error);
    throw error;
  }
};

// Example API call: Update a Account Details
export const uploadUserAccount = async (data:UpdateUserAccount ) => {
  try {

    const formattedData = {
      ...data
    };

    const response = await api.put(`/users`, formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating roles:', error);
    throw error;
  }
};

// Example API call: Create a new Entity
export const createAcademy = async (academyData:Academy ) => {
  try {

    const formattedData = {
      ...academyData
    };

    const response = await api.post('/contents', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating roles:', error);
    throw error;
  }
};


const deleteAcademyFolderFromS3 = async (academyName: string) => {
  try {
    const folderPath = `assets/media/images/academy/${academyName}/`;

    // 1️⃣ List all objects in the folder
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: folderPath,
    });

    const listedObjects = await s3.send(listCommand);

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      console.log(`No objects found in ${folderPath}`);
      return;
    }

    // 2️⃣ Delete all objects in the folder
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: {
        Objects: listedObjects.Contents.map((obj) => ({ Key: obj.Key! })),
      },
    });

    await s3.send(deleteCommand);
    console.log(`Deleted folder and contents: ${folderPath}`);
  } catch (error) {
    console.error("Error deleting folder from S3:", error);
  }
};

export const deleteAcademy = async (id:number) => {
  try {
    const academies = await getAcademies();

    const academy = await academies.find((ac:any) => ac.id == id)

    const academyName = await academy.title.replace(/\s+/g, '');;

    if (!academyName) {
      throw new Error("Academy name not found.");
    }

    // 2️⃣ Delete the academy folder from S3
    await deleteAcademyFolderFromS3(academyName);


    const response = await api.delete(`/contents/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Get a list of users
export const getRoles = async () => {
  try {
    const response = await api.get('/roles');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Get a list of users
export const getAcademies = async () => {
  try {
    const response = await api.get('/contents');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Update a user's roles
export const updateUserRoles = async (userId: number, roleData: { roles: number[] }) => {

  try {
    const response = await api.put(`/users/${userId}/roles`, roleData.roles);
    return response.data;
  } catch (error) {
    console.error(`Error updating roles for user with ID ${userId}:`, error);
    throw error;
  }
};


interface Entity {
  name: string;
  address?: string;
  country?: string;
  regId?: string;
  ownerId: number;
  caId: number;
}

// EAxample API call: Create a new Entity
export const createEntity = async (entityData:Entity ) => {
  try {

    const formattedData = {
      ...entityData,
      ownerId: entityData.ownerId.toString(),
      caId: entityData.caId.toString(),
    };

    const response = await api.post('/entities', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Example API call: Get a list of users
export const getEntities = async () => {
  try {
    const response = await api.get('/entities');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Get a list of users
export const getCountriesWithCurrencies = async () => {
  try {
    const response = await staticCountries;
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Get a list of users
export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getProject = async (id:number) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateProjectSettings = async (id:number, data:ProjectSettingsInterface) => {
  try {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Create a new Entity
export const createProject = async (projectData:AddProjectForm ) => {
  try {

    const formatDate = (dateString: string) => {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };



    const formattedData = {
      ...projectData,
      legalId: projectData.legalId.toString(),
      startDate:formatDate(projectData.startDate),
      actualMaturityDate:formatDate(projectData.actualMaturityDate),
    };

    const response = await api.post('/projects', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Example API call: assign Project to investors
export const assignProject = async (investorId: number,  projectId: number[] ) => {

  try {
    const response = await api.put(`/investors/${investorId}/projects/assign`, projectId);
    return response.data;
  } catch (error) {
    console.error(`Error updating roles for user with ID ${investorId}:`, error);
    throw error;
  }
};

// Example API call: Create a new Entity
export const createInvestors = async (investorsData:Investor) => {
  
  try {

    const formattedData = {
      ...investorsData,
      userId:Number(investorsData.userId)
    };
    
    const response = await api.post('/investors', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getInvestors = async () => {
  try {
    const response = await api.get('/investors');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getInvestor = async (id:number) => {
  try {
    const response = await api.get(`/investors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getCurrencyAll = async () => {
  try {
    const response = await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Create a new Entity
export const createAccounts = async (accountsData:AssignAccountInterface) => {
  
  try {

    const formattedData = {
      investorId: accountsData.investorId,
      currency: accountsData.currency  // Extracting only the labels
    };
    const response = await api.post('/accounts', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Example API call: Get a list of users
export const getAccounts = async () => {
  try {
    const response = await api.get('/accounts');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getAccount = async (id:number) => {
  try {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getAccountOfInvestor = async (id:number) => {
  try {
    const response = await api.get(`/accounts/investor/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const removeAccountOfInvestor = async (id:number) => {
  try {
    const response = await api.patch(`/accounts/${id}/remove-investor`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getMethods = [
  { "id": 1, "name": "Credit Card" },
  { "id": 2, "name": "Cash" }
]

export interface TransactionDTO {
  details?: TransactionDetails; // Details containing credit card information
  projectId: number;          // Project ID
  accountId: number;          // Account/><<<<<<<<, ID
  amount: number;             // Amount of the transaction
  credited: string;          // Indicates if the transaction is credited
  intrestRate: number;        // Interest rate for the transaction
}

// Example API call: Create a new Entity
export const createTransactions = async (accountsData:TransactionDTO) => {
  
  try {

    const formattedData = {
      ...accountsData,
      credited:accountsData.credited == "Debit" ? false : true
    };
    const response = await api.post('/transactions', formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Example API call: Get a list of users
export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Create a new user
export const updateNomineeDetails = async (nomineeData: { name: string; mobile: number; email: string; relation: string }, investorId:number) => {
  try {
    const response = await api.put(`/investors/${investorId}/nomineeDetails`, nomineeData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Example API call: Create a new user
export const updateEmergencyDetails = async (emergencyContactData: { name: string; mobile: number; relation: string }, investorId:number) => {
  try {
    const response = await api.put(`/investors/${investorId}/emergencyContact`, emergencyContactData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Example API call: Create a new user
export const updatePersonalDetails = async (personaltData: AddInvestorPersonalDetails, investorId:number) => {
  try {
    const response = await api.put(`/investors/${investorId}/personalDetails`, personaltData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Example API call: Create a new user
export const postImgs = async (imgs: { params:any }) => {
  try {
    const response = await api.get('/post-aws', imgs);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getImgs = async (imgs: { params:any }) => {
  try {
    const response = await api.get('/post-aws', imgs);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};