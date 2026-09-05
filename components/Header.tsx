import Link from "next/link";

const links = [
  { href: "/tinh-luong", label: "Tính lương Gross → Net" },
  { href: "/thue-ho-kinh-doanh", label: "Thuế hộ kinh doanh" },
  { href: "/luong-toi-thieu", label: "Lương tối thiểu vùng" },
];

export function Header() {
  return (
    <header className="border-b border-ink/10 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          Tính Lương &amp; Thuế VN
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-ink underline-offset-4 hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
