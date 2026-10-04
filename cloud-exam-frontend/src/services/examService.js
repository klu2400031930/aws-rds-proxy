import apiClient from './apiClient';
import { USE_MOCK_API } from '../utils/constants';
import { mockExams, mockQuestions } from '../utils/mockData';

export const getExams = async () => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => setTimeout(() => resolve(mockExams), 500));
  }
  const response = await apiClient.get('/exams');
  return response.data;
};

export const getExamById = async (id) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      const exam = mockExams.find(e => e.id === id);
      setTimeout(() => resolve(exam), 300);
    });
  }
  const response = await apiClient.get(`/exams/${id}`);
  return response.data;
};

export const createExam = async (examData) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      const newExam = { ...examData, id: `e${Date.now()}`, status: 'AVAILABLE' };
      mockExams.push(newExam);
      setTimeout(() => resolve(newExam), 500);
    });
  }
  const response = await apiClient.post('/exams', examData);
  return response.data;
};

export const getQuestionsByExamId = async (examId) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockQuestions[examId] || []), 500);
    });
  }
  const response = await apiClient.get(`/exams/${examId}/questions`);
  return response.data;
};

export const addQuestion = async (examId, questionData) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      if (!mockQuestions[examId]) mockQuestions[examId] = [];
      const newQ = { ...questionData, id: `q${Date.now()}`, examId };
      mockQuestions[examId].push(newQ);
      setTimeout(() => resolve(newQ), 500);
    });
  }
  const response = await apiClient.post(`/exams/${examId}/questions`, questionData);
  return response.data;
};
