import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import SnackBar from '../components/SnackBar';

const SignInForm = () => {
  const [error, setError] = useState(false);
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const transaction = await oktaAuth.signInWithCredentials({
        username,
        password,
      });
      if (transaction.status === 'SUCCESS') {
        setSessionToken(transaction.sessionToken);
        oktaAuth.signInWithRedirect({
          sessionToken: transaction.sessionToken,
        });
        setError(false);
      } else {
        window.scrollTo(0, 0);
        setError(true);
      }
    } catch (err) {
      window.scrollTo(0, 0);
      setError(true);
    }
  };

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    return null;
  }

  return (
    <section className="login__container">
      <form className="form" onSubmit={handleFormSubmit}>
        <label className="form__label" htmlFor="username">
          Username
          <input
            className="form__input"
            placeholder="Enter your username"
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange} />
        </label>
        <label className="form__label" htmlFor="password">
          Password
          <input
            className="form__input"
            placeholder="Enter your password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange} />
        </label>
        <button className="btn btn__primary" type="submit">Login</button>
      </form>
      {error && (
        <SnackBar
          state={error}
          setState={setError}
          type="error"
          message="Oops! Something went wrong!" />
      )}
    </section>
  );
};

export default SignInForm;
