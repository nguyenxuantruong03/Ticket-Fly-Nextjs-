import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/users";
import { FormUploadImage } from "../shared/form-image/form-upload-image";
interface UserInfoPorps {
  user?: User;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoPorps) => {
  const INFOCARDS = [
    {
      label: "Id",
      data: user?.id,
    },
    {
      label: "Name",
      data: user?.name,
    },
    {
      label: "Email",
      data: user?.email,
    },
    {
      label: "Role",
      data: user?.role,
    },
  ];
  return (
    <Card className="max-w-3xl w-full md:max-w-2xl">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rouned-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Image</p>
          <div className=" max-w-full">
            <FormUploadImage image={user?.image} name={user?.name} />
          </div>
        </div>
        {INFOCARDS.map((item) => (
          <div
            key={item.data}
            className="flex flex-row items-center justify-between rouned-lg border p-3 shadow-sm"
          >
            <p className="text-sm font-medium">{item.label}</p>
            <p className="truncate text-xs md:max-w-xs font-mono p-1 bg-slate-100 rouned-md">
              {item.data}
            </p>
          </div>
        ))}

        <div className="flex flex-row items-center justify-between rouned-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Two Facto Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
