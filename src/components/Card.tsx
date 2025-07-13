import type { Appointment } from "../types";
import { useAppointmentActions } from "../hooks/useAppointmentActions";
import Button from "./Button";

interface CardProps {
  app: Appointment;
  isEditing?: boolean;
  readonly: boolean;
}

const Card: React.FC<CardProps> = ({ app, isEditing, readonly }) => {
  const { deleteAppointment, editAppointment, modal } = useAppointmentActions();

  return (
    <>
      <div
        className={`flex shadow-xl flex-col w-full max-w-md mx-auto p-5 rounded-[10px] border border-gray-300 ${
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
              <span className="text-lg font-semibold">{app.date}</span>
            </span>
          </div>
          <div title="slot" className="text-right flex-1">
            <span className="block text-xs text-gray-500 mb-1">
              <i className="fa-solid fa-clock mr-1"></i>
              <span className="text-lg font-semibold">{app.slot}</span>
            </span>
          </div>
        </div>

        {!readonly && (
          <div className="flex justify-evenly gap-2 mt-4 pt-4">
            <Button
              variant="default"
              children={"Edit"}
              onClick={() => editAppointment(app)}
              className="w-full"
            />
            <Button
              variant="danger"
              children={"Delete"}
              onClick={() => deleteAppointment(app.id)}
              className="w-full"
            />
          </div>
        )}
      </div>

      {modal}
    </>
  );
};

export default Card;
