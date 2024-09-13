'use client';

import { FormEvent, useRef } from 'react';
import { useMultiStepFormContext } from '../components/hooks/use-multi-step-form-context';

export interface formData3 {
  job: string;
  university: string;
  isEmployed: boolean;
}

export default function FormStep3() {
  const { goToPreviousStep, updateFormState, formState } =
    useMultiStepFormContext<formData3>();

  // Uncontrolled inputs - using refs
  const jobRef = useRef<HTMLInputElement>(null);
  const universityRef = useRef<HTMLSelectElement>(null);
  const isEmployedRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Access form field values through refs
    const job = jobRef.current?.value;
    const university = universityRef.current?.value;
    const isEmployed = isEmployedRef.current?.checked;

    // Update the form state with the new values
    updateFormState({ job, university, isEmployed });

    console.log('final form state: ', {
      ...formState,
      ...{ job, university, isEmployed },
    });

    try {
      const res = await fetch('/api/submitUserInfo', {
        method: 'POST',
        body: JSON.stringify({
          ...formState,
          ...{ job, university, isEmployed },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        console.log('User info submitted successfully!');
      } else {
        console.log('Failed to submit user info');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
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
            htmlFor='job'
          >
            Job:
          </label>
          <input
            ref={jobRef}
            defaultValue={formState.job}
            type='text'
            id='job'
            name='job'
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='university'
          >
            University:
          </label>
          <select
            ref={universityRef}
            defaultValue={formState.university}
            id='university'
            name='university'
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          >
            <option value='' disabled>
              Select your university
            </option>
            <option value='Harvard University'>Harvard University</option>
            <option value='Stanford University'>Stanford University</option>
            <option value='MIT'>MIT</option>
            <option value='University of Oxford'>University of Oxford</option>
            <option value='University of Cambridge'>
              University of Cambridge
            </option>
          </select>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            <input
              ref={isEmployedRef}
              defaultChecked={formState.isEmployed}
              type='checkbox'
              name='isEmployed'
              className='mr-2 leading-tight'
            />
            Employed
          </label>
        </div>

        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>

          <button
            type='button'
            onClick={goToPreviousStep}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Previous
          </button>
        </div>
      </form>
    </div>
  );
}
