import type { JSX } from "react";
import { useAppContext } from "../context/app.context";

function Counter(): JSX.Element {
  const { state } = useAppContext();
  const count = state.appointments.length;

  return (
    <div className="head-area">
      <h3 id="total-appointments">
        Total Appointments: <span>{count}</span>
      </h3>
    </div>
  );
}

export default Counter;
