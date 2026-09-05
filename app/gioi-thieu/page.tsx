import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Giới thiệu site công cụ tính lương và thuế Việt Nam 2026 — tham khảo, không phải tư vấn thuế chính thức. Chủ sở hữu: Lê Tân Thành.",
};

const tools = [
  {
    href: "/tinh-luong",
    title: "Tính lương Gross → Net",
    desc: "Ước tính lương net, bảo hiểm và thuế TNCN theo khung 2026.",
  },
  {
    href: "/thue-ho-kinh-doanh",
    title: "Thuế hộ kinh doanh",
    desc: "Ước tính GTGT + TNCN theo doanh thu và ngành (NĐ 141/2026).",
  },
  {
    href: "/luong-toi-thieu",
    title: "Lương tối thiểu vùng",
    desc: "Tra cứu mức tháng / giờ vùng I–IV (NĐ 293/2025).",
  },
];

export default function GioiThieuPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Giới thiệu
        </h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Site công cụ tính lương và thuế Việt Nam — tham khảo năm 2026.
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <p>
          <strong className="text-ink">Tính Lương &amp; Thuế VN</strong> cung cấp
          các công cụ tiếng Việt giúp ước tính lương Gross → Net, thuế hộ kinh
          doanh và tra cứu lương tối thiểu vùng. Số liệu gắn với khung pháp lý
          tham khảo năm 2026; kết quả chỉ mang tính minh họa.
        </p>
        <p>
          Chủ sở hữu site: <strong className="text-ink">Lê Tân Thành</strong>.
        </p>
        <p>
          Site <strong className="text-ink">không phải</strong> tư vấn thuế hay
          pháp lý chính thức. Vui lòng đối chiếu văn bản pháp luật hiện hành hoặc
          hỏi chuyên gia trước khi quyết định tài chính.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-ink">Công cụ trên site</h2>
        <ul className="grid gap-3">
          {tools.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="block rounded-xl border border-ink/10 bg-white/50 p-4 shadow-sm transition hover:border-accent/40 hover:bg-white/80"
              >
                <span className="font-medium text-ink">{t.title}</span>
                <p className="mt-1 text-sm text-ink-muted">{t.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-ink-muted">
        Cần hỗ trợ? Xem trang{" "}
        <Link href="/lien-he" className="text-accent underline-offset-4 hover:underline">
          Liên hệ
        </Link>
        .
      </p>
    </div>
  );
}
