import { NAVSUB_ITEMS } from "@/components/navbar/navsub/items";
import Link from "next/link";

const NavigationNavHomeMobile = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 py-2 bg-white mt-20 mx-5 pt-5 rounded-2xl shadow-xl gap-5">
      {NAVSUB_ITEMS.map((item) => (
        <Link key={item.link} href={item.link} className="mx-auto">
          <div
            className={`${item.background} text-slate-200 rounded-full p-1 w-14 h-14 mx-auto flex items-center justify-center`}
          >
            {item.icon}
          </div>
          <span className=" text-sm flex items-center justify-center text-center">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavigationNavHomeMobile;
