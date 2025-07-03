import type { JSX } from "react";

function DoctorOption({ doc }: { doc: string }): JSX.Element {
  return (
    <div className="doctor-option" style={{ borderBottom: "1px solid black" }}>
      {doc}
    </div>
  );
}

export default DoctorOption;
