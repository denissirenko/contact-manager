import React from "react";

const Title = ({ className = "", children }) => {
  return (
    <h2 className={`${className} w-full font-semibold size-5`}>{children}</h2>
  );
};

export default Title;
