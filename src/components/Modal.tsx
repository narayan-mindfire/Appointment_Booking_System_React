import React from "react";

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onConfirm, onClose }) => {
  return (
    <div
      id="myModal"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative w-[90%] max-w-md bg-white p-6 rounded-lg text-center shadow-lg">
        <span
          className="absolute top-3 right-4 text-2xl font-bold cursor-pointer select-none"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </span>
        <p className="text-gray-800 text-base my-5">{message}</p>
        <button
          id="confirm-button"
          onClick={onConfirm}
          className="bg-red-600 hover:bg-black text-white font-medium px-5 py-2 rounded-md text-sm transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Modal;
