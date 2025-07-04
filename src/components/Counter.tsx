import type { JSX } from "react";
import { useAppContext } from "../context/app.context";

function Counter(): JSX.Element {
  const { state } = useAppContext();
  const count = state.appointments.length;

  return (
    <div className="px-10 py-5 text-lg">
      <h3 className="ml-0 md:ml-6 text-base md:text-lg font-semibold">
        Total Appointments: <span>{count}</span>
      </h3>
    </div>
  );
}

export default Counter;
