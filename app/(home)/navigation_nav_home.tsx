import { NAVSUB_ITEMS } from "@/components/navbar/navsub/items";
import { SearchTypeKey } from "@/components/search_types/item";

type Props = {
  onSelect: (type: SearchTypeKey) => void;
  activeType: SearchTypeKey;
};

const NavigationNavHome = ({ onSelect, activeType }: Props) => {
  return (
    <nav className="flex items-center justify-between px-8">
      {NAVSUB_ITEMS.filter(
        (item) => item.isShow === false || item.isShow === true,
      ).map((item) => (
        <button
          key={item.link}
          onClick={() => onSelect(item.type as SearchTypeKey)}
          className={`${
            activeType === item.type
              ? "bg-white text-black rounded-full "
              : "text-slate-300"
          } font-semibold flex items-center space-x-2 p-2 `}
        >
          <span
            className={`${activeType === item.type ? "text-custom-root" : "text-slate-300"}`}
          >
            {item.icon}
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavigationNavHome;
