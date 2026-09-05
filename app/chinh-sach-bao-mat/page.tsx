import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description:
    "Chính sách bảo mật của Tính Lương & Thuế VN: dữ liệu kỹ thuật, cookie, Google AdSense và quyền của người dùng.",
};

export default function ChinhSachBaoMatPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Chính sách bảo mật
        </h1>
        <p className="text-sm leading-relaxed text-ink-muted">
          Cập nhật: tháng 9/2026
        </p>
      </header>

      <div className="space-y-6 text-sm leading-relaxed text-ink-muted">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-ink">1. Giới thiệu</h2>
          <p>
            Site <strong className="text-ink">Tính Lương &amp; Thuế VN</strong>{" "}
            cung cấp công cụ tính toán tham khảo (lương, thuế). Chính sách này
            mô tả dữ liệu có thể được thu thập khi bạn sử dụng site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-ink">
            2. Dữ liệu kỹ thuật
          </h2>
          <p>
            Khi bạn truy cập, máy chủ hoặc dịch vụ bên thứ ba có thể ghi nhận dữ
            liệu kỹ thuật thông thường như địa chỉ IP, loại trình duyệt, hệ điều
            hành, trang được xem và cookie cần thiết để vận hành site. Các công
            cụ tính toán chạy trên trình duyệt của bạn; chúng tôi không yêu cầu
            tạo tài khoản để dùng.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-ink">
            3. Quảng cáo và cookie bên thứ ba
          </h2>
          <p>
            Site sẽ sử dụng <strong className="text-ink">Google AdSense</strong>{" "}
            (hoặc dịch vụ quảng cáo tương tự). Google và đối tác có thể dùng
            cookie để hiển thị quảng cáo dựa trên lần truy cập trước đây của bạn
            vào site này hoặc các site khác.
          </p>
          <p>
            Bạn có thể tắt quảng cáo cá nhân hóa tại{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              https://www.google.com/settings/ads
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-ink">
            4. Không bán dữ liệu cá nhân
          </h2>
          <p>
            Chúng tôi không bán dữ liệu cá nhân của người dùng. Dữ liệu kỹ thuật
            có thể được xử lý bởi nhà cung cấp hạ tầng hoặc quảng cáo chỉ để vận
            hành site và hiển thị quảng cáo.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-ink">5. Liên hệ</h2>
          <p>
            Câu hỏi về chính sách bảo mật:{" "}
            <a
              href="mailto:ltthanh2708@gmail.com"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              ltthanh2708@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-ink">6. Cập nhật</h2>
          <p>
            Chính sách có thể được chỉnh sửa khi site thay đổi (ví dụ bật
            AdSense). Phiên bản hiện tại: <strong className="text-ink">tháng 9/2026</strong>.
          </p>
        </section>
      </div>

      <p className="text-sm text-ink-muted">
        Quay lại{" "}
        <Link href="/" className="text-accent underline-offset-4 hover:underline">
          trang chủ
        </Link>{" "}
        hoặc{" "}
        <Link href="/lien-he" className="text-accent underline-offset-4 hover:underline">
          liên hệ
        </Link>
        .
      </p>
    </div>
  );
}
