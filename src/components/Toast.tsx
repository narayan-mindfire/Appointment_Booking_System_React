import { useEffect, useState } from "react";

const Toast = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "warning" | "error";
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!visible) return null;

  const backgroundColor = {
    success: "green",
    warning: "orange",
    error: "red",
  }[type];

  return (
    <div
      id="toast-message"
      className="toast-visible"
      style={{ backgroundColor }}
    >
      {message}
    </div>
  );
};

export default Toast;
