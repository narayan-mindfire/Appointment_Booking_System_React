import { useEffect, type JSX } from "react";
import AppointmentCards from "./AppointmentCards";
import Table from "./Table";
import { useAppContext } from "../context/app.context";

function AppointmentList(): JSX.Element {
  const { state, setState } = useAppContext();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setState("sortAppointmentsBy", sortValue || null);
  };

  const handleGridViewToggle = (isGrid: boolean) => {
    setState("isGridSelected", isGrid);
  };

  useEffect(() => {
    console.log("appointmentlist rendered");
  }, []);

  return (
    <div className="mt-20 w-full md:w-[60%] p-2 md:p-6  bg-white rounded-[10px] max-h-[110vh]  overflow-y-auto">
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-center text-2xl">Appointments List</h2>
        <div className="flex flex-nowrap gap-[3px]">
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
          There are no appointments yet. Please create one to get started.
        </div>
      ) : state.isGridSelected ? (
        <AppointmentCards />
      ) : (
        <Table />
      )}
    </div>
  );
}

export default AppointmentList;
