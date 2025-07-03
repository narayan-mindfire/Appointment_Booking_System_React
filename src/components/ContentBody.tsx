import AppointmentList from "./AppointmentList";
import AppointmentForm from "./Form";

function ContentBody() {
  return (
    <div className="content">
      <AppointmentForm />
      <div id="appointment-list-container">
        <AppointmentList />
      </div>
    </div>
  );
}

export default ContentBody;
