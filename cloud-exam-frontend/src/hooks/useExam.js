import { useState, useEffect } from 'react';
import { getExams, getExamById, getQuestionsByExamId } from '../services/examService';

export const useExam = (examId = null) => {
  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (examId) {
      loadExamDetails(examId);
    } else {
      loadExams();
    }
  }, [examId]);

  const loadExams = async () => {
    try {
      setLoading(true);
      const data = await getExams();
      setExams(data);
    } catch (err) {
      setError(err.message || 'Failed to load exams');
    } finally {
      setLoading(false);
    }
  };

  const loadExamDetails = async (id) => {
    try {
      setLoading(true);
      const examData = await getExamById(id);
      setExam(examData);
      const qs = await getQuestionsByExamId(id);
      setQuestions(qs);
    } catch (err) {
      setError(err.message || 'Failed to load exam details');
    } finally {
      setLoading(false);
    }
  };

  return { exams, exam, questions, loading, error, reload: loadExams };
};
