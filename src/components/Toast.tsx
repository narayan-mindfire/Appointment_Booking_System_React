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

  const baseClasses =
    "fixed top-5 right-5 z-10 px-5 py-3 rounded text-white font-bold shadow-lg transition-opacity duration-500 ease-in-out opacity-100";

  const typeClasses =
    type === "success"
      ? "bg-green-600"
      : type === "warning"
      ? "bg-orange-500"
      : "bg-red-600";

  return <div className={`${baseClasses} ${typeClasses}`}>{message}</div>;
};

export default Toast;
