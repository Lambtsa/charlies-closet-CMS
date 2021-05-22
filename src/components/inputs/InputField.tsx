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

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleOnBlur = (e: any) => {

    if (e.target.value === '') {
      setError(true);
      setErrorMessage('Ce champ est obligatoire');
    }
    if (props.type === 'email' && e.target.value !== '' && !emailRegex.test(e.target.value)) {
      setError(true);
      setErrorMessage('Veuillez saisir une adresse valide');
    }
  }

  const handleValueChange = (e: any) => {
    
    if (e.target.value) {
      setError(false);
    }
    const textRegex = /^[A-Za-z0-9 \-'\.éèêâàöïç@_0-9]*$/;

    if (props.type === 'tel') {
      let formattedTel;
      if (e.target.value.length > 0) {
        formattedTel = e.target.value.match(/\d{1,2}/gi).join(' ');
      } else {
        formattedTel = e.target.value.toString();
      }
      if (formattedTel.length <= 14) {
        props.setValue(formattedTel);
      }
    }
    if (props.type === 'number') {
      props.setValue(parseInt(e.target.value));
    }
    if (props.type === 'email') {
      if (e.target.value > 0 && !emailRegex.test(e.target.value)) {
        setError(true);
        setErrorMessage('Veuillez saisir une adresse valide');
      }
      props.setValue(e.target.value.trim());
    }
    if (props.type === 'text' && textRegex.test(e.target.value)) {
      props.setValue(e.target.value.trim());
    }
    if (props.type === 'password') {
      props.setValue(e.target.value.trim());
    }
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
          onBlur={handleOnBlur}
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
