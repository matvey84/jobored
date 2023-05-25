import React from 'react';
import { useAppSelector } from '../redux/hooks';

const OpenFoemSVG = () => {
  const isFormOpen = useAppSelector((state) => state.dataSlice.isFormOpen);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="16"
        height="16"
        viewBox="0 0 256 256"
        xmlSpace="preserve"
      >
        <g
          stroke="none"
          strokeWidth="0"
          strokeDasharray="nonee"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fill="none"
          fillRule="nonzero"
          opacity="1"
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 45 90 c -0.896 0 -1.792 -0.342 -2.475 -1.025 L 2.734 49.184 c -1.367 -1.366 -1.367 -3.583 0 -4.949 c 1.367 -1.367 3.583 -1.367 4.95 0 L 45 81.55 l 37.316 -37.315 c 1.367 -1.367 3.582 -1.367 4.949 0 c 1.367 1.366 1.367 3.583 0 4.949 L 47.475 88.975 C 46.791 89.658 45.896 90 45 90 z"
            stroke="none"
            strokeWidth="1"
            strokeDasharray="none"
            strokeLinecap="butt"
            strokeMiterlimit="10"
            fill={isFormOpen ? '#3B7CD3' : 'rgb(0,0,0)'}
            fillRule="nonzero"
            opacity="1"
            transform=" matrix(1 0 0 1 0 0)"
          />
          <path
            d="M 84.791 29.794 H 5.209 c -1.933 0 -3.5 -1.567 -3.5 -3.5 c 0 -1.933 1.567 -3.5 3.5 -3.5 h 79.582 c 1.933 0 3.5 1.567 3.5 3.5 C 88.291 28.227 86.724 29.794 84.791 29.794 z"
            stroke="none"
            strokeWidth="1"
            strokeDasharray="none"
            strokeLinecap="butt"
            strokeMiterlimit="10"
            fill={isFormOpen ? '#3B7CD3' : 'rgb(0,0,0)'}
            fillRule="nonzero"
            opacity="1"
            transform=" matrix(1 0 0 1 0 0)"
          />
          <path
            d="M 84.791 7 H 5.209 c -1.933 0 -3.5 -1.567 -3.5 -3.5 S 3.276 0 5.209 0 h 79.582 c 1.933 0 3.5 1.567 3.5 3.5 S 86.724 7 84.791 7 z"
            stroke="none"
            strokeWidth="1"
            strokeDasharray="none"
            strokeLinecap="butt"
            strokeMiterlimit="10"
            fill={isFormOpen ? '#3B7CD3' : 'rgb(0,0,0)'}
            fillRule="nonzero"
            opacity="1"
            transform=" matrix(1 0 0 1 0 0)"
          />
        </g>
      </svg>
    </>
  );
};

export default OpenFoemSVG;
