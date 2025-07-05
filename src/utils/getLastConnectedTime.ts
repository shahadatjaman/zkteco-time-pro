export function getLastConnectedTime(dateInput: string): string {
  const date = new Date(dateInput);
  const now = new Date();

  // Helper to compare only date parts in BD timezone
  function isSameDay(d1: Date, d2: Date): boolean {
    const options: any = {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const d1Str = d1.toLocaleDateString('en-US', options);
    const d2Str = d2.toLocaleDateString('en-US', options);
    return d1Str === d2Str;
  }

  const isToday = isSameDay(date, now);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = isSameDay(date, yesterday);

  const timeString = date.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Dhaka',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (isToday) {
    return `Last connected at Today at ${timeString}`;
  } else if (isYesterday) {
    return `Last connected at Yesterday at ${timeString}`;
  } else {
    const dateString = date.toLocaleDateString('en-US', {
      timeZone: 'Asia/Dhaka',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return `Last connected at ${dateString} at ${timeString}`;
  }
}
