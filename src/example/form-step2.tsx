import { useForm, SubmitHandler } from 'react-hook-form';
import { useMultiStepFormContext } from '../components/hooks/use-multi-step-form-context';

export interface FormData2 {
  firstName: string;
  surName: string;
}

export default function FormStep2() {
  const { goToNextStep, goToPreviousStep, updateFormState, formState } =
    useMultiStepFormContext<FormData2>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData2>({
    defaultValues: {
      firstName: formState?.firstName || '',
      surName: formState?.surName || '',
    },
  });

  const onSubmit: SubmitHandler<FormData2> = (data) => {
    updateFormState(data);
    goToNextStep();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-sm mx-auto p-4 bg-white'
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='firstName'
          >
            First Name:
          </label>
          <input
            id='firstName'
            {...register('firstName', { required: 'First name is required' })}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.firstName ? 'border-red-500' : ''
            }`}
          />
          {errors.firstName && (
            <p className='text-red-500 text-xs italic'>
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='surName'
          >
            Surname:
          </label>
          <input
            id='surName'
            {...register('surName', { required: 'Surname is required' })}
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.surName ? 'border-red-500' : ''
            }`}
          />
          {errors.surName && (
            <p className='text-red-500 text-xs italic'>
              {errors.surName.message}
            </p>
          )}
        </div>

        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Next
          </button>
          <button onClick={goToPreviousStep} className='text-blue-500'>
            Previous
          </button>
        </div>
      </form>
    </div>
  );
}
