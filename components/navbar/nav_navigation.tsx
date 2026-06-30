import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  textHome?: string;
}

const Navigation = ({ textHome }: NavigationProps) => {
  const pathname = usePathname();

  // Tách biệt dữ liệu cấu hình
  const NAV_ITEMS = [
    { label: "Hợp tác với chúng tôi", link: "/connectwithme" },
    { label: "Đã lưu", link: "/saved" },
    { label: "Đặt chỗ của tôi", link: "/booking" },
    { label: "Blog", link: "/blog" },

    {
      label: "Hotline: 0352261103",
      link: "tel:0352261103",
      className: "lg:hidden",
    },
    {
      label: "Email: nxt159753@gmail.com",
      link: "mailto:nxt159753@gmail.com",
      className: "lg:hidden",
    },
  ];
  return (
    <ul className="grid grid-rows-6 lg:grid-rows-none lg:flex items-center gap-y-5 lg:space-y-0 lg:space-x-8">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.link;

        return (
          <li
            key={item.link}
            className={`font-semibold hover:text-custom-root hover:underline-offset-4 transition-colors
              ${textHome}
              ${isActive ? "text-custom-root" : ""} 
              ${item.className || ""}
            `}
          >
            <Link href={item.link}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
