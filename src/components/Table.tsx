import React from "react";
import { useAppContext } from "../context/app.context";
import type { Appointment } from "../types";
import { sortAppointments } from "../logic/app.logic";

interface TableRowProps {
  app: Appointment;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  app,
  onEdit,
  onDelete,
  isEditing,
}) => {
  return (
    <tr className={isEditing ? "highlighted" : ""}>
      <td>{app.name}</td>
      <td>{app.doctor}</td>
      <td>{app.date}</td>
      <td>{app.slot}</td>
      <td>{app.purpose}</td>
      <td>
        <button className="edit" onClick={() => onEdit(app.id)}>
          Edit
        </button>
        <button className="delete" onClick={() => onDelete(app.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

const AppointmentTable: React.FC = () => {
  const { state, setState } = useAppContext();
  let appointments = state.appointments;
  const sortKey = state.sortAppointmentsBy as Exclude<
    keyof Appointment,
    "id"
  > | null;

  if (sortKey) {
    appointments = sortAppointments(appointments, sortKey);
  }

  const handleEdit = (id: number) => {
    setState("editingAppointmentId", id);
  };

  const handleDelete = (id: number) => {
    const updated = state.appointments.filter((app) => app.id !== id);
    setState("appointments", updated);
  };

  return (
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            isEditing={app.id === state.editingAppointmentId}
          />
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
