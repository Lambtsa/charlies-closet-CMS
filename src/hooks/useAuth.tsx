import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://charlies-closet-dev.herokuapp.com/api'
  : 'http://localhost:8080/api';

interface Credentials {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
}

const useAuth = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [token, setToken] = useState(localStorage.token ? JSON.parse(localStorage.token) : '');

  useEffect(() => {
    if (token !== '') {
      localStorage.token = JSON.stringify(token);
    }
  }, [token]);

  const setUserContext = async (accessToken: string, redirect: string) => {
    await fetch(`${baseUrl}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response: any) => response.json())
      .then(data => {
        setUser(data.currentUser);
        history.push(redirect);
      })
      .catch(() => setError(true));
  };

  const registerUser = async (data: Credentials) => {
    await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response: any) => {
        if (!response.ok) {
          throw new Error('There was an issue logging you in');
        }
        return response.json();
      })
      .then(async responseData => {
        setToken(responseData.token);
        await setUserContext(responseData.token, '/onboarding/my-baby');
      })
      .catch(() => setError(true));
  };

  const loginUser = async (data: { email: string, password: string }) => {
    await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response: any) => {
        if (!response.ok) {
          throw new Error('There was an issue logging you in');
        }
        return response.json();
      })
      .then(async (responseData: any) => {
        setToken(responseData.token);
        await setUserContext(responseData.token, '/admin/dashboard');
      })
      .catch((err) => {
        console.log(err.message);
        setError(true)
      });
  };

  const logoutUser = async () => {
    await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((data: any) => {
        setToken(data.token);
        setUser(null);
        history.push('/');
      })
      .catch(() => setError(true));
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    token,
    error,
    setError,
  };
};

export default useAuth;
