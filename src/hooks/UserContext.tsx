import React, { createContext, useState, useEffect } from 'react';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://charlies-closet-dev.herokuapp.com/api'
  : 'http://localhost:8080/api';

const UserContext = createContext<any>(null);

const UserProvider = (props: {children: any }) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const token = localStorage.token ? JSON.parse(localStorage.token) : '';
  const [isLoading, setIsLoading] = useState(true);

  const findUser = async () => {
    await fetch(`${baseUrl}/auth/user`, {
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
