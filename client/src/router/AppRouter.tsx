import { HomePage } from '@/pages/home/HomePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { RegisterPage } from '@/pages/register/RegisterPage';
import { LoginPage } from '@/pages/login/LoginPage';
import { MessagesPage } from '@/pages/messages/MessagesPage';
import { FavoritesPage } from '@/pages/favorites/FavoritesPage';
import { SearchPage } from '@/pages/search/SearchPage';
import { AnnouncementDetail } from '@/pages/announcementDetail';
import { AuthProvider } from '@/contexts/AuthContext';


export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/listing/:id" element={<AnnouncementDetail />} />

            {/* Rutas Protegidas */}
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* Ruta por defecto temporal */}
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  );
};