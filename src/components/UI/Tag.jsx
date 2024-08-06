import React from "react";

const Tag = ({ children }) => {
  return (
    <div className="px-3 py-1 text-xs bg-gray-400 rounded-sm">{children}</div>
  );
};

export default Tag;
