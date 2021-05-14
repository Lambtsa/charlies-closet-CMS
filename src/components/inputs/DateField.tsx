import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';

interface DateFieldProps {
  value: string,
  class?: string,
  id?: string,
  label?: string,
  required?: boolean,
  placeholder: string,
  setValue: (arg: string) => void,
};

const DateField = (props: DateFieldProps) => {
  const maxLength = props.placeholder.length;
  const regex = new RegExp(`^[0-9 -]{0,${maxLength}}$`);

  const handleDateChange = (e: any) => {
    if (regex.test(e.target.value) || e.target.value === '') {
      props.setValue(e.target.value);
    }
    return;
  }

  return (
    <>
      <div className="select__container">
        <div className="select__overlay">
          <div className="select__overlay--icon">
            <FontAwesomeIcon icon={faCalendarDay} />
          </div>
        </div>
        <label className={`${props.class ? props.class : ''}`} htmlFor={props.id}>
          {props.label}
          <input
            className="form__input date"
            id={props.id}
            autoComplete="none"
            value={props.value}
            onChange={handleDateChange}
            type="text"
            placeholder={props.placeholder} />
      </label>
      </div>
    </>
  );
};

export default DateField;
