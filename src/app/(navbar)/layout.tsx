import type { Metadata } from "next";
import { Navbar } from "@/components/internal/navbar";

export const metadata: Metadata = {
  title: {
    default: "Password Manager",
    template: "%s - Password Manager",
  },
  description: "Password manager for cryptographic password generation and storage",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={"min-h-screen flex flex-col"}>
      <Navbar />
      {children}
    </div>
  );
}
