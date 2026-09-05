import { formatVnd } from "@/lib/format";
import {
  MIN_HOURLY_BY_REGION,
  MIN_WAGE_BY_REGION,
  REGION_LABELS,
  type RegionCode,
} from "@/lib/tax-2026";

export function MinWageTable() {
  const regions = Object.keys(MIN_WAGE_BY_REGION) as RegionCode[];

  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white/50">
      <table className="w-full min-w-[360px] text-left text-sm">
        <thead className="border-b border-ink/10 text-ink-muted">
          <tr>
            <th className="px-3 py-2.5 font-medium">Vùng</th>
            <th className="px-3 py-2.5 font-medium text-right">Tháng (VND)</th>
            <th className="px-3 py-2.5 font-medium text-right">Giờ (VND)</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((r) => (
            <tr key={r} className="border-b border-ink/5 last:border-0">
              <td className="px-3 py-2.5 font-medium text-ink">{REGION_LABELS[r]}</td>
              <td className="px-3 py-2.5 text-right text-ink">
                {formatVnd(MIN_WAGE_BY_REGION[r])}
              </td>
              <td className="px-3 py-2.5 text-right text-ink">
                {formatVnd(MIN_HOURLY_BY_REGION[r])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
