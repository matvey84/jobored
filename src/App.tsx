import React, { Fragment, useEffect } from 'react';
import './App.css';
import AppRouter from './appRouter/AppRouter';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { USER } from './endpoints/mocUser';
import { fetchLogin } from './redux/user-slice/userFetchRequest';

function App() {
  const dispatch = useAppDispatch();
  const ttl = useAppSelector((state) => state.userSlice.ttl);
  useEffect(() => {
    ttl * 1000 < Date.now() && dispatch(fetchLogin(USER));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <AppRouter />
    </Fragment>
  );
}

export default App;
