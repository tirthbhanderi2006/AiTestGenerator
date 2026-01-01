import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/AITestGenerator/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      console.log(response.data);
       return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  }
};
