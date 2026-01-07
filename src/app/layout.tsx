import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clodream | Dream in Clothing",
  description: "Web clothing store impianmu.",
  icons: {
    icon: "/clodream.png",
    apple: "/clodream.png",
  },
  openGraph: {
    title: "Clodream | Dream in Clothing",
    description: "Web clothing store impianmu.",
    images: ["/clodream.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/clodream.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
    </html>
  );
}
