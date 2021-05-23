import React, { createContext, useState, useEffect } from 'react';
import baseApiUrl from '../helpers/api-service';

const UserContext = createContext<any>(null);

const UserProvider = (props: {children: any }) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const token = localStorage.token ? JSON.parse(localStorage.token) : '';
  const [isLoading, setIsLoading] = useState(true);

  const findUser = async () => {
    await fetch(`${baseApiUrl}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => {
        if (!response.ok) {
          throw new Error('user is not logged in');
        }
        return response.json();
      })
      .then((data : any) => {
        setUser(data.currentUser);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    findUser();
    /* eslint-disable-next-line */
  }, []);

  const userState = {
    user,
    setUser,
    findUser,
    isLoading,
  };

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
