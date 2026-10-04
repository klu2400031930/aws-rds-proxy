import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExamProvider } from './context/ExamContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import ExamDetailsPage from './pages/ExamDetailsPage';
import ExamPage from './pages/ExamPage';
import ResultPage from './pages/ResultPage';
import MyResultsPage from './pages/MyResultsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageExamsPage from './pages/ManageExamsPage';
import CreateExamPage from './pages/CreateExamPage';
import ManageQuestionsPage from './pages/ManageQuestionsPage';

const App = () => {
  return (
    <AuthProvider>
      <ExamProvider>
        <BrowserRouter>
          <div className="page-wrapper">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Student Routes */}
                <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                  <Route path="/student/dashboard" element={<StudentDashboardPage />} />
                  <Route path="/exams/:examId" element={<ExamDetailsPage />} />
                  <Route path="/exams/:examId/start" element={<ExamPage />} />
                  <Route path="/results" element={<MyResultsPage />} />
                  <Route path="/results/:resultId" element={<ResultPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
                
                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/exams" element={<ManageExamsPage />} />
                  <Route path="/admin/exams/create" element={<CreateExamPage />} />
                  <Route path="/admin/exams/:examId/questions" element={<ManageQuestionsPage />} />
                </Route>
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ExamProvider>
    </AuthProvider>
  );
};

export default App;
