import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle as deleteIcon } from '@fortawesome/free-solid-svg-icons';

const SnackBar = ({
  state,
  setState,
  type,
  message,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setState(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

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

SnackBar.propTypes = {
  state: PropTypes.bool.isRequired,
};
