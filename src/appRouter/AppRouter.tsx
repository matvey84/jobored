import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { lazy } from 'react';

const MainPage = lazy(() => import('../pages/mainPage/MainPage'));
const FavoriteVacancyPage = lazy(() => import('../pages/favoriteVacancyPage/FavoriteVacancyPage'));
const CurrentVacancyPage = lazy(() => import('../pages/currentVacancy/CurrentVacancyPage'));
const NotFoundPage = lazy(() => import('../pages/notFoundPage/NotFoundPage'));

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/favorite-vacancy" element={<FavoriteVacancyPage />} />
        <Route path="/vacancy/:id" element={<CurrentVacancyPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
