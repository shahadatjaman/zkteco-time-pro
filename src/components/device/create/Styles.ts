'use client';

import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  padding: 1.875rem 1.875rem 0;
`;

export const FormWrapper = styled.div``;

export const Form = styled.form`
  margin: 1rem;
`;

export const Basic = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
  grid-row-gap: 40px;
  margin-bottom: 2.5rem;
  margin-top: 1.8rem;
`;

export const ScheduleTime = styled(Basic)``;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const CountTime = styled.div`
  margin-bottom: 1rem;
`;

export const Total = styled.h6`
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  margin-right: 8px;
  color: #808191;
`;

export const Time = styled.span`
  display: inline-block;
  background: #00800045;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
`;
