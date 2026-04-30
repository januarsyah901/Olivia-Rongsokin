import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rongsok.in — Platform Daur Ulang Digital Yogyakarta",
  description:
    "Jual rongsok dengan mudah! Temukan pengepul terdekat di Yogyakarta, minta jemput ke kos, dan dapatkan harga terbaik. Platform daur ulang sirkular yang transparan dan terpercaya.",
  keywords: "rongsok, daur ulang, jual sampah, pengepul, Yogyakarta, kardus, plastik, besi",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
