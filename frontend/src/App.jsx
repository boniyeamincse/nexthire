import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage         from './pages/LandingPage';
import LoginPage           from './pages/LoginPage';
import RegisterPage        from './pages/RegisterPage';
import ForgotPasswordPage  from './pages/ForgotPasswordPage';
import TutorApplyPage      from './pages/TutorApplyPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                 element={<LandingPage />} />
        <Route path="/login"            element={<LoginPage />} />
        <Route path="/register"         element={<RegisterPage />} />
        <Route path="/forgot-password"  element={<ForgotPasswordPage />} />
        <Route path="/tutor-apply"      element={<TutorApplyPage />} />
        {/* Additional routes will be added here */}
      </Routes>
    </BrowserRouter>
  );
}
