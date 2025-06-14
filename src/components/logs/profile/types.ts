import { UserEntryType } from '../mobile/types';

export interface UserData {
  fullName: string;
  gender: string;
  bloodType: string;
  religion: string;
  role: string;
  phoneNumber: string;
  avatar: string;
}

export interface UserDetailsModalProps {
  userData: UserEntryType;
}
