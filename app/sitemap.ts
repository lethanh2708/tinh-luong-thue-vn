import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tinh-luong-thue-vn.vercel.app";
  const paths = [
    "",
    "/tinh-luong",
    "/thue-ho-kinh-doanh",
    "/luong-toi-thieu",
    "/huong-dan/cach-tinh-luong-net-2026",
    "/huong-dan/thue-ho-kinh-doanh-2026",
    "/gioi-thieu",
    "/lien-he",
    "/chinh-sach-bao-mat",
  ];
  const now = new Date();
  return paths.map((p) => ({
    url: base + p,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : p.startsWith("/huong-dan") ? 0.7 : 0.8,
  }));
}
