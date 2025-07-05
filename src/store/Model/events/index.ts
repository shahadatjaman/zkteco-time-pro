export type CalendarProps = {
  _id: string;
  name: string;
  description?: string;
  timezone: string;
  color: string;
  calendarType: string;
  publishOnWebsite: boolean;
  checked: boolean;
};

type Event = {
  id: string;
  title: string;
  start: any;
  end: any;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  isAllDay?: boolean;
  offDaysShifts?: string[];
  recurrence?: string;
  category: string;
  description?: string;
  location?: string;
  attendees?: string[];
};

type Message = {
  type: string;
  value: string;
};

export type EventState = {
  message: Message;
  events: Event[];
  allEvents: Event[];
  calendars: CalendarProps[];
};
