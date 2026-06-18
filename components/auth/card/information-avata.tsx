import {
  ArrowRightLeft,
  Bell,
  CreditCard,
  LogOut,
  NotebookTabs,
  ScrollText,
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
interface InformationAvataProps {
  handleLogout: () => Promise<void>;
}

const InformationAvata = ({ handleLogout }: InformationAvataProps) => {
  const INFOMATIONAVATALIST = [
    {
      icon: <UserRound className="w-5 h-5" />,
      label: "Chỉnh sửa hồ sơ",
      link: "/profile",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Thẻ của tôi",
      link: "/my-payment",
    },
    {
      icon: <ScrollText className="w-5 h-5" />,
      label: "Danh sách giao dịch",
      link: "/list-transaction",
    },
    {
      icon: <NotebookTabs className="w-5 h-5" />,
      label: "Đặt chỗ của tôi",
      link: "/my-booking",
    },
    {
      icon: <ArrowRightLeft className="w-5 h-5" />,
      label: "Hoàn tiền",
      link: "/refund",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Thông tin khách hàng đã lưu",
      link: "/info-custom-saved",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Thông báo giá vé máy bay",
      link: "/noti-ticket-fly",
    },
    {
      icon: <LogOut className="w-5 h-5" />,
      label: "Đăng xuất",
      link: "",
      onClick: handleLogout,
    },
  ];
  return (
    <>
      {INFOMATIONAVATALIST.map((item) => (
        <div key={item.label}>
          {item.link ? (
            // Dùng Link khi có đường dẫn
            <Link
              href={item.link}
              className="flex items-center space-x-2 hover:bg-custom-hover px-4 py-3 font-semibold"
            >
              <span className="text-custom-root">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ) : (
            // Dùng Button khi chỉ có hành động (như Đăng xuất)
            <button
              onClick={item.onClick}
              className="w-full flex items-center space-x-2 hover:bg-custom-hover px-4 py-3 font-semibold text-left border-none outline-none focus:ring-0"
            >
              <span className="text-custom-root">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default InformationAvata;
