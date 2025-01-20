import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getSession();
  if (!session || !session.user) redirect("/auth/signin");
  return (
    <>
      <div>DashboardPage</div>
      <div className="flex items-center space-x-1">
        <span>MyRole:</span>
        <span>{session?.user.role}</span>
      </div>
    </>
  );
};

export default Dashboard;
