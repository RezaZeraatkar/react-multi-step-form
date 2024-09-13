import MultiStepFormProvider, {
  FormConfig,
} from './components/react-multi-step-form';
import Footer from './steps/footer';
import FormStep1, { FormData1 } from './steps/form-step1';
import FormStep2, { FormData2 } from './steps/form-step2';
import FormStep3, { formData3 } from './steps/form-step3';
import Header from './steps/header';

type FormType = FormData1 & FormData2 & formData3;

function App() {
  const steps: FormConfig<FormType> = {
    header: () => <Header />,
    steps: [
      {
        id: 'step-1',
        title: 'Step 1',
        render: () => <FormStep1 />,
      },

      {
        id: 'step-2',
        title: 'Step 2',
        render: () => <FormStep2 />,
      },

      {
        id: 'step-3',
        title: 'Step 3',
        render: () => <FormStep3 />,
      },
    ],
    footer: () => {
      return <Footer />;
    },
  };

  return (
    <div className='bg-slate-50 min-h-screen flex justify-center flex-col items-center'>
      <div className='max-w-sm border border-blue-500'>
        <MultiStepFormProvider
          header='Multi Step Form'
          steps={steps}
          footer='Footer'
        />
      </div>
    </div>
  );
}

export default App;
