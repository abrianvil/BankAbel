import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/Splashpage';
import LandingPage from './components/landingPage';
import LogoutButton from './components/auth/LogoutButton';
import WalletComp from './components/wallet';
import TransactionComp from './components/transaction';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/getstarted' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/dashboard' exact={true} >
          <LandingPage />
        </ProtectedRoute>
        <ProtectedRoute path='/wallet' exact={true}>
          <WalletComp />
        </ProtectedRoute>
        <ProtectedRoute path='/activity' exact={true}>
          <TransactionComp />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
