import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/auth';

export const initAuth = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/init`);
    return response.data;
  } catch (error) {
    console.error('Init Auth Error:', error);
    throw error;
  }
};

export const login = async (username, password, stateId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password, stateId });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data;
  } catch (error) {
    console.error('Get User Info Error:', error);
    throw error;
  }
};

export const updateUserInfo = async (userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user`, userData);
    return response.data;
  } catch (error) {
    console.error('Update User Info Error:', error);
    throw error;
  }
};