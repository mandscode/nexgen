// src/apiEndpoints.ts
import api from './api';

// Example API call: Create a new user
export const createUser = async ( token: any) => {
  try {
    const response = await api.post('/auth/google-login', {token});
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
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

export const getInvestor = async (id:number) => {
  try {
    const response = await api.get(`/investors/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getInvestors = async () => {
  try {
    const response = await api.get(`/investors`);
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

export const getProject = async (id:number) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Example API call: Create a new Entity
export const updateInvestorDocument = async (docsData:any, id:number, docId:string ) => {
  try {

    const formattedData = {
      status:docsData
    };
    const response = await api.put(`/investors/${id}/documents/${docId}`, formattedData);
    return response;
  } catch (error) {
    console.error('Error creating roles:', error);
    throw error;
  }
};

export const getAcademy = async (id:number) => {
  try {
    const response = await api.get(`/contents/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getAcademies = async () => {
  try {
    const response = await api.get('/contents');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};