import apiClient from './apiClient';
import { USE_MOCK_API } from '../utils/constants';
import { mockResults } from '../utils/mockData';

export const submitExam = async (examId, studentId, answers) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // mock score calculation would be here if needed for demo
        const resultId = `r${Date.now()}`;
        const newResult = {
          id: resultId,
          examId,
          studentId,
          score: 50,
          totalMarks: 60,
          percentage: 83.3,
          correctAnswers: 25,
          incorrectAnswers: 5,
          unanswered: 0,
          status: 'PASSED',
          submittedAt: new Date().toISOString(),
          examTitle: 'Submitted Exam'
        };
        mockResults.push(newResult);
        resolve(newResult);
      }, 1000);
    });
  }
  const response = await apiClient.post(`/submissions`, { examId, studentId, answers });
  return response.data;
};
