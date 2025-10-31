const Button = ({ children, className, onClick }) => {
  return (
    <>
      <button
        className={`${className} bg-primary px-4 py-2.5 cursor-pointer active:opacity-80 transition-all duration-100 rounded-xl text-white`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
