import type { Appointment } from "../types";
function Card(app: Appointment) {
  return (
    <>
      <div className="card-content">
        <div className="header-section">
          <h3 className="patient-name" title="patient">
            {app.name}
          </h3>
          <p className="doctorEle-info">
            <span className="doctorEle-name" title="doctorEle">
              <i className="fa-solid fa-stethoscope"></i> {app.doctor}
            </span>
          </p>
        </div>

        <p className="purpose-info" title="purpose">
          {app.purpose}
        </p>

        <div className="details-section">
          <div className="detail-item">
            <span className="detail-label">
              {" "}
              <i className="fa-solid fa-calendar-days" title="date"></i>
            </span>
            <span className="detail-value" title="date">
              {app.date}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label" title="time">
              <i className="fa-solid fa-clock "></i>
            </span>
            <span className="detail-value" title="time">
              {app.slot}
            </span>
          </div>
        </div>
      </div>
      <div className="card-buttons">
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
      </div>
    </>
  );
}

export default Card;
