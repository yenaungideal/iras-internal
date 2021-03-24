export function getDateFromStr(dateStr: any) {
  if (!dateStr) {
    return '';
  }

  const date = new Date(dateStr);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
}
