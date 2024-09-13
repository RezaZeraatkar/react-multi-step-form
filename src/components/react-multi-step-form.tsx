'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback, useMemo, useState } from 'react';

export interface MultiStepFormContext<T> {
  formState: T;
  updateFormState: (newData: Partial<T>) => void;
  currentStepIndex: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
}

export const FormContext = createContext<
  MultiStepFormContext<unknown> | undefined
>(undefined);

export type FormConfig<T> = StepsConfig<T> | FormStep<T>[];

interface FormStep<T> {
  id: string;
  title: string;
  render: (props: MultiStepFormContext<T>) => ReactNode;
}

interface StepsConfig<T> {
  header?: (props: MultiStepFormContext<T>) => ReactNode;
  steps: FormStep<T>[];
  footer?: (props: MultiStepFormContext<T>) => ReactNode;
}

interface ReactMultiStepperProps<T> {
  header?: ReactNode;
  steps: FormConfig<T>;
  footer?: ReactNode;
}

/**
 * @description
 * ReactMultiStepper is a wrapper component that provides a way to step through a
 * series of form components, passing forms state and callbacks to each step.
 *
 * @param {ReactNode} header (optional) - A React element to render as the header
 * @param {FormConfig<T>} steps - An array of steps to render, or a single object
 *   containing a "header", "steps", and "footer" property. If an object is
 *   passed, the "header" and "footer" properties will be rendered as the
 *   header and footer of the form.
 * @param {ReactNode} footer (optional) - A React element to render as the footer
 *
 * @returns A JSX element that renders the multi-step form.
 */
const ReactMultiStepper = <T,>({
  header,
  steps,
  footer,
}: ReactMultiStepperProps<T>) => {
  const [formState, setFormState] = useState<T>({} as T);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const isStepsArray = Array.isArray(steps);
  const stepsArray = isStepsArray ? steps : steps.steps;

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === stepsArray.length - 1;

  const updateFormState = useCallback((newData: Partial<T>) => {
    setFormState((prev) => ({ ...prev, ...newData }));
  }, []);

  const goToNextStep = useCallback(() => {
    setCurrentStepIndex((prev) =>
      prev < stepsArray.length - 1 ? prev + 1 : prev
    );
  }, [stepsArray]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const contextValue = useMemo(
    () => ({
      formState,
      updateFormState,
      currentStepIndex,
      isFirstStep,
      isLastStep,
      goToNextStep,
      goToPreviousStep,
    }),
    [
      formState,
      updateFormState,
      currentStepIndex,
      isFirstStep,
      isLastStep,
      goToNextStep,
      goToPreviousStep,
    ]
  );

  // Conditional header and footer logic
  const renderHeader = () => {
    if (!isStepsArray && steps.header) {
      return steps.header(contextValue);
    }
    return header && <div id='multi-step-form-header'>{header}</div>;
  };

  const renderFooter = () => {
    if (!isStepsArray && steps.footer) {
      return steps.footer(contextValue);
    }
    return footer && <div id='multi-step-form-footer'>{footer}</div>;
  };

  return (
    <FormContext.Provider value={contextValue}>
      {renderHeader()}
      <div
        key={stepsArray[currentStepIndex]?.id}
        id={
          stepsArray[currentStepIndex]?.title ||
          stepsArray[currentStepIndex]?.id
        }
      >
        {stepsArray[currentStepIndex]?.render(contextValue)}
      </div>
      {renderFooter()}
    </FormContext.Provider>
  );
};

export default ReactMultiStepper;
