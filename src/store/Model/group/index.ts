type Message = {
  type: string;
  value: string;
};

export type GroupState = {
  message: Message;
  items: string[];
  shortItems: string[];
  queryItems: string[];
  queryString: string;
  item: Object;
  loading: boolean;
};
