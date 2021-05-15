import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import SecureRoute from './hooks/SecureRoute';
import './main.scss';
import { UserProvider } from './hooks/UserContext';

/*
  Views
*/
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Items from './views/Items';
import Boxes from './views/Boxes';
import Users from './views/Users';
import UserDetails from './views/UserDetails';
import ItemDetails from './views/ItemDetails';
import BoxDetails from './views/BoxDetails';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Switch>
            <Route exact path="/">
              <Redirect to="/admin/dashboard" />
            </Route>
            <Route exact path="/login" component={Login} />
            <SecureRoute path="/admin/dashboard" component={Dashboard} />
            <SecureRoute path="/admin/users/:id" component={UserDetails} />
            <SecureRoute path="/admin/users" component={Users} />
            <SecureRoute path="/admin/items/:id" component={ItemDetails} />
            <SecureRoute path="/admin/items" component={Items} />
            <SecureRoute path="/admin/boxes/:id" component={BoxDetails} />
            <SecureRoute path="/admin/boxes" component={Boxes} />
            <Route path="/" component={NotFound} />
          </Switch>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
