import React, { useEffect, useState } from "react";

type ToastType = "success" | "warning" | "error";

interface ToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  visible,
}) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, message, type]);

  const backgroundColor =
    {
      success: "green",
      warning: "orange",
      error: "red",
    }[type] || "gray";

  return (
    <div
      id="toast-message"
      style={{
        backgroundColor,
        position: "fixed",
        transition: "opacity 0.3s ease",
        opacity: show ? 1 : 0,
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
