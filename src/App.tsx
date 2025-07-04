// import { useEffect } from "react";
// import { useAppContext } from "./context/app.context";
import Toast from "./components/Toast";
import Counter from "./components/Counter";
import ContentBody from "./components/ContentBody";
import "./App.css";

function App() {
  // const { state } = useAppContext();

  // useEffect(() => {
  //   if (state.editingAppointmentId) {
  //     editAppointment(state.editingAppointmentId);
  //   }
  // }, [state.editingAppointmentId]);

  return (
    <div className="app">
      <Toast message={""} visible={false} />
      <h1 className="main-heading">Appointment Booking System</h1>
      <div id="counter-container">
        <Counter />
      </div>
      <ContentBody />
    </div>
  );
}

export default App;
