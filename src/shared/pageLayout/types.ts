import { ReactNode } from 'react';

export interface IButton {
  btnType: 'add' | 'export' | 'refresh';
  text: string;
  icon: ReactNode;
  onClick: () => void;
}
