import { type JSX } from "react";
import Card from "./Card";
import type { Appointment } from "../types";
import { useAppContext } from "../context/app.context";
import { sortAppointments } from "../logic/app.logic";

function AppointmentCards(): JSX.Element {
  const { state } = useAppContext();

  let appointments: Appointment[] = state.appointments;
  const sortAppointmentsBy = state.sortAppointmentsBy;

  if (sortAppointmentsBy) {
    appointments = sortAppointments(appointments, sortAppointmentsBy);
  }

  return (
    <div id="appointment-cards" className="appointment-cards">
      {appointments.map((app) => (
        <Card key={app.id} {...app} />
      ))}
    </div>
  );
}

export default AppointmentCards;
