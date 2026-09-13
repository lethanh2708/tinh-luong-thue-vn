import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { GrossNetCalculator } from "@/components/GrossNetCalculator";

export const metadata: Metadata = {
  title: {
    absolute:
      "Tính lương Gross sang Net 2026 — thuế TNCN Việt Nam",
  },
  description:
    "Công cụ tính lương Gross sang Net 2026: BHXH, BHYT, BHTN, giảm trừ gia cảnh và thuế TNCN lũy tiến. Ước tính nhanh, tiếng Việt.",
};

const otherTools = [
  {
    href: "/thue-ho-kinh-doanh",
    title: "Thuế hộ kinh doanh",
  },
  {
    href: "/luong-toi-thieu",
    title: "Lương tối thiểu vùng",
  },
  {
    href: "/tinh-luong",
    title: "Trang tính lương riêng",
  },
];

const guides = [
  {
    href: "/huong-dan/cach-tinh-luong-net-2026",
    title: "Cách tính lương net 2026",
  },
  {
    href: "/huong-dan/thue-ho-kinh-doanh-2026",
    title: "Thuế hộ kinh doanh 2026",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Tính lương Gross sang Net 2026
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
          Nhập lương gross, người phụ thuộc và vùng để ước tính lương net sau bảo
          hiểm và thuế TNCN 2026. Công cụ tham khảo, không thay thế tư vấn chuyên
          môn.
        </p>
      </section>

      <AdSlot label="Vị trí AdSense — trang chủ" />

      <GrossNetCalculator />

      <p className="text-sm text-ink-muted">
        Chưa rõ công thức?{" "}
        <Link
          href="/huong-dan/cach-tinh-luong-net-2026"
          className="text-accent underline-offset-4 hover:underline"
        >
          Xem cách tính lương net 2026
        </Link>
        .
      </p>

      <section className="space-y-3 border-t border-ink/10 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Công cụ khác
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {otherTools.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="text-accent underline-offset-4 hover:underline"
              >
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Hướng dẫn
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {guides.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="text-accent underline-offset-4 hover:underline"
              >
                {g.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
