import React from "react";

const FormField = ({ id, label, type, placeholder, register, errors }) => {
  return (
    <div className="mb-4 relative">
      {label && (
        <label className="text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        aria-invalid={!!errors[id]}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {errors[id] && (
        <p className="absolute text-red-500 text-xs">{errors[id].message}</p>
      )}
    </div>
  );
};

export default FormField;
