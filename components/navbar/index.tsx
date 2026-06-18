"use server";
import { getUser } from "@/lib/user";
import Item from "./items";
import { getSession } from "@/lib/session";

const Navbar = async () => {
  const user = await getUser();
  const sessionData = await getSession();
  return <Item user={user} sessionData={sessionData} />;
};

export default Navbar;
