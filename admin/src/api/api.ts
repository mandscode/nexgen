// src/api.ts
import axios from 'axios';

// Define the base URL of your API and other configurations
const api = axios.create({
  // baseURL: 'https://0198-2409-40e1-10f1-2d63-11ac-21be-2b33-ff11.ngrok-free.app/', // Replace with your actual API base URL
  // baseURL: 'http://13.233.146.212:3000', // Replace with your actual API base URL
  baseURL: 'http://localhost:3000', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
    // 'ngrok-skip-browser-warning':'true'
  },
  timeout: 10000, // Set a timeout (optional)
});

// Optionally, you can add interceptors to handle authentication or error logging
// api.interceptors.request.use(
//   (config) => {
//     // Add auth token here if needed
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global API errors here (e.g., token expiration, network issues)
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // You can add logic here to redirect the user to the login page
    }
    return Promise.reject(error);
  }
);

export default api;
