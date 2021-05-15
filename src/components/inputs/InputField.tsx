import React, { useState } from 'react';

interface InputFieldProps {
  value: any,
  class?: string,
  id?: string,
  step?: number,
  label?: string,
  required?: boolean,
  setValue: (arg: any) => void,
  type?: string,
  maxLength?: number,
  placeholder: string,
};

const InputField = (props: InputFieldProps) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValueChange = (e: any) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (props.type === 'number' && e.target.value > 0) {
      const number = Math.floor(e.target.value * 100);
      const decimal = number / 100;
      props.setValue(decimal);
      return;
    }
    if (props.type === 'email') {
      if (e.target.value && !regex.test(e.target.value)) {
        setError(true);
        setErrorMessage('Veuillez saisir une adresse valide');
      } else {
        setError(false);
      }
    }
    props.setValue(e.target.value.trim().toLowerCase());
  };

  return (
    <>
      <label className={`${props.class ? props.class : ''} ${error ? 'error' : ''}`} htmlFor={props.id}>
        {props.label}
        <input
          className="form__input"
          id={props.id}
          step={props.step}
          autoComplete="none"
          value={props.value}
          onWheel={ event => event.currentTarget.blur() } 
          onChange={handleValueChange}
          type={props.type}
          maxLength={props.maxLength}
          placeholder={props.placeholder} />
        {error && <p className="form__error-message">{errorMessage}</p>}
      </label>
    </>
  );
};

export default InputField;

InputField.defaultProps = {
  type: 'text',
  maxLength: 30,
}
