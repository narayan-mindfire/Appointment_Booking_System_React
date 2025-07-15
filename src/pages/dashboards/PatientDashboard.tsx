import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInterceptor";
import Button from "../../components/Button";
import AppointmentModal from "../../components/appointment/AppointmentModal";
import { useAppContext } from "../../context/app.context";
import AppointmentList from "../../components/AppointmentList";
import UserMenu from "../../components/Profile/UserMenu";

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { state, setState } = useAppContext();

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
          <UserMenu />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Appointments</h2>
        <Button
          onClick={() => setShowModal(true)}
          variant="default"
          className="h-[50%]"
        >
          + Create Appointment
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading appointments...</p>
      ) : state.appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <AppointmentList />
      )}

      {/* Modal */}
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
