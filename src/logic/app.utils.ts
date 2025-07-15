export function isOld(date: string, time: string): boolean {
  if (!date || !time) return false;

  // Combine date and time into one string
  const combined = new Date(`${date}T${time}:00`);

  // Compare with current time
  return combined.getTime() < new Date().getTime();
}
