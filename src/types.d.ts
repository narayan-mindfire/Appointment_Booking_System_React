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