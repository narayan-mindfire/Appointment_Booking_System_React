import type { Appointment, SortAppointmentsBy } from "../types";

/**
 * Sort appointments based on a given criteria.
 * @param {Array} appointments - The list of appointments to sort.
 * @param {string} sortBy - The sorting key 
 * @returns {Array} - Sorted appointment array.
 */
function sortAppointments(appointments : Appointment[], sortBy : SortAppointmentsBy):Appointment[] {
  const sorted : Appointment[]= [...appointments]; 

  switch (sortBy) {
    case "date":
      sorted.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case "dateR":
      sorted.sort((a, b) => b.date.localeCompare(a.date));
      break;
    case "doctor":
      sorted.sort((a, b) => a.doctor.toLowerCase().localeCompare(b.doctor.toLowerCase()));
      break;
    case "doctorR":
      sorted.sort((a, b) => b.doctor.toLowerCase().localeCompare(a.doctor.toLowerCase()));
      break;
    case "name":
      sorted.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      break;
    case "nameR":
      sorted.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
      break;
  }

  return sorted;
}

export { sortAppointments };
