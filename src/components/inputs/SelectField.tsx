import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface SelectFieldProps {
  state: string,
  setState: any,
  name: string,
  label: string,
  options: any,
};

const SelectField = (props: SelectFieldProps) => {
  const { state, setState, name, label, options } = props;

  return (
    <>
      <div className="select__container">
        <div className="select__overlay">
          <div className="select__overlay--icon">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        <label htmlFor={name}>
          {label}
          <select id={name} value={state} onChange={(e:any) => setState(e.target.value)} className="select">
            <option value="select option">{`Choisir ${label.toLowerCase()}`}</option>
            {options && Object.keys(options).map((key: string, index: number) => (
              <option key={index} value={key}>{options[key]}</option>
            ))}
          </select>
        </label>
      </div>
    </>
  )
};

export default SelectField;
