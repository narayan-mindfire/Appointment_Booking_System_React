import type { Appointment } from "../types";
import { useAppointmentActions } from "../hooks/useAppointmentActions";

interface CardProps {
  app: Appointment;
  isEditing: boolean;
}

const Card: React.FC<CardProps> = ({ app, isEditing }) => {
  const { deleteAppointment, editAppointment, modal } = useAppointmentActions();

  return (
    <>
      <div
        className={`flex shadow-xl flex-col w-full sm:w-1/2 md:w-8/20 lg:w-2/5 p-5 rounded-[10px] border border-gray-300 ${
          isEditing ? "bg-gray-200 border-black border-2" : "hover:bg-gray-100"
        }`}
      >
        <div className="mb-4">
          <h3
            title="patient name"
            className="text-2xl font-bold text-black mt-0"
          >
            {app.name}
          </h3>
          <p title="doctor" className="text-15 font-normal text-gray-700 m-0">
            <span className="font-semibold text-black">
              <i className="fa-solid fa-stethoscope mr-1"></i> {app.doctor}
            </span>
          </p>
        </div>

        <p
          title="purpose"
          className="text-sm text-gray-600 my-4 leading-relaxed"
        >
          {app.purpose}
        </p>

        <div className="flex justify-between items-end pt-4 mt-4">
          <div title="date" className="text-left flex-1">
            <span className="block text-xs text-gray-500 mb-1">
              <i className="fa-solid fa-calendar-days mr-1"></i>
            </span>
            <span className="text-lg font-semibold">{app.date}</span>
          </div>
          <div title="slot" className="text-right flex-1">
            <span className="block text-xs text-gray-500 mb-1">
              <i className="fa-solid fa-clock mr-1"></i>
            </span>
            <span className="text-lg font-semibold">{app.slot}</span>
          </div>
        </div>

        <div className="flex justify-evenly gap-2 mt-4 pt-4">
          <button
            className="flex-1 px-3 py-2 text-15px font-medium rounded-md bg-black text-white border border-black hover:bg-gray-800"
            onClick={() => editAppointment(app)}
          >
            Edit
          </button>
          <button
            className="flex-1 px-3 py-2 text-15 font-medium rounded-md bg-white text-black border border-gray-400 hover:bg-red-400 hover:border-gray-600"
            onClick={() => deleteAppointment(app.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {modal}
    </>
  );
};

export default Card;
