import { AlertTriangle } from "lucide-react";
import { JSX } from 'react';

interface FormHintProps {
  content: string | JSX.Element;
}

const FormHint = ({ content }: FormHintProps) => {
  return (
    <div className="p-2 bg-blue-500 bg-opacity-20 w-full rounded-md border-l-4 border-blue-500">
      <div className="flex items-center space-x-4">
        <div className="w-1/12 flex justify-center">
          <AlertTriangle className="w-5 h-5 text-blue-600" />
        </div>
        <div className="w-11/12">
          <p className="text-sm font-semibold text-blue-600 break-words">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormHint;
