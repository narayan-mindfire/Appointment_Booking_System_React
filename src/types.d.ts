export interface Appointment {
  id: number;
  name: string;
  date: string;   
  doctor: string;
  slot: string;
  purpose: string;
  status: string;
}

export type EditingAppointmentId = number | null

export type SortAppointmentsBy = string | null 

export type IsGridSelected = boolean

export interface State {
    editingAppointmentId: EditingAppointmentId,
    sortAppointmentsBy: SortAppointmentsBy,
    isGridSelected: IsGridSelected,
    appointments: Appointment[],
    formFields?: Omit<Appointment, "id"> | null;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user_type: "doctor" | "patient";
  createdAt: string;
  updatedAt: string;
  specialization?: string;
  bio?: string;
  gender?: string;
  date_of_birth?: string;
}