import React from "react";

const Error = ({ className, children }) => {
  return (
    <p className={`text-red text-xs absolute -bottom-4 ${className}`}>
      {children}
    </p>
  );
};

export default Error;
