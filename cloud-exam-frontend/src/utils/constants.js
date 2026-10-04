export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin'
};

export const EXAM_STATUS = {
  AVAILABLE: 'AVAILABLE',
  COMPLETED: 'COMPLETED',
  UPCOMING: 'UPCOMING'
};

export const RESULT_STATUS = {
  PASSED: 'PASSED',
  FAILED: 'FAILED'
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.cloudexam.dev';
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';
