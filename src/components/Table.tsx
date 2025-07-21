import React from "react";
import { useAppContext } from "../context/app.context";
import type { Appointment } from "../types";
import { sortAppointments } from "../logic/app.logic";
import { useAppointmentActions } from "../hooks/useAppointmentActions";
import Button from "./Button";

interface TableRowProps {
  app: Appointment;
  isEditing: boolean;
  onDelete: () => void;
  onEdit: () => void;
  user: "doctor" | "patient" | "admin" | null
}

const TableRow: React.FC<TableRowProps> = ({
  app,
  isEditing,
  onDelete,
  onEdit,
  user,
}) => {
  return (
    <tr
      className={`${
        isEditing ? "bg-gray-200 border-2 border-black" : ""
      } hover:bg-gray-100`}
    >
      {user === "doctor" && (
        <td className="px-3 py-2 border-b border-gray-200">{app.name}</td>
      )}
      {user === "patient" && (
        <td className="px-3 py-2 border-b border-gray-200">{app.doctor}</td>
      )}
      <td className="px-3 py-2 border-b border-gray-200">{app.date}</td>
      <td className="px-3 py-2 border-b border-gray-200">{app.slot}</td>
      <td className="px-3 py-2 border-b border-gray-200">{app.purpose}</td>
      {user === "patient" && (
        <td className="px-3 py-2 border-b border-gray-200 flex gap-1 md:gap-1 items-center">
          <Button variant="default" className="w-full" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" className="w-full" onClick={onDelete}>
            Cancel
          </Button>
        </td>
      )}
    </tr>
  );
};


const AppointmentTable = () => {
  const { state } = useAppContext();
  const { modal, deleteAppointment, editAppointment } = useAppointmentActions();
  const user = state.userType;
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
            {user === "doctor" && <th className="px-3 py-2">Name</th>}
            {user === "patient" && <th className="px-3 py-2">Doctor</th>}
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Slot</th>
            <th className="px-3 py-2">Purpose</th>
            {user === "patient" && <th className="px-3 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-sm">
          {appointments.map((app) => (
            <TableRow
              key={app.id}
              app={app}
              isEditing={app.id === state.editingAppointmentId}
              onEdit={() => editAppointment(app)}
              onDelete={() => deleteAppointment(app.id)}
              user={user}
            />
          ))}
        </tbody>
      </table>
      {modal}
    </>
  );
};

export default AppointmentTable;
