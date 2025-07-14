import { useEffect } from "react";
import AppointmentCards from "./AppointmentCards";
import Table from "./Table";
import { useAppContext } from "../context/app.context";
interface AppointmetnListProps {
  user: "doctor" | "patient";
}

const AppointmentList: React.FC<AppointmetnListProps> = ({ user }) => {
  const { state, setState } = useAppContext();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setState("sortAppointmentsBy", sortValue || null);
  };

  const handleGridViewToggle = (isGrid: boolean) => {
    setState("isGridSelected", isGrid);
  };

  useEffect(() => {
    if (state.editingAppointmentId) {
      window.onbeforeunload = function () {
        return true;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [state.editingAppointmentId]);

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex gap-1 md:gap-1 items-center">
          <select
            onChange={handleSortChange}
            className="w-[180px] border border-gray-300 rounded-md font-medium focus:outline-none focus:border-black focus:border-2 text-sm px-2 py-[6px]"
          >
            <option>Sort appointments (default)</option>
            <option value="date">Sort by date (closest first)</option>
            <option value="dateR">Sort by date (closest last)</option>
            <option value="doctor">Sort by doctor name (A-Z)</option>
            <option value="doctorR">Sort by doctor name (Z-A)</option>
            <option value="name">Sort by patient name (A-Z)</option>
            <option value="nameR">Sort by patient name (Z-A)</option>
          </select>
          <button
            title="Grid view"
            className={`hidden md:inline-block rounded-sm border-none px-2 py-1 ${
              state.isGridSelected ? "bg-[#c5c4c4]" : "bg-white"
            }`}
            onClick={() => handleGridViewToggle(true)}
          >
            <i className="fas fa-th-large"></i>
          </button>
          <button
            title="List view"
            className={`hidden md:inline-block rounded-sm border-none px-2 py-1 ${
              !state.isGridSelected ? "bg-[#c5c4c4]" : "bg-white"
            }`}
            onClick={() => handleGridViewToggle(false)}
          >
            <i className="fas fa-list"></i>
          </button>
        </div>
      </div>

      {state.appointments.length === 0 ? (
        <div className="text-center text-gray-600 text-base mt-10">
          There are no appointments yet.
          {user === "patient" && `Please create one to get started.`}
        </div>
      ) : state.isGridSelected ? (
        <AppointmentCards user={user} />
      ) : (
        <Table user={user} />
      )}
    </>
  );
};

export default AppointmentList;
