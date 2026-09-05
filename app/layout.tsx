import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tinh-luong-thue-vn.vercel.app"),
  title: {
    default: "Tính Lương & Thuế VN — Gross/Net, HKD, Lương tối thiểu",
    template: "%s | Tính Lương & Thuế VN",
  },
  description:
    "Công cụ tiếng Việt: tính lương Gross → Net 2026, thuế hộ kinh doanh (NĐ 141/2026), lương tối thiểu vùng (NĐ 293/2025).",
  openGraph: {
    locale: "vi_VN",
    type: "website",
    title: "Tính Lương & Thuế VN",
    description:
      "Tính Gross → Net, thuế hộ kinh doanh và tra lương tối thiểu vùng — MVP tham khảo.",
  },
};

const ADSENSE_CLIENT = "ca-pub-9768397948479783";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col font-sans">
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
