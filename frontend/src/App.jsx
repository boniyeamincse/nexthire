import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage         from './pages/LandingPage';
import LoginPage           from './pages/LoginPage';
import RegisterPage        from './pages/RegisterPage';
import ForgotPasswordPage  from './pages/ForgotPasswordPage';
import TutorApplyPage      from './pages/TutorApplyPage';
import StudentProfilePage  from './pages/StudentProfilePage';
import SearchTutorsPage    from './pages/SearchTutorsPage';
import TutorProfilePage    from './pages/TutorProfilePage';
import CheckoutPage        from './pages/CheckoutPage';
import TutorDashboard      from './pages/TutorDashboard';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    if (user?.role === 'tutor') {
      return <Navigate to="/tutor/dashboard" replace />;
    }

    if (user?.role === 'student') {
      return <Navigate to="/student/profile" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                 element={<LandingPage />} />
          <Route path="/login"            element={<LoginPage />} />
          <Route path="/register"         element={<RegisterPage />} />
          <Route path="/forgot-password"  element={<ForgotPasswordPage />} />
          <Route path="/tutor-apply"      element={<TutorApplyPage />} />
          <Route path="/tutors"           element={<SearchTutorsPage />} />
          <Route path="/tutors/:id"       element={<TutorProfilePage />} />
          <Route path="/checkout/:slotId" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/student/profile" element={<RoleProtectedRoute allowedRoles={['student']}><StudentProfilePage /></RoleProtectedRoute>} />
          <Route path="/tutor/dashboard" element={<RoleProtectedRoute allowedRoles={['tutor']}><TutorDashboard /></RoleProtectedRoute>} />
          {/* Additional routes will be added here */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
