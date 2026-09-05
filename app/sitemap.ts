import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tinh-luong-thue-vn.example";
  const paths = ["", "/tinh-luong", "/thue-ho-kinh-doanh", "/luong-toi-thieu"];
  const now = new Date();
  return paths.map((p) => ({
    url: base + p,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
}
