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
    <div className="appointment-list">
      <div className="appointment-head">
        <h2>Appointments List</h2>
        <div className="app-options">
          <select id="sort" onChange={handleSortChange}>
            <option>Sort appointments (default)</option>
            <option id="sDate" value="date">
              Sort by date (closest first)
            </option>
            <option id="sDate" value="dateR">
              Sort by date (closest last)
            </option>
            <option id="sDname" value="doctor">
              Sort by doctor name (A-Z)
            </option>
            <option id="sDname" value="doctorR">
              Sort by doctor name (Z-A)
            </option>
            <option id="sPname" value="name">
              Sort by patient name (A-Z)
            </option>
            <option id="sPname" value="nameR">
              Sort by patient name (Z-A)
            </option>
          </select>
          <button
            id="btn-half"
            title="Grid view"
            style={{
              backgroundColor: state.isGridSelected ? "#c5c4c4" : "#fff",
            }}
            onClick={() => handleGridViewToggle(true)}
          >
            <i className="fas fa-th-large"></i>
          </button>
          <button
            id="btn-full"
            title="List view"
            style={{
              backgroundColor: !state.isGridSelected ? "#c5c4c4" : "#fff",
            }}
            onClick={() => handleGridViewToggle(false)}
          >
            <i className="fas fa-list"></i>
          </button>
        </div>
      </div>

      {state.isGridSelected ? <AppointmentCards /> : <Table />}
    </div>
  );
}

export default AppointmentList;
