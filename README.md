
# MultiStepFormProvider

[![NPM Version](https://img.shields.io/npm/v/multistepformprovider.svg)](https://www.npmjs.com/package/multistepformprovider)
[![License](https://img.shields.io/npm/l/multistepformprovider.svg)](https://github.com/yourusername/multistepformprovider/blob/main/LICENSE)

**MultiStepFormProvider** is a highly customizable, lightweight, and flexible multi-step form solution for React and Next.js. With support for advanced step navigation, form state management, and dynamic rendering, it helps you build modular and reusable multi-step forms effortlessly.

## Features

- 🛠 **Simple API** for configuring multi-step forms.
- 💡 **Dynamic step rendering** with a flexible design pattern.
- 🔄 **Stateful form context** to track and update form state across steps.
- 🎛 **Customizable header and footer** for adding UI elements around the form.
- 🚀 **Easy integration** with existing React projects.
- ⚙️ **Typescript support** for strong type safety and better developer experience.

## Installation

To install the package via npm:

\`\`\`bash
npm install multistepformprovider
\`\`\`

Or via yarn:

\`\`\`bash
yarn add multistepformprovider
\`\`\`

## Usage

### Basic Example

Here's an example of how to integrate the \`MultiStepFormProvider\` into your React or Next.js project:

\`\`\`tsx
import MultiStepFormProvider, { FormConfig } from 'multistepformprovider';
import FormStep1 from './components/steps/FormStep1';
import FormStep2 from './components/steps/FormStep2';
import FormStep3 from './components/steps/FormStep3';
import Header from './components/steps/Header';
import Footer from './components/steps/Footer';

function App() {
  const steps: FormConfig = {
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
    footer: () => <Footer />,
  };

  return (
    <div className="app-container">
      <MultiStepFormProvider steps={steps} />
    </div>
  );
}

export default App;
\`\`\`

### Form Configuration

You can configure your form steps with an object or an array. Here is an overview of the configuration:

\`\`\`ts
export interface FormConfig<T = any> {
  header?: (context: MultiStepFormContext<T>) => ReactNode;
  steps: Array<{
    id: string;
    title?: string;
    render: (context: MultiStepFormContext<T>) => ReactNode;
  }>;
  footer?: (context: MultiStepFormContext<T>) => ReactNode;
}
\`\`\`

- \`header\`: A function that renders a header for the form. Receives the form context as props.
- \`steps\`: An array of step objects, each containing:
  - \`id\`: A unique identifier for the step.
  - \`title\`: Optional title for the step (used for accessibility or display).
  - \`render\`: A function that renders the step's form fields. Receives the form context as props.
- \`footer\`: A function that renders a footer for the form. Receives the form context as props.

### State Management

The form's state is managed automatically via the \`MultiStepFormContext\`. You can access and update the state in any step using the provided context.

Example of updating the form state within a step:

\`\`\`tsx
import { useContext } from 'react';
import { FormContext } from 'multistepformprovider';

const FormStep1 = () => {
  const formContext = useContext(FormContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formContext?.updateFormState({ step1Field: e.target.value });
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <button onClick={formContext?.goToNextStep}>Next</button>
    </div>
  );
};

export default FormStep1;
\`\`\`

### Navigation Between Steps

The library provides utility methods to navigate between steps:

- \`goToNextStep\`: Moves to the next step.
- \`goToPreviousStep\`: Moves to the previous step.
- \`isFirstStep\`: Boolean indicating if the current step is the first.
- \`isLastStep\`: Boolean indicating if the current step is the last.

### Customizing Header and Footer

You can easily customize the form's header and footer by passing React components to the \`header\` and \`footer\` props, or by using the configuration functions:

\`\`\`tsx
const Header = () => <h1>Custom Form Header</h1>;
const Footer = () => <button>Submit Form</button>;
\`\`\`

## API Reference

### \`MultiStepFormProvider\`

- **\`steps\`**: \`FormConfig<T>\`  
  The configuration object or array of form steps.

- **\`header\`**: \`ReactNode\` (Optional)  
  Renders a custom header if provided.

- **\`footer\`**: \`ReactNode\` (Optional)  
  Renders a custom footer if provided.

### \`FormContext\`

The context provides the following properties and methods:

- \`formState: T\` - Current form state.
- \`updateFormState(newData: Partial<T>)\` - Updates the form state with new data.
- \`currentStepIndex: number\` - The index of the current step.
- \`goToNextStep()\` - Proceeds to the next step.
- \`goToPreviousStep()\` - Returns to the previous step.
- \`isFirstStep: boolean\` - Whether the current step is the first one.
- \`isLastStep: boolean\` - Whether the current step is the last one.

## TypeScript Support

The library is written in TypeScript, ensuring type safety and a smooth developer experience. Define the structure of your form data using the \`FormType\` generic when setting up the form:

\`\`\`ts
type FormData = {
  step1Field: string;
  step2Field: number;
};
\`\`\`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing

We welcome contributions to enhance the \`MultiStepFormProvider\`! Feel free to open issues or submit pull requests.

## Support

If you encounter any issues or have questions, please feel free to open an issue on [GitHub](https://github.com/yourusername/multistepformprovider/issues).
