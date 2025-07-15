import type { JSX } from "react";
import { useAppContext } from "../context/app.context";
import { logout } from "../api/logoutUser";

function Counter(): JSX.Element {
  const { state } = useAppContext();
  const count = state.appointments.length;

  return (
    <div className="px-10 py-5 flex justify-between">
      <h3 className="ml-0 md:ml-6 text-base md:text-lg font-semibold">
        Total Appointments: <span>{count}</span>
      </h3>
      <button
        className="bg-black text-white rounded-2xl py-2 px-4 hover:bg-gray-800"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Counter;
