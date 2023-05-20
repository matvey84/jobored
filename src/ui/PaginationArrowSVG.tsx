import React from 'react';
interface IProp {
  disabled: boolean;
}
const PaginationArrowSVG = (props: IProp) => {
  return (
    <>
      <svg
        className="arrowSVG"
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill={props.disabled ? '#5E96FC' : 'none'}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" fill="white" /> */}
        <path
          d="M15.367 16L18.667 12.7L17.724 11.757L13.481 16L17.724 20.243L18.667 19.3L15.367 16Z"
          fill={props.disabled ? '#FFFFFF' : '#7B7C88'}
        />
        {/* <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#D5D6DC" />*/}
      </svg>
    </>
  );
};

export default PaginationArrowSVG;
