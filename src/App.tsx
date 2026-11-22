import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuLayout from './features/menu/MenuLayout';
import MenuHomePage from './features/menu/pages/HomePage';
import DriftPage from './features/menu/pages/DriftPage';
import TimeAttackPage from './features/menu/pages/TimeAttackPage';
import ForzaPage from './features/menu/pages/ForzaPage';
import CrudLayout from './features/crud/CrudLayout';
import PostsListPage from './features/crud/PostsListPage';
import NewPostPage from './features/crud/NewPostPage';
import PostViewPage from './features/crud/PostViewPage';
import AuthLayout from './features/auth/AuthLayout';
import LandingPage from './features/auth/LandingPage';
import PrivateRoute from './features/auth/PrivateRoute';
import NewsPage from './features/auth/NewsPage';
import NewsItemPage from './features/auth/NewsItemPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/menu" element={<MenuLayout />}>
          <Route index element={<MenuHomePage />} />
          <Route path="drift" element={<DriftPage />} />
          <Route path="timeattack" element={<TimeAttackPage />} />
          <Route path="forza" element={<ForzaPage />} />
        </Route>

        <Route path="/crud" element={<CrudLayout />}>
          <Route index element={<PostsListPage />} />
          <Route path="posts/new" element={<NewPostPage />} />
          <Route path="posts/:postId" element={<PostViewPage />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LandingPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:id" element={<NewsItemPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
