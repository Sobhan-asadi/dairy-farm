/** @format */
import type { Metadata } from "next";
import { estedad } from "../assets/font";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "دامداری",
  description: "مجموعه تخصصی پرورش دام و عرضه محصولات دامداری",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl' className={cn("h-full", "antialiased", estedad.variable, "font-sans", geist.variable)}>
      <body className='flex min-h-full flex-col font-sans'>{children}</body>
    </html>
  );
}
