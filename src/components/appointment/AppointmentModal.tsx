/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInterceptor";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import { slots, type Slot } from "../../const/const";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

interface FormState {
  doctor_id: string;
  slot_date: string;
  slot_time: Slot | "";
  purpose: string;
}

const AppointmentModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [form, setForm] = useState<FormState>({
    doctor_id: "",
    slot_date: "",
    slot_time: "",
    purpose: "",
  });
  const [errors, setErrors] = useState<{ [K in keyof FormState]?: string }>({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/users", { params: { user_type: "doctor" } })
      .then((res) => setDoctors(res.data))
      .catch(() => setApiError("Failed to load doctors"));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const tempErrors: { [K in keyof FormState]?: string } = {};
    if (!form.doctor_id) tempErrors.doctor_id = "Please select a doctor";
    if (!form.slot_date) tempErrors.slot_date = "Please select a date";
    if (!form.slot_time) tempErrors.slot_time = "Please select a time";
    if (!form.purpose.trim()) tempErrors.purpose = "Purpose is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axiosInstance.post("/appointments", form);
      onSuccess();
      onClose();
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>

        <div>
          <label htmlFor="doctor_id" className="block text-sm font-medium mb-1">
            Doctor
          </label>
          <select
            id="doctor_id"
            name="doctor_id"
            value={form.doctor_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                Dr. {doc.first_name} {doc.last_name} ({doc.specialization})
              </option>
            ))}
          </select>
          {errors.doctor_id && (
            <p className="text-red-500 text-xs mt-1">{errors.doctor_id}</p>
          )}
        </div>

        <Input
          label="Date"
          name="slot_date"
          type="date"
          value={form.slot_date}
          onChange={handleChange}
          error={errors.slot_date}
          min={new Date().toISOString().split("T")[0]}
        />

        <div>
          <label htmlFor="slot_time" className="block text-sm font-medium mb-1">
            Time
          </label>
          <select
            id="slot_time"
            name="slot_time"
            value={form.slot_time}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Time</option>
            {slots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.slot_time && (
            <p className="text-red-500 text-xs mt-1">{errors.slot_time}</p>
          )}
        </div>

        <Input
          label="Purpose"
          name="purpose"
          value={form.purpose}
          onChange={handleChange}
          error={errors.purpose}
        />

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" type="submit">
            Book
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AppointmentModal;
