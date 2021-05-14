import React from 'react';

const Loader = (props: { theme: string }) => (
  <>
    <div className="loader__container">
      <div className={`lds-ripple ${props.theme}`}>
        <div />
        <div />
      </div>
    </div>
  </>
);

export default Loader;

Loader.defaultProps = {
  theme: 'dark',
}