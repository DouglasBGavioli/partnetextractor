import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Livelo Partner extractor",
  description: "Feio por preguiça por Douglas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
