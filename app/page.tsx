import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "Bộ công cụ tiếng Việt: Gross → Net 2026, thuế hộ kinh doanh, lương tối thiểu vùng. Ước tính minh bạch, mobile-first.",
};

const tools = [
  {
    href: "/tinh-luong",
    title: "Tính lương Gross → Net",
    desc: "Nhập lương gross, người phụ thuộc, vùng — xem net, BHXH/BHYT/BHTN và thuế TNCN lũy tiến 2026.",
  },
  {
    href: "/thue-ho-kinh-doanh",
    title: "Thuế hộ kinh doanh",
    desc: "Ước tính GTGT + TNCN theo doanh thu năm và ngành (khung NĐ 141/2026).",
  },
  {
    href: "/luong-toi-thieu",
    title: "Lương tối thiểu vùng",
    desc: "Tra cứu mức tháng / giờ vùng I–IV theo NĐ 293/2025.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          MVP 2026
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Tính lương &amp; thuế Việt Nam — rõ ràng, nhanh, tiếng Việt
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
          Ba công cụ tham khảo cho người đi làm và hộ kinh doanh: chuyển Gross →
          Net, ước tính thuế HKD, tra lương tối thiểu vùng. Số liệu gắn nguồn;
          không thay thế tư vấn chuyên môn.
        </p>
      </section>

      <AdSlot label="Vị trí AdSense — trang chủ" />

      <section className="grid gap-4 sm:grid-cols-1">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="block rounded-xl border border-ink/10 bg-white/50 p-5 shadow-sm transition hover:border-accent/40 hover:bg-white/80"
          >
            <h2 className="text-lg font-semibold text-ink">{t.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.desc}</p>
            <span className="mt-3 inline-block text-sm font-medium text-accent">
              Mở công cụ →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
