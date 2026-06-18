"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Edit2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitialsName } from "@/lib/libs";

interface UploadImageProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  image?: string | null | undefined;
  name?: string | null | undefined;
}

const UploadImage: React.FC<UploadImageProps> = ({ disabled, onChange, image, name }) => {
  const [preview, setPreview] = useState(image);

  const onUpload = (result: any) => {
    const url = result?.info?.secure_url;
    if (url) {
      setPreview(url); // Cập nhật ảnh xem trước ngay lập tức
      onChange(url);   // Gọi hàm onChange của react-hook-form
    }
  };

  return (
    <div className="relative inline-block">
      <div className="relative group overflow-hidden rounded-full">
        <Avatar className="w-10 h-10"> 
          {preview ? (
            <AvatarImage src={preview} className="object-cover" />
          ) : (
            <AvatarFallback>{getInitialsName(name || "")}</AvatarFallback>
          )}
        </Avatar>

        <CldUploadWidget onSuccess={onUpload} uploadPreset="t58avl47">
          {({ open }) => (
            <button
              type="button"
              disabled={disabled}
              onClick={() => open?.()}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed border-none outline-none"
            >
              <Edit2 className="w-5 h-5 text-white" />
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default UploadImage;