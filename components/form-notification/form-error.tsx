import { X } from "lucide-react";

interface FormErrorProps {
  content: string;
}

const FormError = ({ content }: FormErrorProps) => {
  return (
    <div className="p-2 bg-red-500 bg-opacity-20 w-full rounded-md border-l-4 border-red-500">
      <div className="flex items-center space-x-4">
        <div className="w-1/12 flex justify-center">
          <X className="w-5 h-5 text-red-600" />
        </div>
        <div className="w-11/12">
          <p className="text-sm font-semibold text-red-600 break-words">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormError;
