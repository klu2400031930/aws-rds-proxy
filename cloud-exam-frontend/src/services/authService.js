import apiClient from './apiClient';
import { USE_MOCK_API } from '../utils/constants';
import { mockUsers } from '../utils/mockData';

export const loginUser = async (email, password, role) => {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (role === 'admin' || email.includes('admin')) {
          resolve({ user: mockUsers.admin, token: 'mock-jwt-token' });
        } else if (role === 'student' || email.includes('student')) {
          resolve({ user: mockUsers.student, token: 'mock-jwt-token' });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  }
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ user: { ...userData, id: 's2', role: 'student' }, token: 'mock-jwt-token' });
      }, 500);
    });
  }
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
