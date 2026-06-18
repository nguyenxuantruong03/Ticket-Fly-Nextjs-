"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { UpdateImageSchema } from "@/schemas/users/user";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ForDeleteImage = () => {
  const form = useForm<z.infer<typeof UpdateImageSchema>>({
    resolver: zodResolver(UpdateImageSchema),
    defaultValues: {
      image: "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof UpdateImageSchema>) => {
    // if (data.error) {
    //   toast.error("Xóa không thành công!");
    // }
    // if (data.success) {
    //   toast.success("Xóa thành công!");
    //   form.reset();
    //   router.refresh();
    // }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          className="w-full cursor-pointer flex"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Xóa ảnh
        </Button>
      </form>
    </Form>
  );
};
