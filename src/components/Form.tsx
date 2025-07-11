import React, { useEffect, useState } from "react";
import { allSlots, docs, validationConfig } from "../const/const";
import { validationService } from "../services/validation.service";
import { useAppContext } from "../context/app.context";
import DoctorOption from "./DoctorOption";
import type { Appointment } from "../types";
import Toast from "./Toast";

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
    <div className="mt-20 bg-white p-6 rounded-lg shadow-md w-full md:w-[35%] max-h-[110vh] overflow-y-auto">
      <h2 className="text-2xl mb-3">Appointment Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-base font-semibold mb-1 mt-1"
          >
            Name
            {validationConfig.name?.includes("isRequired") && (
              <span id="required-name" className="text-red-500 font-bold">
                *
              </span>
            )}
            :
          </label>
          <input
            id="name"
            type="text"
            value={fields.name}
            onChange={handleInputChange}
            className="w-full p-2 text-base border border-gray-300 rounded-md mt-3 mb-3 focus:outline-none focus:border-black focus:border-2"
          />
          {errors.name && (
            <span className="text-red-500 text-sm -mt-2 mb-3 block">
              {errors.name}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-base font-semibold mb-1 mt-1"
          >
            Email
            {validationConfig.email?.includes("isRequired") && (
              <span id="required-email" className="text-red-500 font-bold">
                *
              </span>
            )}
            :
          </label>
          <input
            id="email"
            type="text"
            value={fields.email}
            onChange={handleInputChange}
            className="w-full p-2 text-base border border-gray-300 rounded-md mt-3 mb-3 focus:outline-none focus:border-black focus:border-2"
          />
          {errors.email && (
            <span className="text-red-500 text-sm -mt-2 mb-3 block">
              {errors.email}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-base font-semibold mb-1 mt-1"
          >
            Date
            {validationConfig.date?.includes("isRequired") && (
              <span id="required-date" className="text-red-500 font-bold">
                *
              </span>
            )}
            :
          </label>
          <input
            id="date"
            type="date"
            value={fields.date}
            onChange={handleInputChange}
            className="w-full p-2 text-base border border-gray-300 rounded-md mt-3 mb-3 focus:outline-none focus:border-black focus:border-2"
          />
          {errors.date && (
            <span className="text-red-500 text-sm -mt-2 mb-3 block">
              {errors.date}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="doctor"
            className="block text-base font-semibold mb-1 mt-1"
          >
            Doctor
            {validationConfig.doctor?.includes("isRequired") && (
              <span id="required-doctor" className="text-red-500 font-bold">
                *
              </span>
            )}
            :
          </label>
          <input
            id="doctor"
            type="text"
            value={fields.doctor}
            onChange={handleInputChange}
            className="w-full p-2 text-base border border-gray-300 rounded-md mt-3 mb-3 focus:outline-none focus:border-black focus:border-2"
          />
          {errors.doctor && (
            <span className="text-red-500 text-sm -mt-2 mb-3 block">
              {errors.doctor}
            </span>
          )}
        </div>
        {fields.doctor && filteredDocs.length > 0 && (
          <div className="max-h-[200px] relative mt-1 bg-white overflow-y-auto font-light border border-black rounded-md block">
            {filteredDocs.map((doc) => (
              <div
                key={doc}
                className="p-1.5 text-base border-b border-gray-700 cursor-pointer hover:bg-gray-400"
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
          <label
            htmlFor="slot"
            className="block text-base font-semibold mb-1 mt-1"
          >
            Slot
            {validationConfig.slot?.includes("isRequired") && (
              <span id="required-slot" className="text-red-500 font-bold">
                *
              </span>
            )}
            :
          </label>
          <select
            id="slot"
            value={fields.slot}
            onChange={handleInputChange}
            className="w-full p-2 text-base border border-gray-300 rounded-md mt-3 mb-3 focus:outline-none focus:border-black focus:border-2"
          >
            <option value="">Select a time slot</option>
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.slot && (
            <span className="text-red-500 text-sm -mt-2 mb-3 block">
              {errors.slot}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="purpose"
            className="block text-base font-semibold mb-1 mt-1"
          >
            Purpose
            {validationConfig.purpose?.includes("isRequired") && (
              <span id="required-purpose" className="text-red-500 font-bold">
                *
              </span>
            )}
            :
          </label>
          <input
            id="purpose"
            type="text"
            value={fields.purpose}
            onChange={handleInputChange}
            className="w-full p-2 text-base border border-gray-300 rounded-md mt-3 mb-3 focus:outline-none focus:border-black focus:border-2"
          />
          {errors.purpose && (
            <span className="text-red-500 text-sm -mt-2 mb-3 block">
              {errors.purpose}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full h-11 bg-black text-white text-xl rounded-lg hover:bg-gray-700"
        >
          {state.editingAppointmentId ? "Edit Appointment" : "Book Appointment"}
        </button>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default AppointmentForm;
