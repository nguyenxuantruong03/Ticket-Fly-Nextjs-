import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  type: string;
}

const Header: React.FC<HeaderProps> = ({ label, type }) => {
  return (
    <div className="w-full gap-y-4 items-center justify-center">
      <h1 className={cn("font-bold text-2xl text-[#002D74]", font.className)}>
        {type}
      </h1>
      <p className="text-xs mt-4 text-[#002D74]">{label}</p>
    </div>
  );
};

export default Header;
