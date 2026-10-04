import apiClient from './apiClient';
import { USE_MOCK_API } from '../utils/constants';
import { mockResults } from '../utils/mockData';

export const getResult = async (resultId) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      const res = mockResults.find(r => r.id === resultId);
      setTimeout(() => resolve(res), 500);
    });
  }
  const response = await apiClient.get(`/results/${resultId}`);
  return response.data;
};

export const getStudentResults = async (studentId) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      const res = mockResults.filter(r => r.studentId === studentId);
      setTimeout(() => resolve(res), 500);
    });
  }
  const response = await apiClient.get(`/results/student/${studentId}`);
  return response.data;
};
