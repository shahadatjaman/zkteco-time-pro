export interface LogEntryType {
  userId: string;
  avatar: string;
  checkInAt?: string;
  checkOutAt?: string;
  status: string;
  role: string;
  verifyType?: 'CARD' | 'FINGER';
}
