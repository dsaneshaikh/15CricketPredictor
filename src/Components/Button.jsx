import React from "react";

function Button({
  children,
  className = "",
  bgColor = "bg-blue-600",
  type = "button",
  textColor = "text-white",
  ...props
}) {
  return (
    <button className={`${className} ${bgColor} ${textColor} `} {...props}>
      {children}
    </button>
  );
}

export default Button;
