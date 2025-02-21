export const Input = ({ type, placeholder, className }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-neutral-300 rounded-lg ${className}`}
      />
    );
  };
  