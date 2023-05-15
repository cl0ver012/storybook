import React from "react";

const Hexagon = (props: any) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.5 5.25L14.625 4.15583M16.5 5.25V7.125M16.5 5.25L14.625 6.34417M1.5 5.25L3.375 4.15583M1.5 5.25L3.375 6.34417M1.5 5.25V7.125M9 9.625L10.875 8.53083M9 9.625L7.125 8.53083M9 9.625V11.5M9 17.125L10.875 16.0308M9 17.125V15.25M9 17.125L7.125 16.0308M7.125 1.96833L9 0.875L10.875 1.96917M16.5 10.875V12.75L14.625 13.8442M3.375 13.8442L1.5 12.75V10.875"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Hexagon;
