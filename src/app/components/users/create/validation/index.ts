import { FormErrors, FormValues } from '../interface';

export const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  const validateRequiredField = (fieldName: keyof FormValues, errorMessage: string) => {
    if (!values[fieldName]) {
      errors[fieldName] = errorMessage;
    }

    // if (!validateIPv4(values[fieldName]) && fieldName === 'deviceIp') {
    //   errors[fieldName] = 'IIP address must be valid';
    // }

    // if (!validatePort(values[fieldName].trim()) && fieldName === 'devicePort') {
    //   errors[fieldName] = 'Port number must be valid';
    // }
  };

  validateRequiredField('deviceName', 'Device name is required');
  validateRequiredField('deviceIp', 'Device IP Address is required');
  validateRequiredField('devicePort', 'Device Port is required');

  return errors;
};
