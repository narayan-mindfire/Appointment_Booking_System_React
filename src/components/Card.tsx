import type { Appointment } from "../types";
import { useAppointmentActions } from "../hooks/useAppointmentActions";

function Card({ app }: { app: Appointment }) {
  const { deleteAppointment, editAppointment, modal } = useAppointmentActions();

  return (
    <>
      <div className="appointment-card card-content">
        <div className="header-section">
          <h3 className="patient-name">{app.name}</h3>
          <p className="doctorEle-info">
            <span className="doctorEle-name">
              <i className="fa-solid fa-stethoscope"></i> {app.doctor}
            </span>
          </p>
        </div>
        <p className="purpose-info">{app.purpose}</p>
        <div className="details-section">
          <div className="detail-item">
            <span className="detail-label">
              <i className="fa-solid fa-calendar-days"></i>
            </span>
            <span className="detail-value">{app.date}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">
              <i className="fa-solid fa-clock"></i>
            </span>
            <span className="detail-value">{app.slot}</span>
          </div>
        </div>
        <div className="card-buttons">
          <button className="edit" onClick={() => editAppointment(app)}>
            Edit
          </button>
          <button className="delete" onClick={() => deleteAppointment(app.id)}>
            Delete
          </button>
        </div>
      </div>

      {modal}
    </>
  );
}

export default Card;
