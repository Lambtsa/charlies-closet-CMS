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
import SideBar from './components/SideBar';
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
    issuer: 'https://dev-69595980.okta.com/oauth2/default',
    clientId: '0oal2tf90ihsMPGOm5d6',
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
        <SideBar />
        <section className="content__container">
          <Switch>
            <SecureRoute exact path="/" component={Home} />
            <Route exact path="/login" render={() => <SignIn />} />
            <Route exact path="/login/callback" component={LoginCallback} />
            <SecureRoute exact path="/items" component={Items} />
            <SecureRoute exact path="/new-item" component={NewItem} />
            <SecureRoute exact path="/items/:id" component={EditItem} />
            <SecureRoute exact path="/boxes" component={Boxes} />
            <SecureRoute exact path="/sales" component={Sales} />
            <SecureRoute exact path="/dashboard" component={Dashboard} />
            <Route path="/" component={NotFound} />
          </Switch>
        </section>
      </main>
      <Footer />
    </Security>
  );
}

export default AppWithRouterAccess;
