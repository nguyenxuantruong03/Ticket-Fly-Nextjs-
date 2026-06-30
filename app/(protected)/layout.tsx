export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="mt-28 lg:mt-20">{children}</div>
  );
}
