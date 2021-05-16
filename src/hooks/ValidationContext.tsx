import React, { createContext, useState, useEffect } from 'react';

/*
  Components
*/
import SnackBar from '../components/validation/SnackBar';

const ValidationContext = createContext<any>(null);

const ValidationProvider = (props: {children: any }) => {
  const { children } = props;
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if(error || isValid) {
      window.scrollTo(0, 0);
    }

  }, [error, isValid])

  const validationState = {
    error,
    setError,
    isValid,
    setIsValid,
    setValidationMessage,
  };

  return (
    <ValidationContext.Provider value={validationState}>
      {error && <SnackBar type="error" message={validationMessage} state={error} setState={setError} />}
      {isValid && <SnackBar type="success" message={validationMessage} state={isValid} setState={setIsValid} />}
      {children}
    </ValidationContext.Provider>
  );
};

export { ValidationContext, ValidationProvider };
