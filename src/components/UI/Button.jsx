import React from "react";

const Button = ({
  className = "",
  type = "button",
  disabled,
  isLoading,
  loadingText,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} w-full py-2 px-4 border border-gray-400 rounded-md font-semibold text-center ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};

export default Button;
