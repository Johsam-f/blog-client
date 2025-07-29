import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outline";
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "rounded-lg text-sm font-medium transition duration-200 ease-in-out cursor-pointer";
  const variants = {
    primary: "flex items-center gap-1 text-gray-400 hover:text-blue-400",
    secondary: "px-4 py-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-black shadow-md transition hover:bg-gray-300 cursor-pointer active:opacity-90",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
