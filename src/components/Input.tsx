import React from "react";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
  min?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  textarea = false,
  min,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          min={min}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
