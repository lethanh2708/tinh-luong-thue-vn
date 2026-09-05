import type { Metadata } from "next";
import Link from "next/link";
import {
  BH_EMPLOYEE_TOTAL_RATE,
  BHXH_EMPLOYEE_RATE,
  BHYT_EMPLOYEE_RATE,
  BHTN_EMPLOYEE_RATE,
  DEPENDENT_DEDUCTION,
  DISCLAIMER_VI,
  PERSONAL_DEDUCTION,
  TNCN_BRACKETS,
} from "@/lib/tax-2026";
import { formatVnd } from "@/lib/format";

export const metadata: Metadata = {
  title: "Cách tính lương net 2026 từ gross",
  description:
    "Hướng dẫn từng bước tính lương net 2026: bảo hiểm BHXH/BHYT/BHTN, giảm trừ gia cảnh, thuế TNCN lũy tiến. Kèm công cụ tính lương Gross → Net.",
};

function pct(rate: number) {
  return `${(rate * 100).toLocaleString("vi-VN")}%`;
}

export default function CachTinhLuongNetGuidePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          Hướng dẫn
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Cách tính lương net 2026 từ lương gross
        </h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Lương net là số tiền thực nhận sau khi trừ bảo hiểm bắt buộc và thuế
          thu nhập cá nhân (TNCN). Bài này tóm tắt các bước ước tính theo khung
          tham chiếu năm 2026 trên site, rồi dẫn tới{" "}
          <Link
            href="/tinh-luong"
            className="text-accent underline-offset-4 hover:underline"
          >
            công cụ tính lương Gross → Net
          </Link>
          .
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">
          Gross và net khác nhau thế nào?
        </h2>
        <p>
          <strong className="text-ink">Lương gross</strong> là mức ghi trên hợp
          đồng trước khi trừ các khoản bắt buộc.{" "}
          <strong className="text-ink">Lương net</strong> là phần còn lại sau
          bảo hiểm người lao động đóng và thuế TNCN (nếu có). Nhiều người khi
          nhận offer chỉ nhìn gross; hiểu net giúp so sánh thực tế hơn giữa các
          nơi làm việc và vùng lương tối thiểu khác nhau.
        </p>
        <p>
          Site ước tính theo công thức minh bạch trong mã nguồn; không áp trần
          đóng BHXH/BHYT trong MVP hiện tại. Kết quả chỉ mang tính tham khảo —
          xem phần miễn trừ cuối bài.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">
          Bước 1: Trừ bảo hiểm người lao động
        </h2>
        <p>
          Trên lương đóng bảo hiểm (MVP lấy theo gross), người lao động thường
          đóng tổng{" "}
          <strong className="text-ink">{pct(BH_EMPLOYEE_TOTAL_RATE)}</strong>
          , gồm:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>BHXH: {pct(BHXH_EMPLOYEE_RATE)}</li>
          <li>BHYT: {pct(BHYT_EMPLOYEE_RATE)}</li>
          <li>BHTN: {pct(BHTN_EMPLOYEE_RATE)}</li>
        </ul>
        <p>
          Ví dụ: gross 20 triệu → bảo hiểm ước khoảng 2,1 triệu. Phần còn lại
          sau BH là cơ sở để tính thu nhập chịu thuế (sau giảm trừ).
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">
          Bước 2: Áp giảm trừ gia cảnh
        </h2>
        <p>
          Theo số liệu tham chiếu trên site, giảm trừ bản thân{" "}
          <strong className="text-ink">{formatVnd(PERSONAL_DEDUCTION)}</strong>
          /tháng; mỗi người phụ thuộc hợp lệ thêm{" "}
          <strong className="text-ink">{formatVnd(DEPENDENT_DEDUCTION)}</strong>
          /tháng. Tổng giảm trừ = bản thân + (số người phụ thuộc × mức phụ
          thuộc).
        </p>
        <p>
          Thu nhập tính thuế tháng ≈ (gross − BH người lao động) − tổng giảm trừ.
          Nếu kết quả ≤ 0 thì thuế TNCN tháng đó ước bằng 0 theo khung MVP.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">
          Bước 3: Tính thuế TNCN lũy tiến
        </h2>
        <p>
          Phần thu nhập tính thuế (nếu dương) được chia theo bậc lũy tiến hàng
          tháng trong MVP:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          {TNCN_BRACKETS.map((b, i) => {
            const prev = i === 0 ? 0 : TNCN_BRACKETS[i - 1].upTo!;
            const range =
              b.upTo === null
                ? `trên ${formatVnd(prev)}`
                : `${formatVnd(prev)} – ${formatVnd(b.upTo)}`;
            return (
              <li key={i}>
                {range}: thuế {pct(b.rate)}
              </li>
            );
          })}
        </ul>
        <p>
          Thuế tháng = tổng thuế từng phần trong các bậc. Lương net ước tính =
          gross − BH người lao động − thuế TNCN.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">
          Bước 4: Đối chiếu vùng và dùng máy tính
        </h2>
        <p>
          Vùng làm việc ảnh hưởng lương tối thiểu (xem{" "}
          <Link
            href="/luong-toi-thieu"
            className="text-accent underline-offset-4 hover:underline"
          >
            bảng lương tối thiểu vùng 2026
          </Link>
          , NĐ 293/2025) và một số quy ước đóng BHTN trong thực tế. Trên công cụ
          của site, bạn chọn vùng để gắn ngữ cảnh; công thức BH MVP vẫn lấy tỷ lệ
          cố định trên gross như trên.
        </p>
        <p>
          Thay vì tự cộng tay, hãy nhập gross, số người phụ thuộc và vùng vào{" "}
          <Link
            href="/tinh-luong"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            công cụ tính lương net 2026
          </Link>
          — kết quả hiện BHXH/BHYT/BHTN, giảm trừ và thuế theo từng bước.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <h2 className="text-lg font-semibold text-ink">Lưu ý khi dùng số liệu</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Phụ cấp, thưởng, khấu trừ khác (công đoàn, tạm ứng…) có thể làm net
            thực tế khác ước tính.
          </li>
          <li>
            Trần đóng BHXH/BHYT và quy tắc địa phương có thể áp dụng ngoài MVP;
            site ghi rõ khi không áp trần.
          </li>
          <li>
            Quyết toán thuế cuối năm, giảm trừ thực tế và hồ sơ phụ thuộc theo
            hướng dẫn cơ quan thuế — không dựa duy nhất vào máy tính online.
          </li>
        </ul>
      </section>

      <aside className="rounded-xl border border-ink/10 bg-white/50 p-5 text-sm leading-relaxed text-ink-muted">
        <p className="font-medium text-ink">Miễn trừ trách nhiệm</p>
        <p className="mt-2">{DISCLAIMER_VI}</p>
        <p className="mt-3">
          Tiếp theo:{" "}
          <Link
            href="/tinh-luong"
            className="text-accent underline-offset-4 hover:underline"
          >
            Mở công cụ tính lương Gross → Net
          </Link>
          {" · "}
          <Link
            href="/huong-dan/thue-ho-kinh-doanh-2026"
            className="text-accent underline-offset-4 hover:underline"
          >
            Hướng dẫn thuế hộ kinh doanh 2026
          </Link>
        </p>
      </aside>
    </article>
  );
}
