import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle as deleteIcon } from '@fortawesome/free-solid-svg-icons';

interface SnackBarProps {
  state: any,
  setState: any,
  type: string,
  message: string,
}

const SnackBar = (props: SnackBarProps) => {
  const {
    state,
    setState,
    type,
    message,
  } = props;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setState(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  });

  return (
    <div className="snackbar">
      <div className="snackbar__container">
        <button type="button" className="snackbar__close" onClick={() => setState(!state)}>
          <FontAwesomeIcon icon={deleteIcon} />
        </button>
        <p className={`snackbar__${type}`}>{message}</p>
      </div>
    </div>
  );
};

export default SnackBar;
