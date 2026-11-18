
import type { Metadata } from "next";
import { Inter, Karla, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
  variable: "--font-poppins",
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
      className={`h-full antialiased ${poppins.className}`}
    >
      <body className="flex min-h-full flex-col">
        <Suspense fallback={null}>
          <Navbar hideOnHomePage />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
