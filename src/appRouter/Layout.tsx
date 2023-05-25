import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import { Suspense } from 'react';
import Loader from '../components/loader/Loader';

export default function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
