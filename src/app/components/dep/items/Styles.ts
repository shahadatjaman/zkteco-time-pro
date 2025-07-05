'use client';

import { styled } from 'styled-components';

interface IWrapper {
  bg?: string;
}

export const Wrapper = styled.div`
  display: flex;
  div {
    margin-right: 12px;
  }
  @media print {
    display: none;
  }
`;

export const LocalButton = styled.button`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 11px 15px;
  background-color: #3d5ee1;
  border: 1px solid #3d5ee1;
  color: #fff;
  display: inline-block;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  user-select: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  svg {
    color: #fff;
  }
`;

interface IFreshButton {
  loading: boolean;
}
