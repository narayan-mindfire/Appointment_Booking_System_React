import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Counter from "./components/Counter";
import ContentBody from "./components/ContentBody";
import Login from "./pages/Login";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import PatientDashboard from "./pages/dashboards/PatientDashboard";
import "./App.css";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="app">
        <h1 className="bg-black text-center text-4xl text-white py-7">
          Appointment Booking System
        </h1>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* // fallback */}
          <Route
            path="/"
            element={
              <>
                <div id="counter-container">
                  <Counter />
                </div>
                <ContentBody />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
