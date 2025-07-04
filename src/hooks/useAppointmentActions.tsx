import { useAppContext } from "../context/app.context";
import { useState, type JSX } from "react";
import Modal from "../components/Modal";
import type { Appointment } from "../types";

export function useAppointmentActions() {
  const { state, setState } = useAppContext();
  const [modal, setModal] = useState<null | JSX.Element>(null);

  function deleteAppointment(id: number) {
    const handleConfirm = () => {
      const updated = state.appointments.filter((app) => app.id !== id);
      setState("appointments", updated);
      setModal(null);
    };

    const handleClose = () => setModal(null);

    setModal(
      <Modal
        message="Are you sure you want to delete this appointment?"
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    );
  }

  function editAppointment(appointment: Appointment) {
    const { id, ...fields } = appointment;

    setState("editingAppointmentId", id);
    setState("formFields", fields);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return {
    deleteAppointment,
    editAppointment,
    modal,
  };
}
