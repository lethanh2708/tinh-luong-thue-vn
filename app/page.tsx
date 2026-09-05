import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: {
    absolute:
      "Tính lương net 2026, thuế hộ kinh doanh & lương tối thiểu vùng | Tính Lương & Thuế VN",
  },
  description:
    "Công cụ tiếng Việt: tính lương net 2026 từ gross, thuế hộ kinh doanh 2026 (NĐ 141/2026), lương tối thiểu vùng 2026 (NĐ 293/2025). Ước tính minh bạch, có hướng dẫn.",
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

const guides = [
  {
    href: "/huong-dan/cach-tinh-luong-net-2026",
    title: "Cách tính lương net 2026",
    desc: "Các bước: bảo hiểm, giảm trừ gia cảnh, thuế TNCN — rồi dùng máy tính Gross → Net.",
  },
  {
    href: "/huong-dan/thue-ho-kinh-doanh-2026",
    title: "Thuế hộ kinh doanh 2026",
    desc: "Nhóm doanh thu (miễn ≤1 tỷ…) và preset ngành theo khung NĐ 141/2026.",
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
          Tính lương net &amp; thuế Việt Nam 2026
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
          Ba công cụ tham khảo cho người đi làm và hộ kinh doanh: chuyển Gross →
          Net, ước tính thuế HKD, tra lương tối thiểu vùng. Số liệu gắn nguồn;
          không thay thế tư vấn chuyên môn.
        </p>
      </section>

      <AdSlot label="Vị trí AdSense — trang chủ" />

      <section className="grid gap-4 sm:grid-cols-1">
        <h2 className="text-lg font-semibold text-ink">Công cụ</h2>
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="block rounded-xl border border-ink/10 bg-white/50 p-5 shadow-sm transition hover:border-accent/40 hover:bg-white/80"
          >
            <h3 className="text-lg font-semibold text-ink">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.desc}</p>
            <span className="mt-3 inline-block text-sm font-medium text-accent">
              Mở công cụ →
            </span>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-ink">Hướng dẫn</h2>
        <p className="text-sm text-ink-muted">
          Đọc nhanh trước khi dùng máy tính — nội dung gắn số liệu và văn bản đã
          ghi trên site.
        </p>
        <ul className="grid gap-3">
          {guides.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="block rounded-xl border border-ink/10 bg-white/40 p-4 transition hover:border-accent/40 hover:bg-white/70"
              >
                <span className="font-medium text-ink">{g.title}</span>
                <p className="mt-1 text-sm text-ink-muted">{g.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
