import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInterceptor";
import type { Appointment } from "../../types";
import AppointmentList from "../../components/AppointmentList";
import { useAppContext } from "../../context/app.context";
import UserMenu from "../../components/Profile/UserMenu";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { setState } = useAppContext();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/appointments/me");
        setState("appointments", res.data);
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-12 py-8">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <div className="flex gap-3">
          <UserMenu />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Your Appointments</h2>

      {loading ? (
        <p className="text-gray-600">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <AppointmentList />
      )}
    </div>
  );
};

export default DoctorDashboard;
