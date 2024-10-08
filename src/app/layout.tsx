import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "DashBoard Next.js",
    template: "%s | Menu",
  },
  description:
    "Professional web developer from Romania. Specialized in React and Next.js. Dedicated to creating high-quality web applications",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "minufy.site",
  },
  twitter: {
    card: "summary_large_image",
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
