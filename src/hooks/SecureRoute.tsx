import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';
import Loader from '../components/validation/Loader';

type SecureRouteProps = {
  component: any,
  path: string,
}

const SecureRoute = (props: SecureRouteProps) => {
  const { user, isLoading } = useContext(UserContext);
  const { component: Component, path } = props;

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return (
      <Route exact path={path} component={Component} />
    );
  }

  return <Redirect to="/login" />;
};

export default SecureRoute;
