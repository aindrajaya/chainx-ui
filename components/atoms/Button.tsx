"use client"

export const Button = ({ children, className, onClick }) => {
    return (
      <button
        className={`px-4 py-2 rounded-lg text-white bg-neutral-900 hover:bg-neutral-800 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  