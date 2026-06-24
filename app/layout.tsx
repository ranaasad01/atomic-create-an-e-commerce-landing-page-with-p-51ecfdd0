import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Modern Shopping, Reimagined",
  description:
    "Discover curated collections of premium products. Shop the latest trends with fast shipping and easy returns.",
  keywords: ["shop", "ecommerce", "fashion", "lifestyle", "premium"],
  openGraph: {
    title: "Lumière — Modern Shopping, Reimagined",
    description: "Discover curated collections of premium products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#f8f7ff] text-[#1a1a2e] antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}