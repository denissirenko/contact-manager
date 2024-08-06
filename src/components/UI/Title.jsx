import React from "react";

const Title = ({ tag: Tag = "h2", className = "", children }) => {
  return (
    <Tag className={`w-full font-semibold size-5 ${className}`}>{children}</Tag>
  );
};

export default Title;
