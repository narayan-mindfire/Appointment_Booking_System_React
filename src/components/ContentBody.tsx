import AppointmentList from "./AppointmentList";
import AppointmentForm from "./Form";

function ContentBody() {
  return (
    <div className="content">
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}

export default ContentBody;
