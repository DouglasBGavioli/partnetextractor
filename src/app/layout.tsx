import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { PartnersProvider } from "@/contexts/Partners";

export const metadata: Metadata = {
  title: "Livelo Partner codes",
  description: "Portal extrator de código de parceiros",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Analytics />
        <PartnersProvider>
          <Header />
          {children}
          <Footer />
        </PartnersProvider>
      </body>
    </html>
  );
}

