import { getUser } from "@/lib/user";
import SettingForm from "./settings-form";
import { Suspense } from "react";

const ClientPage = async () => {
  const user = await getUser();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingForm user={user} />
    </Suspense>
  );
};

export default ClientPage;
