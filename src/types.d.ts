export interface Appointment {
  id: number;
  name: string;
  date: string;   
  doctor: string;
  slot: string;
  purpose: string;
  status: string;
}

export type Slot =
  | "09:00 AM"
  | "10:00 AM"
  | "11:00 AM"
  | "12:00 PM"
  | "01:00 PM"
  | "02:00 PM"
  | "03:00 PM"
  | "04:00 PM";


export type EditingAppointmentId = number | null

export type SortAppointmentsBy = string | null 

export type IsGridSelected = boolean

export interface State {
    editingAppointmentId: EditingAppointmentId,
    sortAppointmentsBy: SortAppointmentsBy,
    isGridSelected: IsGridSelected,
    appointments: Appointment[],
    formFields?: Omit<Appointment, "id"| "email"> | null;
    userType: "doctor" | "patient" | "admin" | null
    token: string | null;
    userName: string | null;
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