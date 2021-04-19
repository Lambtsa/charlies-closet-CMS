import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();

  const handleLoginClick = () => {
    if (authState.isAuthenticated) {
      oktaAuth.signOut();
    } else {
      history.push('/login');
    }
  };

  return (
    <header className="header">
      <h2 className="header__title">Charlie&apos;s closet</h2>
      <div>
        <button type="button" onClick={handleLoginClick}>{authState.isAuthenticated ? 'Se déconnecter' : 'Se connecter'}</button>
      </div>
    </header>
  );
};

export default Header;
