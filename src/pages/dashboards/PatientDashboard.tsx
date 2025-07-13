import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInterceptor";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { logout } from "../../api/logoutUser";
import AppointmentModal from "../../components/appointment/AppointmentModal";
import { useAppContext } from "../../context/app.context";

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { state, setState } = useAppContext();
  const appointments = state.appointments;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axiosInstance.get("/appointments/me");
        setState("appointments", res.data);
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
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <div className="flex gap-3">
          <Button onClick={() => setShowModal(true)} variant="default">
            + Create Appointment
          </Button>

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
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {appointments.map((appt) => (
            <Card key={appt.id} app={appt} readonly={false} />
          ))}
        </div>
      )}
      {showModal && (
        <AppointmentModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setLoading(true);
            axiosInstance
              .get("/appointments/me")
              .then((res) => setState("appointments", res.data))
              .finally(() => setLoading(false));
          }}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
