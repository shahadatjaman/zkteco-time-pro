import { JSX } from 'react';

export interface Employee {
  id: number;
  name: string;
  shift: string;
  status: 'on-time' | 'late' | 'absent';
}

export interface Log {
  id: number;
  name: string;
  timestamp: string;
  status: string;
}

export interface Holiday {
  date: string;
  name: string;
}

export interface SummaryCardProps {
  title: string;
  value: number;
  color: string;
  icon: JSX.Element;
}
