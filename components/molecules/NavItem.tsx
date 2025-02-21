"use client"

export const NavItem = ({ children, onClick }) => {
    return (
      <span
        className="text-neutral-600 hover:text-neutral-900 cursor-pointer"
        onClick={onClick}
      >
        {children}
      </span>
    );
  };
  