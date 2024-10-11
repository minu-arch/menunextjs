import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "My DashBoard ",
    template: "%s | Menu",
  },
  description:
    "Professional web developer from Romania. Specialized in React and Next.js. Dedicated to creating high-quality web applications",
  openGraph: {
    images: [
      {
        url: `https://menunextjs.vercel.app/api/og?v=${Date.now()}`,
        width: 1000,
        height: 630,
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "minufy.site",
  },
  twitter: {
    title: "Minu | Web Developer",
    description: "Professional web developer specializing in React and Next.js",
    images: ["https://menunextjs.vercel.app/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="size-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
