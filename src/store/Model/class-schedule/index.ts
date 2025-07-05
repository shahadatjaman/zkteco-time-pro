type Message = {
  type: string;
  value: string;
};

type Pagination = {
  currentPage: number;
  size: number;
};
export type ClassScheduleState = {
  message: Message;
  schedules: string[];
  total: number;
  pagination: Pagination;
  querySchedules: string[];
  queryString: string;
  printableItems: any[];
  schedule: Object;
  loading: boolean;
};
