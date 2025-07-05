'use client';

import { styled } from 'styled-components';

interface IStaffProps {
  status: string;
}

export const Status = styled.span<IStaffProps>`
  min-width: auto;
  float: none;
  font-size: 13px;
  color: ${({ status }) => {
    switch (status) {
      case 'PRESENT':
        return '#198754';
      case 'SUCCESS':
        return '#198754';
      case 'ABSENT':
        return '#fd7e14';
      case 'LEAVE':
        return '#f11541';
      default:
        return '';
    }
  }};
  background-color: ${({ status }) => {
    switch (status) {
      case 'PRESENT':
        return '#19875426';
      case 'Success':
        return '#19875426';
      case 'LATE':
        return '#fd7e1426';
      case 'LEAVE':
        return '#f1154126';
      default:
        return '';
    }
  }};
  border: none;
  padding: 5px 12px;
  font-weight: 600;
  line-height: 1.2;
  border-radius: 40px;
`;
