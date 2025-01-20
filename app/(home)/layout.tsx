import Navbar from "@/components/navbar";

export default function LayoutHome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="mt-20">
      {children}
      </div>
    </>
  );
}
