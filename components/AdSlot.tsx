/**
 * Google AdSense slot. Hidden by default (no unfinished placeholder UI).
 * Enable later via `show` prop or NEXT_PUBLIC_ADS_ENABLED=true.
 */
export function AdSlot({
  label: _label,
  show,
}: {
  label?: string;
  /** Force-show the ad container (for when AdSense markup is wired). */
  show?: boolean;
} = {}) {
  const enabled =
    show === true || process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  if (!enabled) {
    return null;
  }

  return (
    <div
      className="my-6 flex min-h-[90px] items-center justify-center"
      data-ad-slot="ready"
      aria-hidden="true"
    >
      {/* TODO: AdSense — chèn <ins className="adsbygoogle"> tại đây */}
    </div>
  );
}
