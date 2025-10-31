import { useEffect, useState } from "react";

const Modal = ({ children, show, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      {open && (
        <>
          <div
            className="bg-black/30 size-full fixed top-0 right-0 z-[999]"
            onClick={handleClose}
          ></div>
          <div className="fixed z-[1000] top-1/2 right-1/2 translate-x-1/2 px-6 -translate-y-1/2 bg-white w-120 min-h-100 rounded-3xl p-4">
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
