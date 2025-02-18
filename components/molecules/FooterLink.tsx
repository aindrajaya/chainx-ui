"use client"

export const FooterLink = ({ children, onClick }) => {
    return (
      <span
        className="text-neutral-400 hover:text-white cursor-pointer"
        onClick={onClick}
      >
        {children}
      </span>
    );
  };
  