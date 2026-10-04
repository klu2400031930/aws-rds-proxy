import { EXAM_STATUS, RESULT_STATUS } from './constants';

export const mockExams = [
  {
    id: 'e1',
    title: 'Java Programming',
    description: 'Comprehensive test on Core Java, OOPs, and Collections framework. Suitable for B.Tech CSE students.',
    duration: 60,
    totalMarks: 60,
    questionCount: 30,
    status: EXAM_STATUS.AVAILABLE
  },
  {
    id: 'e2',
    title: 'Cloud Computing',
    description: 'Test your knowledge on AWS, Azure, Serverless architectures and basic cloud concepts.',
    duration: 45,
    totalMarks: 50,
    questionCount: 25,
    status: EXAM_STATUS.AVAILABLE
  },
  {
    id: 'e3',
    title: 'Cyber Security Fundamentals',
    description: 'Basic principles of cryptography, network security, and ethical hacking.',
    duration: 60,
    totalMarks: 60,
    questionCount: 30,
    status: EXAM_STATUS.AVAILABLE
  }
];

export const mockQuestions = {
  'e1': [
    {
      id: 'q1',
      examId: 'e1',
      questionText: 'Which keyword is used to inherit a class?',
      optionA: 'extends',
      optionB: 'implements',
      optionC: 'inherits',
      optionD: 'super',
      correctAnswer: 'A',
      marks: 2
    },
    {
      id: 'q2',
      examId: 'e1',
      questionText: 'Which of these cannot be used for a variable name in Java?',
      optionA: 'identifier & keyword',
      optionB: 'identifier',
      optionC: 'keyword',
      optionD: 'none of the mentioned',
      correctAnswer: 'C',
      marks: 2
    },
    {
      id: 'q3',
      examId: 'e1',
      questionText: 'What is the default value of a local variable?',
      optionA: 'null',
      optionB: '0',
      optionC: 'Depends on the data type',
      optionD: 'Not assigned',
      correctAnswer: 'D',
      marks: 2
    }
  ],
  'e2': [
    {
      id: 'q1_e2',
      examId: 'e2',
      questionText: 'Which AWS service is used for Serverless computing?',
      optionA: 'EC2',
      optionB: 'Lambda',
      optionC: 'RDS',
      optionD: 'S3',
      correctAnswer: 'B',
      marks: 2
    }
  ],
  'e3': [
    {
      id: 'q1_e3',
      examId: 'e3',
      questionText: 'What does CIA stand for in security?',
      optionA: 'Confidentiality, Integrity, Availability',
      optionB: 'Central Intelligence Agency',
      optionC: 'Control, Integrity, Access',
      optionD: 'Confidentiality, Identity, Authorization',
      correctAnswer: 'A',
      marks: 2
    }
  ]
};

export const mockResults = [
  {
    id: 'r1',
    examId: 'e1',
    studentId: 's1',
    examTitle: 'Java Programming',
    score: 48,
    totalMarks: 60,
    percentage: 80,
    correctAnswers: 24,
    incorrectAnswers: 6,
    unanswered: 0,
    status: RESULT_STATUS.PASSED,
    submittedAt: new Date().toISOString()
  }
];

export const mockUsers = {
  student: {
    id: 's1',
    name: 'Student Name',
    email: 'student@example.com',
    role: 'student',
    studentId: 'STU12345'
  },
  admin: {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin'
  }
};
