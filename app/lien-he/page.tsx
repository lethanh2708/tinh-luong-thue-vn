import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ Tính Lương & Thuế VN qua email ltthanh2708@gmail.com. Có thể phản hồi chậm.",
};

export default function LienHePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Liên hệ
        </h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Gửi góp ý, báo lỗi công cụ hoặc câu hỏi về site.
        </p>
      </header>

      <section className="space-y-3 rounded-xl border border-ink/10 bg-white/50 p-5 text-sm leading-relaxed text-ink-muted shadow-sm">
        <p>
          Email:{" "}
          <a
            href="mailto:ltthanh2708@gmail.com"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            ltthanh2708@gmail.com
          </a>
        </p>
        <p>
          Đây là dự án cá nhân; phản hồi có thể chậm tùy thời gian. Cảm ơn bạn đã
          kiên nhẫn.
        </p>
      </section>

      <p className="text-sm text-ink-muted">
        Xem thêm{" "}
        <Link href="/gioi-thieu" className="text-accent underline-offset-4 hover:underline">
          Giới thiệu
        </Link>{" "}
        và{" "}
        <Link
          href="/chinh-sach-bao-mat"
          className="text-accent underline-offset-4 hover:underline"
        >
          Chính sách bảo mật
        </Link>
        .
      </p>
    </div>
  );
}
