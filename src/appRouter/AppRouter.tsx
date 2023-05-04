import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../pages/mainPage/MainPage';
import FavoriteVacancyPage from '../pages/favoriteVacancyPage/FavoriteVacancyPage';
import CurrentVacancyPage from '../pages/currentVacancy/CurrentVacancyPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/favorite-vacancy" element={<FavoriteVacancyPage />} />
        <Route path="/vacancy/:id" element={<CurrentVacancyPage />} />
      </Route>
    </Routes>
  );
}
