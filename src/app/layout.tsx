import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    absolute: "Create Next App",
    default: "Login",
    template: "%s | Create Next App",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="size-full">{children}</body>
    </html>
  );
}
