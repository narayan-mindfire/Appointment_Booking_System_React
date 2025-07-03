import React, { useEffect, useState } from "react";
import { docs, validationConfig } from "../const/const";
import { validationService } from "../services/validation.service";
import stateService from "../services/app.state";

const Toast = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "warning" | "error";
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  if (!visible) return null;

  const backgroundColor = {
    success: "green",
    warning: "orange",
    error: "red",
  }[type];

  return (
    <div
      style={{
        backgroundColor,
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
    >
      {message}
    </div>
  );
};

const AppointmentForm = () => {
  const validators = validationService();
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
  const [filteredDocs, setFilteredDocs] = useState<string[]>(docs);
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
        if (validate && !validate(fields[key as keyof typeof fields], key)) {
          tempErrors[key] = `${key} is invalid.`;
          valid = false;
          break;
        }
      }
    }

    setErrors(tempErrors);
    return valid;
  };

  const updateAvailableSlots = () => {
    setSlots(["10:00", "11:00", "12:00", "1:00"]); // Dummy values
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

    const updatedAppointments = [...stateService.getState("appointments")];
    const editingId = stateService.getState("editingAppointmentId");

    if (editingId) {
      const idx = updatedAppointments.findIndex((a) => a.id === editingId);
      if (idx !== -1) {
        updatedAppointments[idx] = { id: editingId, ...fields };
        stateService.setState("editingAppointmentId", null);
      }
    } else {
      updatedAppointments.push({ id: Date.now(), ...fields });
    }

    stateService.setState("appointments", updatedAppointments);
    setToast({ message: "Appointment successfully booked!", type: "success" });
    resetForm();
  };

  useEffect(() => {
    updateAvailableSlots();
  }, [fields.date, fields.doctor]);

  return (
    <div className="form-container">
      <h2>Appointment Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(fields).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            {key === "slot" ? (
              <select id={key} value={value} onChange={handleInputChange}>
                <option value="">Select a time slot</option>
                {slots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={key}
                type={key === "date" ? "date" : "text"}
                value={value}
                onChange={handleInputChange}
              />
            )}
            {errors[key] && (
              <span className="error-message">{errors[key]}</span>
            )}
          </div>
        ))}

        {fields.doctor && (
          <div className="doc-options">
            {filteredDocs.map((doc) => (
              <div
                key={doc}
                className="doctor-option"
                onClick={() => setFields((prev) => ({ ...prev, doctor: doc }))}
              >
                {doc}
              </div>
            ))}
          </div>
        )}

        <button type="submit">Book Appointment</button>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default AppointmentForm;
