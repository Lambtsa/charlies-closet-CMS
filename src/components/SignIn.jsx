import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Login from '../views/Login';
import Loader from './Loader';

const SignIn = () => {
  const { authState } = useOktaAuth();

  if (authState.pending) {
    return <Loader />;
  }

  return authState.isAuthenticated
    ? <Redirect to={{ pathname: '/' }} />
    : <Login />;
};

export default SignIn;
