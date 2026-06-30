import Image from "next/image";
import NavigationNavHomeMobile from "./navigation_nav_home_mobile";

const Home = () => {
  return (
    <div className="">
      <Image
        src="/images/homes.png"
        width={2880}
        height={1278}
        alt=""
        className="w-full h-auto relative  hidden lg:block"
      />
      <div className="h-80 bg-blue-500 rounded-b-2xl lg:hidden">
        <div
          className="
        absolute
        top-2/3
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        z-50
        w-full
        "
        >
          <NavigationNavHomeMobile />
        </div>
      </div>
    </div>
  );
};

export default Home;
