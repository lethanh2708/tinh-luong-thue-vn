import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tinh-luong-thue-vn.vercel.app"),
  title: {
    default:
      "Tính lương net 2026 & thuế VN — Gross/Net, HKD, lương tối thiểu vùng",
    template: "%s | Tính Lương & Thuế VN",
  },
  description:
    "Công cụ tiếng Việt: tính lương net 2026, thuế hộ kinh doanh 2026 (NĐ 141/2026), lương tối thiểu vùng 2026 (NĐ 293/2025).",
  verification: {
    google: "SLRQDEV8m99GWhMmlzAyKvftHkeReiw_fAgDHz4LPG4",
  },
  other: {
    "google-adsense-account": "ca-pub-9768397948479783",
  },
  openGraph: {
    locale: "vi_VN",
    type: "website",
    title: "Tính lương net 2026 & thuế Việt Nam",
    description:
      "Tính Gross → Net, thuế hộ kinh doanh 2026 và tra lương tối thiểu vùng — MVP tham khảo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Raw script so AdSense crawler sees ca-pub in initial HTML */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9768397948479783"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
