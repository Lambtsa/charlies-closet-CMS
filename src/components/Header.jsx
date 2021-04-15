import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const Header = () => {
  const { oktaAuth } = useOktaAuth();

  return (
    <header className="header">
      <h2 className="header__title">Charlie&apos;s closet</h2>
      <div>
        <button type="button" onClick={() => oktaAuth.signOut()}>Admin</button>
      </div>
    </header>
  );
};

export default Header;
