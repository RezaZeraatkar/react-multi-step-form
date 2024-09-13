import { useState } from 'react';
import { useMultiStepFormContext } from '../components/hooks/use-multi-step-form-context';

export interface FormData1 {
  email: string;
  password: string;
}

export default function FormStep1() {
  // useMultiStepFormContext is a custom hook that provides access to the multi-step form context.
  const { goToNextStep, updateFormState, formState } =
    useMultiStepFormContext<FormData1>();

  const [email, setEmail] = useState(formState.email || '');
  const [password, setPassword] = useState(formState.password || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFormState({ email, password });
    goToNextStep();
    console.log({ email, password });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-sm mx-auto p-4 bg-white'
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email:
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password:
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:outline'
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
