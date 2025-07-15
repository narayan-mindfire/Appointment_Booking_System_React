/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInterceptor";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import { slots, type Slot } from "../../const/const";
import { isOld } from "../../logic/app.utils";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: {
    id: number;
    slot_date: string;
    slot_time: string;
    purpose: string;
    status: string;
    doctor: string;
  };
};

interface FormState {
  doctor_id?: string;
  slot_date: string;
  slot_time: string;
  purpose: string;
  status: string;
}

const AppointmentModal: React.FC<Props> = ({
  onClose,
  onSuccess,
  initialData,
}) => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  const [form, setForm] = useState<FormState>({
    slot_date: initialData?.slot_date || "",
    slot_time: initialData?.slot_time || "",
    purpose: initialData?.purpose || "",
    status: initialData?.status || "Pending",
  });
  const [errors, setErrors] = useState<{ [K in keyof FormState]?: string }>({});
  const [apiError, setApiError] = useState("");
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);

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

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!form.doctor_id || !form.slot_date) return;
      try {
        const res = await axiosInstance.get("/slots/doctor", {
          params: {
            doctor_id: form.doctor_id,
            slot_date: form.slot_date,
          },
        });
        setBookedSlots(res.data);
      } catch (err) {
        console.error("Failed to fetch booked slots", err);
      }
    };

    fetchBookedSlots();
  }, [form.doctor_id, form.slot_date]);

  const validate = () => {
    const tempErrors: { [K in keyof FormState]?: string } = {};
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
      if (initialData) {
        await axiosInstance.put(`/appointments/${initialData.id}`, form);
      } else {
        await axiosInstance.post("/appointments", {
          ...form,
          doctor_id: form.doctor_id,
        });
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Appointment" : "Book Appointment"}
        </h2>

        <div className="relative">
          <label
            htmlFor="doctor_search"
            className="block text-sm font-medium mb-1"
          >
            Doctor
          </label>
          <input
            type="text"
            id="doctor_search"
            placeholder="Search doctor by name..."
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={
              form.doctor_id
                ? doctors.find((d) => d._id === form.doctor_id)?.first_name +
                  " " +
                  doctors.find((d) => d._id === form.doctor_id)?.last_name
                : searchText
            }
            onChange={(e) => {
              setSearchText(e.target.value);
              setForm((prev) => ({ ...prev, doctor_id: "" }));
              const query = e.target.value.toLowerCase();
              const filtered = doctors.filter((doc) =>
                `${doc.first_name} ${doc.last_name}`
                  .toLowerCase()
                  .includes(query)
              );
              setFilteredDoctors(filtered);
            }}
          />
          {filteredDoctors.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border mt-1 rounded shadow-md max-h-60 overflow-auto">
              {filteredDoctors.map((doc) => (
                <li
                  key={doc._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, doctor_id: doc._id }));
                    setSearchText(`Dr. ${doc.first_name} ${doc.last_name}`);
                    setFilteredDoctors([]);
                  }}
                >
                  Dr. {doc.first_name} {doc.last_name} ({doc.specialization})
                </li>
              ))}
            </ul>
          )}
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
              <option
                key={time}
                value={time}
                disabled={
                  bookedSlots.includes(time) ||
                  (form.slot_date ? isOld(form.slot_date, time) : true)
                }
                className={bookedSlots.includes(time) ? "text-gray-400" : ""}
              >
                {time} {bookedSlots.includes(time) ? "(Booked)" : ""}
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
