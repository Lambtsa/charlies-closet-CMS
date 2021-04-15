import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Login from '../views/Login';

const SignIn = () => {
  const { authState } = useOktaAuth();

  if (authState.pending) {
    return <p>Loading...</p>;
  }

  return authState.isAuthenticated
    ? <Redirect to={{ pathname: '/' }} />
    : <Login />;
};

export default SignIn;
