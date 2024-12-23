import type { Metadata } from "next";
import localFont from "next/font/local";
import GlobalStyle from "@/styles/global-styled";

import { HeaderFooter } from "./components/HeaderFooter";
import { AuthProvider } from "@/context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lumiere",
  description: "Site de consumo consciente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalStyle/>
        <AuthProvider>
          <HeaderFooter>
          {children}
          </HeaderFooter>
        </AuthProvider>
      </body>
    </html>
  );
}
