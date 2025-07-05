type Message = {
  type: string;
  value: string;
};

export type ClassState = {
  message: Message;
  classes: string[];
  shortClasses: any;
  queryclasses: string[];
  shortClassOptions: any;
  queryString: string;
  aClass: Object;
  loading: boolean;
};
