import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/*
  Components
*/
import InputField from '../components/inputs/InputField';

const Login = () => {
  const { loginUser, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError(true);
    } else {
      await loginUser({
        email,
        password,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="login__container">
        <h1 className="split__title">Espace Admin</h1>
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          setValue={setEmail} />
        <InputField
          id="password"
          label="Mot de passe"
          type="password"
          placeholder="Mot de passe"
          value={password}
          setValue={setPassword} />
        <button className="form__btn" type="submit">Se connecter</button>
        {error && <p className="form__error">Please provide valid credentials</p>}
      </form>
      <footer className="footer__container">
        {`© ${new Date().getFullYear()} Charlie's Closet. Tous droits réservés - `}
        <a className="footer__link" href="https://stockholm-family.com">Site live</a>
      </footer>
    </>
  )
};

export default Login;
