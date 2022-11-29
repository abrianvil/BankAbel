import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/Splashpage';
import LandingPage from './components/landingPage';
import WalletComp from './components/wallet';
import TransactionComp from './components/transaction';
import AccountComp from './components/account';
import MoneyTransaction from './components/moneyTransaction';

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

        <ProtectedRoute path='/account' exact={true}>
          <AccountComp />
        </ProtectedRoute>

        <ProtectedRoute path='/transaction' exact={true}>
          <MoneyTransaction />
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
