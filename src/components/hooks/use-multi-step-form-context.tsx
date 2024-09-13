// multi-step-form context
import { useContext } from 'react';
import { FormContext, MultiStepFormContext } from '../react-multi-step-form';

export const useMultiStepFormContext = <T,>(): MultiStepFormContext<T> => {
  const context = useContext(FormContext) as MultiStepFormContext<T>;
  if (!context) {
    throw new Error(
      'useMultiStepFormContext must be used within a MultiStepFormProvider'
    );
  }
  return context;
};
