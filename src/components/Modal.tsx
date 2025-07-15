import React from "react";
import Button from "./Button";

interface ModalProps {
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
  message?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  children,
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const isConfirmation = !!message && !!onConfirm;

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

        {isConfirmation ? (
          <>
            <p className="text-gray-800 text-base mb-6">{message}</p>
            <div className="flex justify-end gap-3">
              <Button variant="default" onClick={onClose} className="w-full">
                {cancelText}
              </Button>
              <Button variant="danger" onClick={onConfirm} className="w-full">
                {confirmText}
              </Button>
            </div>
          </>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
