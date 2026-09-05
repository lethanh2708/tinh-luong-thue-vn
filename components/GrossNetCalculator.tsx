"use client";

import { useMemo, useState } from "react";
import { formatPercent, formatVnd, parseVndInput } from "@/lib/format";
import { calcGrossToNet } from "@/lib/salary";
import {
  BH_EMPLOYEE_TOTAL_RATE,
  BHXH_EMPLOYEE_RATE,
  BHYT_EMPLOYEE_RATE,
  BHTN_EMPLOYEE_RATE,
  DEPENDENT_DEDUCTION,
  PERSONAL_DEDUCTION,
  REGION_LABELS,
  type RegionCode,
} from "@/lib/tax-2026";

export function GrossNetCalculator() {
  const [grossRaw, setGrossRaw] = useState("20000000");
  const [dependents, setDependents] = useState(0);
  const [region, setRegion] = useState<RegionCode>("I");

  const gross = parseVndInput(grossRaw);

  const result = useMemo(
    () => calcGrossToNet(gross, dependents, region),
    [gross, dependents, region]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block space-y-1.5 sm:col-span-1">
          <span className="text-sm font-medium text-ink">Lương gross (VND)</span>
          <input
            type="text"
            inputMode="numeric"
            value={grossRaw}
            onChange={(e) => setGrossRaw(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-ink outline-none ring-accent focus:ring-2"
            placeholder="VD: 20000000"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Số người phụ thuộc</span>
          <input
            type="number"
            min={0}
            max={20}
            value={dependents}
            onChange={(e) => setDependents(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-ink outline-none ring-accent focus:ring-2"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Vùng lương tối thiểu</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as RegionCode)}
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2.5 text-ink outline-none ring-accent focus:ring-2"
          >
            {(Object.keys(REGION_LABELS) as RegionCode[]).map((r) => (
              <option key={r} value={r}>
                {REGION_LABELS[r]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="rounded-lg border border-ink/10 bg-cream-dark/40 px-3 py-2 text-xs leading-relaxed text-ink-muted">
        BH người lao động: BHXH {formatPercent(BHXH_EMPLOYEE_RATE)} + BHYT{" "}
        {formatPercent(BHYT_EMPLOYEE_RATE)} + BHTN {formatPercent(BHTN_EMPLOYEE_RATE)} ={" "}
        {formatPercent(BH_EMPLOYEE_TOTAL_RATE)} lương gross.{" "}
        <strong className="text-ink">Không áp trần</strong> trong MVP này (thực tế
        BHXH/BHYT thường có trần 20× lương cơ sở; BHTN 20× lương tối thiểu vùng).
        Giảm trừ: {formatVnd(PERSONAL_DEDUCTION)} + {formatVnd(DEPENDENT_DEDUCTION)} ×
        NPT. Vùng hiện chọn: {REGION_LABELS[region]} (tham chiếu; chưa dùng để trần BH).
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-accent/30 bg-white/70 p-4">
          <p className="text-sm text-ink-muted">Lương net ước tính</p>
          <p className="mt-1 text-2xl font-semibold text-accent">{formatVnd(result.net)}</p>
        </div>
        <div className="rounded-xl border border-ink/10 bg-white/50 p-4">
          <p className="text-sm text-ink-muted">Thuế TNCN</p>
          <p className="mt-1 text-2xl font-semibold text-ink">
            {formatVnd(result.personalIncomeTax)}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white/50">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead className="border-b border-ink/10 text-ink-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Khoản</th>
              <th className="px-3 py-2 font-medium text-right">Số tiền</th>
            </tr>
          </thead>
          <tbody className="text-ink">
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">Lương gross</td>
              <td className="px-3 py-2 text-right">{formatVnd(result.gross)}</td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">BHXH ({formatPercent(BHXH_EMPLOYEE_RATE)})</td>
              <td className="px-3 py-2 text-right">−{formatVnd(result.bhxh)}</td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">BHYT ({formatPercent(BHYT_EMPLOYEE_RATE)})</td>
              <td className="px-3 py-2 text-right">−{formatVnd(result.bhyt)}</td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">BHTN ({formatPercent(BHTN_EMPLOYEE_RATE)})</td>
              <td className="px-3 py-2 text-right">−{formatVnd(result.bhtn)}</td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2 font-medium">Tổng BH NLĐ</td>
              <td className="px-3 py-2 text-right font-medium">
                −{formatVnd(result.bhTotal)}
              </td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">Thu nhập sau BH</td>
              <td className="px-3 py-2 text-right">{formatVnd(result.incomeAfterBh)}</td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">Giảm trừ bản thân</td>
              <td className="px-3 py-2 text-right">
                −{formatVnd(result.personalDeduction)}
              </td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">Giảm trừ NPT ({result.dependents})</td>
              <td className="px-3 py-2 text-right">
                −{formatVnd(result.dependentDeduction)}
              </td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">Thu nhập tính thuế</td>
              <td className="px-3 py-2 text-right">{formatVnd(result.taxableIncome)}</td>
            </tr>
            <tr className="border-b border-ink/5">
              <td className="px-3 py-2">Thuế TNCN</td>
              <td className="px-3 py-2 text-right">
                −{formatVnd(result.personalIncomeTax)}
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold">Net</td>
              <td className="px-3 py-2 text-right font-semibold text-accent">
                {formatVnd(result.net)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-ink">Bảng thuế lũy tiến</h3>
        <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white/50">
          <table className="w-full min-w-[360px] text-left text-sm">
            <thead className="border-b border-ink/10 text-ink-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Bậc</th>
                <th className="px-3 py-2 font-medium">Thuế suất</th>
                <th className="px-3 py-2 font-medium text-right">TNTT trong bậc</th>
                <th className="px-3 py-2 font-medium text-right">Thuế</th>
              </tr>
            </thead>
            <tbody>
              {result.brackets.map((b, i) => (
                <tr key={i} className="border-b border-ink/5 last:border-0">
                  <td className="px-3 py-2">
                    {formatVnd(b.from)} – {b.to === null ? "∞" : formatVnd(b.to)}
                  </td>
                  <td className="px-3 py-2">{formatPercent(b.rate, 0)}</td>
                  <td className="px-3 py-2 text-right">
                    {formatVnd(b.taxableInBracket)}
                  </td>
                  <td className="px-3 py-2 text-right">{formatVnd(b.taxInBracket)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
