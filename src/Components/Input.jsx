import React, { useId } from "react";

function Input(
  { className = "", type = "text", label, ...props }, // Add ...rest here
  ref
) {
  const Id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={Id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={` ${className}`}
        ref={ref}
        id={Id}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Input);
