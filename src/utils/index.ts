function convertDateFormat(timestamp: string): string {
  if (timestamp) {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const formattedDate: string = date.toLocaleDateString('en-US', options);
    return formattedDate;
  } else {
    return '';
  }
}

export default convertDateFormat;

export function convertTo12HourFormat(time: string): string {
  const [hourStr, minute] = time.split(':');
  let hour = parseInt(hourStr, 10);

  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // Convert 0 to 12 for 12 AM

  const formattedHour = hour.toString().padStart(2, '0');
  return `${formattedHour}:${minute} ${ampm}`;
}

export function getCountdownString(targetTimeStr: string): string {
  const target = new Date(targetTimeStr).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return `Time reached at ${targetTimeStr}`;
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s left until ${targetTimeStr}`;
}
