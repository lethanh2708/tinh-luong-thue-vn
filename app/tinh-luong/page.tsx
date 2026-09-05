import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { GrossNetCalculator } from "@/components/GrossNetCalculator";

export const metadata: Metadata = {
  title: "Tính lương net 2026 từ Gross",
  description:
    "Công cụ tính lương net 2026: BHXH 8%, BHYT 1.5%, BHTN 1%, giảm trừ gia cảnh và thuế TNCN lũy tiến. Ước tính Gross → Net tiếng Việt.",
};

export default function TinhLuongPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Tính lương Gross → Net 2026
        </h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Nhập lương gross, số người phụ thuộc và vùng. Công cụ ước tính bảo hiểm
          người lao động (10,5%), giảm trừ và thuế TNCN lũy tiến theo tháng. Chưa
          rõ công thức? Đọc{" "}
          <Link
            href="/huong-dan/cach-tinh-luong-net-2026"
            className="text-accent underline-offset-4 hover:underline"
          >
            hướng dẫn cách tính lương net 2026
          </Link>
          .
        </p>
      </header>

      <AdSlot label="Vị trí AdSense — tính lương" />

      <GrossNetCalculator />
    </div>
  );
}
