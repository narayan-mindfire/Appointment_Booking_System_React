import React from "react";

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] max-w-lg bg-white p-6 rounded-lg shadow-lg max-h-[95vh] overflow-y-auto">
        <button
          className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
