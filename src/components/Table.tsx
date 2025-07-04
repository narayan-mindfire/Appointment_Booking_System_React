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
    <tr
      className={`${
        isEditing ? "bg-gray-200 border-2 border-black" : ""
      } hover:bg-gray-100`}
    >
      <td className="px-3 py-2 border-b border-gray-200">{app.name}</td>
      <td className="px-3 py-2 border-b border-gray-200">{app.doctor}</td>
      <td className="px-3 py-2 border-b border-gray-200">{app.date}</td>
      <td className="px-3 py-2 border-b border-gray-200">{app.slot}</td>
      <td className="px-3 py-2 border-b border-gray-200">{app.purpose}</td>
      <td className="px-3 py-2 border-b border-gray-200">
        <button
          className="w-full px-3 py-1 mb-1 text-sm border border-black rounded hover:opacity-85 bg-white text-black"
          onClick={() => editAppointment(app)}
        >
          Edit
        </button>
        <button
          className="w-full px-3 py-1 text-sm border border-black rounded hover:opacity-85 bg-black text-white"
          onClick={onDelete}
        >
          Delete
        </button>
      </td>
    </tr>
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
      <table className="w-full mt-4 border-collapse bg-white rounded shadow-md max-h-[80vh] overflow-y-auto">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Doctor</th>
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Slot</th>
            <th className="px-3 py-2">Purpose</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
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
