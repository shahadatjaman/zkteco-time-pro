import { Department } from '../../dep/items/InfiniteTable';

export interface UserEntryType {
  _id: string;
  userId: string;
  firstname: string;
  lastname: string;
  avatar: string;
  gender: string;
  blood: string;
  religion: string;
  dept: Department;
  phone: string;
}
