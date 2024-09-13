import { useMultiStepFormContext } from '../components/hooks/use-multi-step-form-context';

export default function Footer() {
  const { currentStepIndex, formState, goToNextStep, goToPreviousStep } =
    useMultiStepFormContext();
  console.log(currentStepIndex, formState);
  return (
    <div className='text-center bg-gray-200 py-1'>
      <div className='text-red-500'>
        Attention!!! these buttons are just for back and forward navigation
        through the forms. they don't validate the forms.
      </div>
      <button type='submit' onClick={() => goToPreviousStep()}>
        {' '}
        Previous{' '}
      </button>{' '}
      |{' '}
      <button type='submit' onClick={() => goToNextStep()}>
        {' '}
        Next{' '}
      </button>
    </div>
  );
}
