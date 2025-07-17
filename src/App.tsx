import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import PatientDashboard from "./pages/dashboards/PatientDashboard";
import "./App.css";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { NotFound } from "./pages/Notfound";
import { Unauthorized } from "./pages/Unauthorized";
import ProtectedRoute from "./services/ProtectRoute";
import { Unauthenticated } from "./pages/Unauthenticated";

function App() {
  return (
    <Router>
      <div className="app">
        <h1 className="bg-black text-center text-4xl text-white py-7">
          Appointment Booking System
        </h1>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/doctor"
            element={
              <ProtectedRoute role="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/unauthenticated" element={<Unauthenticated />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
