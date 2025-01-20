import Link from "next/link";
import SignButton from "../auth/signButton";

const Item = () => {
  const items = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      label: "Profile",
      link: "/profile",
    },
  ];
  return (
    <div className="w-full p-5 bg-slate-900 text-slate-200 fixed top-0">
      <div className="flex items-center justify-between">
        <ul className="flex items-center space-x-3">
          {items.map((item) => (
            <li key={item.link}>
              <Link href={item.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <SignButton />
      </div>
    </div>
  );
};

export default Item;
