import { Check } from "lucide-react";
import { JSX } from "react";

interface FormWarningProps {
  content: string | JSX.Element;
}

const FormWarning = ({ content }: FormWarningProps) => {
  return (
    <div className="p-2 bg-yellow-500 bg-opacity-20 w-full rounded-md border-l-4 border-yellow-500">
      <div className="flex items-center space-x-4">
        <div className="w-1/12 flex justify-center">
          <Check className="w-5 h-5 text-yellow-600" />
        </div>
        <div className="w-11/12">
          <p className="text-sm font-semibold text-yellow-600 break-words">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormWarning;
