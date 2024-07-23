import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Arvid Berndtsson's Portfolio",
  description: "Arvid Berndtsson's portfolio presented in a terminal interface.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen bg-[#1e1e2e] text-[#cdd6f4] flex flex-col">
        {children}
      </body>
    </html>
  );
}