import { useMultiStepFormContext } from '../components/hooks/use-multi-step-form-context';

export default function Header() {
  const { currentStepIndex } = useMultiStepFormContext();
  return (
    <div className='text-center bg-gray-200 py-1'>
      Header: Step: {currentStepIndex}
    </div>
  );
}
