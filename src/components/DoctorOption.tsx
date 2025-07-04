import type { JSX } from "react";

function DoctorOption({ doc }: { doc: string }): JSX.Element {
  return <div className="cursor-pointer px-2 py-1 text-17px">{doc}</div>;
}

export default DoctorOption;
