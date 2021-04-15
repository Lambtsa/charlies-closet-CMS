import React from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

/*
  Components
*/
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './components/SignIn';

/*
  Views
*/
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Items from './views/Items';
import NewItem from './views/NewItem';
import Boxes from './views/Boxes';
import Sales from './views/Sales';
import NotFound from './views/NotFound';
import EditItem from './views/EditItem';

function AppWithRouterAccess() {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: 'https://dev-14386776.okta.com/oauth2/default',
    clientId: '0oal6t6s8FdYa6NxB5d6',
    redirectUri: '/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: false,
  });

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={restoreOriginalUri}
      onAuthRequired={onAuthRequired}>
      <Header />
      <main>
        <Switch>
          <SecureRoute exact path="/" component={Home} />
          <Route exact path="/login" render={() => <SignIn />} />
          <Route exact path="/login/callback" component={LoginCallback} />
          <SecureRoute exact path="/dashboard" component={Dashboard} />
          <SecureRoute exact path="/new-item" component={NewItem} />
          <SecureRoute exact path="/items" component={Items} />
          <SecureRoute exact path="/items/:id" component={EditItem} />
          <SecureRoute exact path="/boxes" component={Boxes} />
          <SecureRoute exact path="/sales" component={Sales} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Security>
  );
}

export default AppWithRouterAccess;
