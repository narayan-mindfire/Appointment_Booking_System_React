import React from "react";
import { useAppContext } from "../context/app.context";
import type { Appointment } from "../types";
import { sortAppointments } from "../logic/app.logic";
import { useAppointmentActions } from "../hooks/useAppointmentActions";

interface TableRowProps {
  app: Appointment;
  isEditing: boolean;
  onDelete: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ app, isEditing, onDelete }) => {
  const { editAppointment } = useAppointmentActions();
  return (
    <>
      <tr className={isEditing ? "highlighted" : ""}>
        <td>{app.name}</td>
        <td>{app.doctor}</td>
        <td>{app.date}</td>
        <td>{app.slot}</td>
        <td>{app.purpose}</td>
        <td>
          <button className="edit" onClick={() => editAppointment(app)}>
            Edit
          </button>
          <button className="delete" onClick={onDelete}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

const AppointmentTable: React.FC = () => {
  const { state } = useAppContext();
  const { modal, deleteAppointment } = useAppointmentActions();
  let appointments = state.appointments;
  const sortKey = state.sortAppointmentsBy as Exclude<
    keyof Appointment,
    "id"
  > | null;

  if (sortKey) {
    appointments = sortAppointments(appointments, sortKey);
  }
  return (
    <>
      <table className="appointment-table" id="appointment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Slot</th>
            <th>Purpose</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-body" id="appointment-table-body">
          {appointments.map((app) => (
            <TableRow
              key={app.id}
              app={app}
              isEditing={app.id === state.editingAppointmentId}
              onDelete={() => deleteAppointment(app.id)}
            />
          ))}
        </tbody>
      </table>
      {modal}
    </>
  );
};

export default AppointmentTable;
