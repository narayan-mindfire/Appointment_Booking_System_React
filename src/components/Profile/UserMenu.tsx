import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/app.context";
import { logout } from "../../api/logoutUser";
import Button from "../Button";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { state } = useAppContext();

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as any).contains(e.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const iconClass =
    state.userType === "patient"
      ? "fa-solid fa-hospital-user"
      : "fa-solid fa-user-doctor";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
      >
        <i className={`${iconClass} text-2xl`} />
        <span className="font-medium text-gray-700">Hi, {state.userName}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-70 bg-white border rounded-md shadow-lg z-50 m-10 p-10">
          <Button variant="outline" onClick={() => navigate("/profile")} className="w-full mb-5">
            Profile
          </Button>
          <Button variant="default" onClick={logout} className="w-full">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
