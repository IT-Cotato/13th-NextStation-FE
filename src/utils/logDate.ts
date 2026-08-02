export function formatAcquiredAtToDisplayDate(acquiredAt: string) {
  const [year, month, day] = acquiredAt.split("T")[0].split("-");

  return `${year}.${month}.${day}`;
}

export function getDisplayDateParts(date: string) {
  const [year, month, day] = date.split(".").map(Number);

  return { year, month, day };
}
