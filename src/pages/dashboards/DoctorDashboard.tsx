import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInterceptor";
import type { Appointment } from "../../types";
import { logout } from "../../api/logoutUser";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import AppointmentList from "../../components/AppointmentList";
import { useAppContext } from "../../context/app.context";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setState } = useAppContext();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("appointments fetched");
        const res = await axiosInstance.get("/appointments/me");
        console.log(res);
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
          <Button onClick={() => navigate("/profile")} variant="default">
            Profile
          </Button>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Your Appointments</h2>

      {loading ? (
        <p className="text-gray-600">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <AppointmentList user="doctor" />
      )}
    </div>
  );
};

export default DoctorDashboard;
