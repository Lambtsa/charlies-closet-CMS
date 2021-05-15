import React, { useEffect, useState } from 'react';

const useError = () => {
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(error) {
      window.scrollTo(0, 0);
    }

  }, [error])

  return {
    error,
    setError,
  }
};

export default useError;