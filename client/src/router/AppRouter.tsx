import { HomePage } from '@/pages/home/HomePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { RegisterPage } from '@/pages/register/RegisterPage';
import { LoginPage } from '@/pages/login/LoginPage';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Ruta por defecto temporal */}
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};