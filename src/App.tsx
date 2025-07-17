import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css'
import LoginPage from './pages/LoginPage'
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import RecoverPage from './pages/RecoverPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path="/recover"
          element={
            <PublicRoute>
              <RecoverPage />
            </PublicRoute>
          }
        />
        <Route path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
