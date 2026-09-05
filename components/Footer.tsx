import { DISCLAIMER_VI } from "@/lib/tax-2026";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-cream-dark/40">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm leading-relaxed text-ink-muted">
        <p className="font-medium text-ink">Miễn trừ trách nhiệm</p>
        <p className="mt-2">{DISCLAIMER_VI}</p>
        <p className="mt-4 text-xs">
          © {new Date().getFullYear()} Tính Lương &amp; Thuế VN — MVP tham khảo
        </p>
      </div>
    </footer>
  );
}
