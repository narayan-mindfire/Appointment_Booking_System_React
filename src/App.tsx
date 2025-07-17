import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import PatientDashboard from "./pages/dashboards/PatientDashboard";
import "./App.css";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { NotFound } from "./pages/Notfound";

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
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
