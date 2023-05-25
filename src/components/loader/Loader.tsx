import React from 'react';
import './loader-style.scss';
import LoaderSVG from '../../ui/loaderSVG';

function Loader() {
  return (
    <div className="loader-container">
      <LoaderSVG />
    </div>
  );
}
export default Loader;
