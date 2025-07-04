import AppointmentList from "./AppointmentList";
import AppointmentForm from "./Form";

function ContentBody() {
  return (
    <div className="flex flex-wrap justify-between p-[30px] bg-black">
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}

export default ContentBody;
