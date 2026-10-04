import React, { createContext, useContext, useState } from 'react';

const ExamContext = createContext(null);

export const ExamProvider = ({ children }) => {
  const [activeExam, setActiveExam] = useState(null);

  return (
    <ExamContext.Provider value={{ activeExam, setActiveExam }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExamContext = () => useContext(ExamContext);
