"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"; // Import router để refresh dữ liệu
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UpdateImageSchema } from "@/schemas/users/user";
import UploadImage from "./upload-image";
import { postUser } from "@/lib/post-user";

interface FormUploadImageProps {
  image?: string | null | undefined;
  name?: string | null | undefined;
}

export const FormUploadImage = ({ image, name }: FormUploadImageProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateImageSchema>>({
    resolver: zodResolver(UpdateImageSchema),
    defaultValues: {
      image: image || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateImageSchema>) => {
    try {
      const response = await postUser(values);

      if (response.message) {
        toast.success("Cập nhật ảnh thành công");
        router.refresh(); // Tự động làm mới dữ liệu toàn trang
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <UploadImage
                  name={name}
                  image={image}
                  onChange={(url) => {
                    field.onChange(url); // Cập nhật giá trị vào form
                    form.handleSubmit(onSubmit)(); // Tự động gửi lên Database
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};