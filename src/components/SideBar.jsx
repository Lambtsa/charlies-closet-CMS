import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

import ProfileWidget from './ProfileWidget';
import Loader from './Loader';

const SideBar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    if (authState.isAuthenticated) {
      const user = await oktaAuth.token.getUserInfo();
      setUserDetails(user);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {!isLoading && (
        <aside className="sidebar__container">
          <div className="sidebar">
            <ProfileWidget userDetails={userDetails} />
            <div className="sidebar__nav">
              <Link className="sidebar__link" to="/items">Items</Link>
              <Link className="sidebar__link" to="/boxes">Boxes</Link>
              <Link className="sidebar__link" to="/sales">Sales</Link>
            </div>
          </div>
        </aside>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default SideBar;
