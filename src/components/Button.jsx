import React from "react";

function Button({
  children,
  className = "",
  type = "submit",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-2.5 rounded-xl font-semibold shadow-md transition 
                  bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
