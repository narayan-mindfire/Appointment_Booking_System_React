import React, { useEffect, useState } from "react";
import { docs, validationConfig } from "../const/const";
import { validationService } from "../services/validation.service";
import { useAppContext } from "../context/app.context";
import DoctorOption from "./DoctorOption";
import type { Appointment } from "../types";
import Toast from "./Toast";

const allSlots = ["10:00", "11:00", "12:00", "1:00"];

const AppointmentForm = () => {
  const validators = validationService();
  const { state, setState } = useAppContext();
  const [fields, setFields] = useState({
    name: "",
    email: "",
    date: "",
    doctor: "",
    slot: "",
    purpose: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [slots, setSlots] = useState<string[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const resetForm = () => {
    setFields({
      name: "",
      email: "",
      date: "",
      doctor: "",
      slot: "",
      purpose: "",
    });
    setErrors({});
    setFilteredDocs([]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFields((prev) => ({ ...prev, [id]: value }));

    if (id === "doctor") {
      console.log("doctor field");
      const filtered = docs.filter((doc) =>
        doc.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDocs(filtered);
    }
  };

  const validateFields = () => {
    let valid = true;
    const tempErrors: { [k: string]: string } = {};

    for (const key in fields) {
      const rules = validationConfig[key] || [];
      for (const rule of rules) {
        const validate = validators[rule];
        if (validate && !validate(fields[key as keyof typeof fields])) {
          tempErrors[key] = `${key} is invalid.`;
          valid = false;
          break;
        }
      }
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      setToast({
        message: "Please input correct data and try again",
        type: "error",
      });
      return;
    }

    const updatedAppointments = [...state.appointments];

    if (state.editingAppointmentId) {
      const idx = updatedAppointments.findIndex(
        (a) => a.id === state.editingAppointmentId
      );
      if (idx !== -1) {
        updatedAppointments[idx] = {
          id: state.editingAppointmentId,
          ...fields,
        };
      }
    } else {
      updatedAppointments.push({ id: Date.now(), ...fields });
    }

    setState("appointments", updatedAppointments);
    setState("editingAppointmentId", null);
    setState("formFields", null);
    setToast({ message: "Appointment successfully booked!", type: "success" });
    resetForm();
  };

  useEffect(() => {
    if (state.formFields) {
      setFields(state.formFields);
      setErrors({});
    }
  }, [state.formFields]);

  useEffect(() => {
    const { date, doctor } = fields;

    if (!date || !doctor) {
      setSlots([]);
      return;
    }

    const today = new Date();
    const selectedDate = new Date(date);
    const isToday = today.toDateString() === selectedDate.toDateString();

    const bookedSlots = state.appointments
      .filter(
        (appointment: Appointment) =>
          appointment.date === date &&
          appointment.doctor === doctor &&
          appointment.id !== state.editingAppointmentId
      )
      .map((appointment: Appointment) => appointment.slot);

    const availableSlots = allSlots.filter((slot) => {
      const slotHour = Number(slot.split(":"[0]));
      const isBooked = bookedSlots.includes(slot);
      const isPastToday = isToday && slotHour <= today.getHours();
      return !isBooked && !isPastToday;
    });

    setSlots(availableSlots);
  }, [
    fields,
    fields.date,
    fields.doctor,
    state.appointments,
    state.editingAppointmentId,
  ]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const minDate = `${year}-${month}-${day}`;

    if (state.editingAppointmentId) {
      const appointmentToEdit = state.appointments.find(
        (a) => a.id === state.editingAppointmentId
      );
      if (appointmentToEdit) {
        setFields({
          name: appointmentToEdit.name,
          email: appointmentToEdit.email,
          date: appointmentToEdit.date,
          doctor: appointmentToEdit.doctor,
          slot: appointmentToEdit.slot,
          purpose: appointmentToEdit.purpose,
        });
      }
    }

    const input = document.getElementById("date") as HTMLInputElement | null;
    if (input) input.min = minDate;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form-container">
      <h2>Appointment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form-label">
            Name
            {validationConfig.name?.includes("isRequired") && (
              <span id="required-name">*</span>
            )}
            :
          </label>
          <input
            id="name"
            type="text"
            value={fields.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email
            {validationConfig.email?.includes("isRequired") && (
              <span id="required-email">*</span>
            )}
            :
          </label>
          <input
            id="email"
            type="text"
            value={fields.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div>
          <label htmlFor="date" className="form-label">
            Date
            {validationConfig.date?.includes("isRequired") && (
              <span id="required-date">*</span>
            )}
            :
          </label>
          <input
            id="date"
            type="date"
            value={fields.date}
            onChange={handleInputChange}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>
        <div>
          <label htmlFor="doctor" className="form-label">
            Doctor
            {validationConfig.doctor?.includes("isRequired") && (
              <span id="required-doctor">*</span>
            )}
            :
          </label>
          <input
            id="doctor"
            type="text"
            value={fields.doctor}
            onChange={handleInputChange}
          />
          {errors.doctor && (
            <span className="error-message">{errors.doctor}</span>
          )}
        </div>
        {fields.doctor && filteredDocs.length > 0 && (
          <div className="doc-options" style={{ display: "block" }}>
            {filteredDocs.map((doc) => (
              <div
                key={doc}
                className="doctor-option"
                onClick={() => {
                  setFields((prev) => ({ ...prev, doctor: doc }));
                  setFilteredDocs([]);
                }}
              >
                <DoctorOption doc={doc} />
              </div>
            ))}
          </div>
        )}
        <div>
          <label htmlFor="slot" className="form-label">
            Slot
            {validationConfig.slot?.includes("isRequired") && (
              <span id="required-slot">*</span>
            )}
            :
          </label>
          <select id="slot" value={fields.slot} onChange={handleInputChange}>
            <option value="">Select a time slot</option>
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.slot && <span className="error-message">{errors.slot}</span>}
        </div>
        <div>
          <label htmlFor="purpose" className="form-label">
            Purpose
            {validationConfig.purpose?.includes("isRequired") && (
              <span id="required-purpose">*</span>
            )}
            :
          </label>
          <input
            id="purpose"
            type="text"
            value={fields.purpose}
            onChange={handleInputChange}
          />
          {errors.purpose && (
            <span className="error-message">{errors.purpose}</span>
          )}
        </div>
        <button type="submit" className="submit-button">
          {state.editingAppointmentId ? "Edit Appointment" : "Book Appointment"}
        </button>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default AppointmentForm;
