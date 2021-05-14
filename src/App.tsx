import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SecureRoute from './hooks/SecureRoute';
import './main.scss';
import { UserProvider } from './hooks/UserContext';

/*
  Views
*/
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import NotFound from './views/NotFound';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <SecureRoute path="/dashboard" component={Dashboard} />
            <Route path="/" component={NotFound} />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
