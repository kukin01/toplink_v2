
import type { Metadata } from "next";
import { Inter, Karla } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "Toplink Digital",
  description: "Branding, web development and digital marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${karla.variable}`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar hideOnHomePage />
        {children}
        <Footer />
      </body>
    </html>
  );
}
