import { NavbarProfile } from "../_components/navbarProfile";

interface ProtectedProps {
  children: React.ReactNode;
}
const ProtectedLayout = async ({ children }: ProtectedProps) => {
  return (
    <div className="h-screen w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <NavbarProfile />
      {children}
    </div>
  );
};

export default ProtectedLayout;
