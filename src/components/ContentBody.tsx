import AppointmentList from "./AppointmentList";
import AppointmentForm from "./Form";

function ContentBody() {
  return (
    <div className="flex flex-wrap justify-between px-4 md:px-8 pb-20 lg:px-12 bg-black">
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}

export default ContentBody;
