import Link from "next/link";

const Navigation = () => {
  // Tách biệt dữ liệu cấu hình
  const NAV_ITEMS = [
    { label: "Yacht", link: "/yacht" },
    { label: "Ticket Fly", link: "/ticket_fly" },
    { label: "Hotel", link: "/hotel" },
    { label: "Enterprise", link: "/enterprise" },
    { label: "BLog", link: "/blog" },
    { label: "Hotline: 0352261103", link: "/tel:0352261103", className:"lg:hidden" },
    { label: "Email: nxt159753@gmail.com", link: "/mailto:nxt159753@gmail.com", className:"lg:hidden"  },
  ];
  return (
    <ul className="grid grid-rows-7 lg:grid-rows-none lg:flex items-center space-y-5 lg:space-y-0 lg:space-x-8">
      {NAV_ITEMS.map((item) => (
        <li
          key={item.link}
          className={`${item.className ? `${item.className} hover:text-custom-root hover:underline-offset-4 font-semibold`: "hover:text-custom-root hover:underline-offset-4 font-semibold"} `}
        >
          <Link href={item.link}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
