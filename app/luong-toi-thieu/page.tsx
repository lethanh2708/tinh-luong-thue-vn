import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { MinWageTable } from "@/components/MinWageTable";

export const metadata: Metadata = {
  title: "Lương tối thiểu vùng 2026 (NĐ 293/2025)",
  description:
    "Bảng lương tối thiểu vùng 2026: mức tháng và giờ vùng I–IV theo Nghị định 293/2025. Tra cứu nhanh tiếng Việt.",
};

export default function LuongToiThieuPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Lương tối thiểu vùng 2026
        </h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Mức tháng và giờ theo{" "}
          <strong className="font-medium text-ink">NĐ 293/2025</strong> (vùng I–IV).
          Dùng để đối chiếu hợp đồng / tính các khoản liên quan lương tối thiểu.
        </p>
      </header>

      <AdSlot label="Vị trí AdSense — lương tối thiểu" />

      <MinWageTable />

      <ul className="list-disc space-y-1 pl-5 text-sm text-ink-muted">
        <li>Vùng I: 5.310.000 đ/tháng — 25.500 đ/giờ</li>
        <li>Vùng II: 4.730.000 đ/tháng — 22.700 đ/giờ</li>
        <li>Vùng III: 4.140.000 đ/tháng — 20.000 đ/giờ</li>
        <li>Vùng IV: 3.700.000 đ/tháng — 17.800 đ/giờ</li>
      </ul>
    </div>
  );
}
