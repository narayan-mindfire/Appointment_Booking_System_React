import { useAppContext } from "../context/app.context";
import { useState, type JSX } from "react";
import Modal from "../components/Modal";
import type { Appointment } from "../types";
import Button from "../components/Button";
import axiosInstance from "../api/axiosInterceptor";
import axios from "axios";
import AppointmentModal from "../components/appointment/AppointmentModal";

export function useAppointmentActions() {
  const { state, setState } = useAppContext();
  const [modal, setModal] = useState<null | JSX.Element>(null);

  function deleteAppointment(id: number) {
    const handleConfirm = async () => {
      try {
        await axiosInstance.delete(`/appointments/${id}`);

        const updated = state.appointments.filter((app) => app.id !== id);
        setState("appointments", updated);
        setModal(null);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Failed to delete appointment:", error);
          alert("Failed to delete appointment");
        } else {
          console.error("Unexpected error:", error);
          alert("Something went wrong");
        }
      }
    };

    const handleClose = () => setModal(null);

    setModal(
      <Modal title="Delete Appointment" onClose={handleClose}>
        <p className="text-gray-800 text-base mb-6">
          Are you sure you want to delete this appointment?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="default"
            children={"cancel"}
            onClick={handleClose}
            className="w-full"
          />
          <Button
            variant="danger"
            children={"Confirm"}
            onClick={handleConfirm}
            className="w-full"
          />
        </div>
      </Modal>
    );
  }

  function editAppointment(appointment: Appointment) {
    console.log("edit appointment called");
    const handleClose = () => setModal(null);
    const handleSuccess = () => {
      setModal(null);
      axiosInstance
        .get("/appointments/me")
        .then((res) => setState("appointments", res.data));
    };

    setModal(
      <AppointmentModal
        onClose={handleClose}
        onSuccess={handleSuccess}
        initialData={{
          id: appointment.id,
          slot_date: appointment.date,
          slot_time: appointment.slot,
          purpose: appointment.purpose,
          status: appointment.status,
          doctor: appointment.doctor,
        }}
      />
    );
  }

  return {
    deleteAppointment,
    editAppointment,
    modal,
  };
}
