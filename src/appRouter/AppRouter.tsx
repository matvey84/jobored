import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}
