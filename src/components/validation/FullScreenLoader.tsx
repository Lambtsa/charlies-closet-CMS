import React from 'react';
import Loader from './Loader';

const FullScreenLoader = (props: {loaderText?: string}) => {

  return (
    <>
      <section className="fullscreenloader">
        <div>
          <Loader theme="light" />
          {props.loaderText && <p className="fullscreenloader__text">{props.loaderText}</p>}
        </div>
      </section>
    </>
  )
};

export default FullScreenLoader;
