import type { Metadata } from "next";
import Link from "next/link";
import {
  DISCLAIMER_VI,
  HKD_INDUSTRY_PRESETS,
  HKD_REVENUE_THRESHOLDS,
} from "@/lib/tax-2026";
import { formatPercent, formatVnd } from "@/lib/format";

export const metadata: Metadata = {
  title: "Thuế hộ kinh doanh 2026: nhóm doanh thu & ngành",
  description:
    "Giải thích nhóm doanh thu hộ kinh doanh 2026 (miễn ≤1 tỷ, trên 1–3 tỷ, 3–50 tỷ…) và preset ngành GTGT/TNCN theo khung NĐ 141/2026. Có máy tính ước tính.",
};

export default function ThueHkdGuidePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          Hướng dẫn
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Thuế hộ kinh doanh 2026: nhóm doanh thu và ngành
        </h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Hộ kinh doanh (HKD) thường quan tâm mức doanh thu năm và ngành để ước
          tính GTGT và TNCN. Bài này tóm tắt khung tham chiếu trên site (gắn{" "}
          <strong className="text-ink">NĐ 141/2026</strong>), rồi dẫn tới{" "}
          <Link
            href="/thue-ho-kinh-doanh"
            className="text-accent underline-offset-4 hover:underline"
          >
            máy tính thuế hộ kinh doanh
          </Link>
          .
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">
          Vì sao cần phân nhóm theo doanh thu?
        </h2>
        <p>
          Không phải mọi mức doanh thu đều chịu thuế theo cùng một cách. Trên
          công cụ MVP, doanh thu năm được chia thành các nhóm ước tính để biết
          khi nào có thể miễn GTGT + TNCN theo khung tham chiếu, và khi nào áp
          tỷ lệ trên doanh thu theo ngành. Mục tiêu là giúp chủ hộ hình dung
          nhanh — không thay thế kê khai hay tư vấn thuế chính thức.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">
          Các nhóm doanh thu năm trên site
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">
              ≤ {formatVnd(HKD_REVENUE_THRESHOLDS.exemptUpTo)}
            </strong>
            : nhóm miễn GTGT + TNCN theo ước tính khung NĐ 141/2026 trên MVP.
          </li>
          <li>
            <strong className="text-ink">
              Trên {formatVnd(HKD_REVENUE_THRESHOLDS.exemptUpTo)} đến{" "}
              {formatVnd(HKD_REVENUE_THRESHOLDS.group2UpTo)}
            </strong>
            : nhóm chịu thuế ước tính theo tỷ lệ ngành (GTGT + TNCN trên doanh
            thu).
          </li>
          <li>
            <strong className="text-ink">
              Trên {formatVnd(HKD_REVENUE_THRESHOLDS.group2UpTo)} đến{" "}
              {formatVnd(HKD_REVENUE_THRESHOLDS.group3UpTo)}
            </strong>
            : nhóm tiếp theo trong cùng khung ước tính theo ngành.
          </li>
          <li>
            <strong className="text-ink">
              Trên {formatVnd(HKD_REVENUE_THRESHOLDS.group3UpTo)}
            </strong>
            : nhóm còn lại — vẫn dùng preset ngành trên máy tính; thực tế có thể
            có nghĩa vụ và phương pháp khác, cần đối chiếu văn bản gốc.
          </li>
        </ul>
        <p>
          Ngưỡng trên lấy từ hằng số trong mã nguồn site; khi quy định thay đổi,
          hãy ưu tiên văn bản pháp luật và hướng dẫn cơ quan thuế.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">
          Preset ngành: GTGT và TNCN trên doanh thu
        </h2>
        <p>
          Với các nhóm chịu thuế, máy tính nhân doanh thu với tỷ lệ ước tính
          theo ngành (không bịa thêm ngành ngoài danh sách MVP):
        </p>
        <ul className="list-disc space-y-2 pl-5">
          {HKD_INDUSTRY_PRESETS.map((p) => (
            <li key={p.id}>
              <strong className="text-ink">{p.label}</strong>: GTGT{" "}
              {formatPercent(p.gtgtRate, 1)}, TNCN {formatPercent(p.tncnRate, 1)}{" "}
              trên doanh thu (ước tính).
            </li>
          ))}
        </ul>
        <p>
          Ví dụ minh họa: doanh thu trên ngưỡng miễn, ngành phân phối hàng hóa
          → thuế ước ≈ doanh thu × (1% + 0,5%). Đổi ngành sẽ đổi tổng tỷ lệ;
          luôn đọc nhãn &quot;ước tính&quot; trên kết quả.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">
          Cách dùng máy tính trên site
        </h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Nhập doanh thu năm (VND).</li>
          <li>Chọn preset ngành phù hợp hoạt động chính.</li>
          <li>
            Xem nhóm doanh thu và ước tính GTGT, TNCN, tổng — kèm nguồn NĐ
            141/2026 trên trang công cụ.
          </li>
        </ol>
        <p>
          Mở ngay:{" "}
          <Link
            href="/thue-ho-kinh-doanh"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Thuế hộ kinh doanh 2026 (máy tính)
          </Link>
          . Nếu bạn vừa nhận lương từ công ty, xem thêm{" "}
          <Link
            href="/huong-dan/cach-tinh-luong-net-2026"
            className="text-accent underline-offset-4 hover:underline"
          >
            cách tính lương net 2026
          </Link>{" "}
          hoặc{" "}
          <Link
            href="/tinh-luong"
            className="text-accent underline-offset-4 hover:underline"
          >
            công cụ Gross → Net
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">Điều cần nhớ</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Doanh thu &quot;năm&quot; trên máy tính là đầu vào bạn nhập; cách xác
            định doanh thu chịu thuế trong hồ sơ thực tế có thể khác.
          </li>
          <li>
            Ngành hỗn hợp hoặc hoạt động đặc thù có thể không khớp một preset —
            chọn gần nhất chỉ để tham khảo.
          </li>
          <li>
            Nghĩa vụ hóa đơn, sổ sách, lệ phí môn bài và thời hạn nộp không nằm
            trong phạm vi máy tính đơn giản này.
          </li>
        </ul>
      </section>

      <aside className="rounded-xl border border-ink/10 bg-white/50 p-5 text-sm leading-relaxed text-ink-muted">
        <p className="font-medium text-ink">Miễn trừ trách nhiệm</p>
        <p className="mt-2">{DISCLAIMER_VI}</p>
        <p className="mt-3">
          Tiếp theo:{" "}
          <Link
            href="/thue-ho-kinh-doanh"
            className="text-accent underline-offset-4 hover:underline"
          >
            Mở máy tính thuế hộ kinh doanh
          </Link>
          {" · "}
          <Link
            href="/luong-toi-thieu"
            className="text-accent underline-offset-4 hover:underline"
          >
            Lương tối thiểu vùng 2026
          </Link>
        </p>
      </aside>
    </article>
  );
}
