import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { HkdCalculator } from "@/components/HkdCalculator";

export const metadata: Metadata = {
  title: "Thuế hộ kinh doanh 2026 — ước tính GTGT & TNCN",
  description:
    "Công cụ thuế hộ kinh doanh 2026: ước tính GTGT và TNCN theo doanh thu năm và ngành, tham chiếu khung NĐ 141/2026 (miễn ≤1 tỷ).",
};

export default function ThueHkdPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Thuế hộ kinh doanh 2026
        </h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Máy tính đơn giản: doanh thu năm + preset ngành → ước tính GTGT và TNCN.
          Có nhóm miễn khi doanh thu ≤ 1 tỷ.{" "}
          <strong className="font-medium text-ink">Tham chiếu NĐ 141/2026</strong> —
          kết quả gắn nhãn ước tính. Xem thêm{" "}
          <Link
            href="/huong-dan/thue-ho-kinh-doanh-2026"
            className="text-accent underline-offset-4 hover:underline"
          >
            hướng dẫn nhóm doanh thu &amp; ngành
          </Link>
          .
        </p>
      </header>

      <AdSlot label="Vị trí AdSense — thuế HKD" />

      <HkdCalculator />
    </div>
  );
}
