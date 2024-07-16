

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"grow flex flex-col md:items-center md:justify-center items-start justify-start"}>
      {children}
    </div>
  );
}