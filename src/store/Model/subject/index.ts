type Message = {
  type: string;
  value: string;
};

export type SubjectState = {
  message: Message;
  subjects: string[];
  querySubjects: string[];
  shortSubjects: any;
  queryString: string;
  subject: Object;
  loading: boolean;

};
