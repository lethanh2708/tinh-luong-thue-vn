"use client";

import { useMemo, useState } from "react";
import { formatPercent, formatVnd, parseVndInput } from "@/lib/format";
import { calcHkdTax } from "@/lib/hkd";
import {
  HKD_INDUSTRY_PRESETS,
  HKD_REVENUE_THRESHOLDS,
  type HkdIndustryId,
} from "@/lib/tax-2026";

export function HkdCalculator() {
  const [revenueRaw, setRevenueRaw] = useState("2000000000");
  const [industryId, setIndustryId] = useState<HkdIndustryId>(
    HKD_INDUSTRY_PRESETS[0].id
  );

  const revenue = parseVndInput(revenueRaw);
  const result = useMemo(
    () => calcHkdTax(revenue, industryId),
    [revenue, industryId]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Doanh thu năm (VND)</span>
          <input
            type="text"
            inputMode="numeric"
            value={revenueRaw}
            onChange={(e) => setRevenueRaw(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-ink outline-none ring-accent focus:ring-2"
            placeholder="VD: 2000000000"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Ngành (preset)</span>
          <select
            value={industryId}
            onChange={(e) => setIndustryId(e.target.value as HkdIndustryId)}
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-ink outline-none ring-accent focus:ring-2"
          >
            {HKD_INDUSTRY_PRESETS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label} (GTGT {formatPercent(i.gtgtRate, 1)} / TNCN{" "}
                {formatPercent(i.tncnRate, 1)})
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="rounded-lg border border-ink/10 bg-cream-dark/40 px-3 py-2 text-xs leading-relaxed text-ink-muted">
        <strong className="text-ink">Ước tính</strong> theo khung nhóm doanh thu và
        tỷ lệ ngành kiểu NĐ 141/2026. Ngưỡng: ≤{" "}
        {formatVnd(HKD_REVENUE_THRESHOLDS.exemptUpTo)} miễn GTGT+TNCN; rồi tới{" "}
        {formatVnd(HKD_REVENUE_THRESHOLDS.group2UpTo)};{" "}
        {formatVnd(HKD_REVENUE_THRESHOLDS.group3UpTo)}; trên nữa là nhóm còn lại.
        Kết quả không thay thế kê khai / tư vấn thuế.
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-ink/10 bg-white/50 p-4 sm:col-span-1">
          <p className="text-sm text-ink-muted">Nhóm</p>
          <p className="mt-1 text-sm font-semibold text-ink">{result.groupLabel}</p>
        </div>
        <div className="rounded-xl border border-ink/10 bg-white/50 p-4">
          <p className="text-sm text-ink-muted">GTGT ước tính</p>
          <p className="mt-1 text-xl font-semibold text-ink">{formatVnd(result.gtgt)}</p>
          <p className="text-xs text-ink-muted">
            {formatPercent(result.gtgtRate, 1)} doanh thu
          </p>
        </div>
        <div className="rounded-xl border border-accent/30 bg-white/70 p-4">
          <p className="text-sm text-ink-muted">Tổng thuế ước tính</p>
          <p className="mt-1 text-xl font-semibold text-accent">
            {formatVnd(result.total)}
          </p>
          <p className="text-xs text-ink-muted">
            TNCN {formatVnd(result.tncn)} ({formatPercent(result.tncnRate, 1)})
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white/50">
        <table className="w-full min-w-[300px] text-left text-sm">
          <tbody className="text-ink">
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">Doanh thu năm</td>
              <td className="px-3 py-2 text-right">{formatVnd(result.revenue)}</td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">Ngành</td>
              <td className="px-3 py-2 text-right">{result.industryLabel}</td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">GTGT</td>
              <td className="px-3 py-2 text-right">{formatVnd(result.gtgt)}</td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">TNCN</td>
              <td className="px-3 py-2 text-right">{formatVnd(result.tncn)}</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Tổng</td>
              <td className="px-3 py-2 text-right font-semibold text-accent">
                {formatVnd(result.total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs leading-relaxed text-ink-muted">{result.note}</p>
    </div>
  );
}
