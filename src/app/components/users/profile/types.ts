import { UserEntryType } from '../mobile/types';

export interface UserData {
  fullName: string;
  gender: string;
  bloodType: string;
  religion: string;
  dept: string;
  phoneNumber: string;
  avatar: string;
}

export interface UserDetailsModalProps {
  userData: UserEntryType;
}
