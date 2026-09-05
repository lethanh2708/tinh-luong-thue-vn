/**
 * Placeholder cho Google AdSense.
 * Thay bằng mã AdSense khi có publisher ID.
 * Giữ class cố định để tránh CLS khi gắn quảng cáo sau.
 */
export function AdSlot({ label = "Quảng cáo" }: { label?: string }) {
  return (
    <div
      className="my-6 flex min-h-[90px] items-center justify-center rounded-md border border-dashed border-ink/20 bg-cream-dark/30 px-3 py-4 text-center text-xs text-ink-muted"
      data-ad-slot="placeholder"
      aria-hidden="true"
    >
      {/* TODO: AdSense — chèn <ins className="adsbygoogle"> tại đây */}
      <span>{label} (placeholder)</span>
    </div>
  );
}
