import { UserInfo } from "@/components/auth/user-info";
import { getUser } from "@/lib/user";
import { Suspense } from "react";

const ProfilePage = async () => {
  const user = await getUser();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserInfo label="Profile Component" user={user} />
    </Suspense>
  );
};

export default ProfilePage;
