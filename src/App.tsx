import React, { Fragment, useEffect } from 'react';
import './App.css';
import AppRouter from './appRouter/AppRouter';
import { useAppDispatch } from './redux/hooks';
import { USER } from './endpoints/mocUser';
import { fetchLogin } from './redux/user-slice/userFetchRequest';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLogin(USER));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <AppRouter />
    </Fragment>
  );
}

export default App;
