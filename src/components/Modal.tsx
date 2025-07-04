import React from "react";

interface ModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onConfirm, onClose }) => {
  return (
    <div style={styles.overlay} id="myModal">
      <div style={styles.modal}>
        <span style={styles.close} onClick={onClose}>
          <i className="fa-solid fa-xmark" />
        </span>
        <p>{message}</p>
        <button id="confirm-button" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    position: "relative",
    minWidth: "300px",
    textAlign: "center",
  },
  close: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
};

export default Modal;
