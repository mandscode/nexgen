// src/apiEndpoints.ts
import api from './api';

export const getUserDetails = async (id: number, token: string) => {
  try {
    const response = await api.get(`/users/details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Handle specific error messages from the backend
      if (error.response.data.message === 'Unauthorized: Invalid token' || error.response.data.message === 'TokenExpired: Please log in again') {
          throw new Error(error.response.data.message); // Propagate the error message
      } else if(error.response.data.message) {

        throw new Error(error.response.data.message);
      }
      else {
          throw new Error('Error fetching user details');
      }
  } else {
      throw new Error('Network error: Unable to fetch user details');
  }
}
};


export const getProfileDetails = async (id:number) => {
  try {
    const response = await api.get(`/profile/details/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getEntityRelatedProjects = async (id:number) => {
  try {
    const response = await api.get(`/projects/entities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

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

export const getCurrencyAll = async () => {
  try {
    const response = await api.get('/currencies');
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

export const getProjects = async (config = {}) => {
  try {
    const response = await api.get('/projects', config); // Pass config (headers)
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
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