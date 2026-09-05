import Link from "next/link";
import { DISCLAIMER_VI } from "@/lib/tax-2026";

const footerLinks = [
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/huong-dan/cach-tinh-luong-net-2026", label: "Hướng dẫn" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/chinh-sach-bao-mat", label: "Chính sách bảo mật" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-cream-dark/40">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm leading-relaxed text-ink-muted">
        <nav className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {footerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink underline-offset-4 hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mb-4 text-xs text-ink-muted">
          Hướng dẫn:{" "}
          <Link
            href="/huong-dan/cach-tinh-luong-net-2026"
            className="text-ink underline-offset-4 hover:underline"
          >
            Cách tính lương net 2026
          </Link>
          {" · "}
          <Link
            href="/huong-dan/thue-ho-kinh-doanh-2026"
            className="text-ink underline-offset-4 hover:underline"
          >
            Thuế hộ kinh doanh 2026
          </Link>
        </p>
        <p className="font-medium text-ink">Miễn trừ trách nhiệm</p>
        <p className="mt-2">{DISCLAIMER_VI}</p>
        <p className="mt-4 text-xs">
          © {new Date().getFullYear()} Tính Lương &amp; Thuế VN — MVP tham khảo
        </p>
      </div>
    </footer>
  );
}
