"use client";

import { useState } from "react";
import { formatPercent, formatVnd, parseVndInput } from "@/lib/format";
import { calcGrossToNet, type GrossToNetResult } from "@/lib/salary";
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
  const [dependents, setDependents] = useState(1);
  const [region, setRegion] = useState<RegionCode>("I");
  const [result, setResult] = useState<GrossToNetResult | null>(null);

  function handleCalculate() {
    const gross = parseVndInput(grossRaw);
    setResult(calcGrossToNet(gross, dependents, region));
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Lương gross (VND)</span>
          <input
            type="text"
            inputMode="numeric"
            value={grossRaw}
            onChange={(e) => setGrossRaw(e.target.value)}
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-3 text-base text-ink outline-none ring-accent focus:ring-2"
            placeholder="VD: 20000000"
            autoComplete="off"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Số người phụ thuộc</span>
          <input
            type="number"
            min={0}
            max={20}
            value={dependents}
            onChange={(e) =>
              setDependents(Math.max(0, Number(e.target.value) || 0))
            }
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-3 text-base text-ink outline-none ring-accent focus:ring-2"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Vùng lương tối thiểu</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as RegionCode)}
            className="w-full rounded-lg border border-ink/15 bg-white px-3 py-3 text-base text-ink outline-none ring-accent focus:ring-2"
          >
            {(Object.keys(REGION_LABELS) as RegionCode[]).map((r) => (
              <option key={r} value={r}>
                {REGION_LABELS[r]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={handleCalculate}
        className="w-full rounded-xl bg-accent px-4 py-4 text-lg font-semibold text-white shadow-sm outline-none ring-offset-2 ring-offset-cream transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99]"
      >
        Tính lương net
      </button>

      {result ? (
        <div className="space-y-5">
          <div className="rounded-xl border border-accent/30 bg-white/80 p-4">
            <p className="text-sm text-ink-muted">Lương net ước tính</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-accent">
              {formatVnd(result.net)}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white/50">
            <table className="w-full min-w-[280px] text-left text-sm">
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
                  <td className="px-3 py-2">
                    BHXH ({formatPercent(BHXH_EMPLOYEE_RATE)})
                  </td>
                  <td className="px-3 py-2 text-right">−{formatVnd(result.bhxh)}</td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="px-3 py-2">
                    BHYT ({formatPercent(BHYT_EMPLOYEE_RATE)})
                  </td>
                  <td className="px-3 py-2 text-right">−{formatVnd(result.bhyt)}</td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="px-3 py-2">
                    BHTN ({formatPercent(BHTN_EMPLOYEE_RATE)})
                  </td>
                  <td className="px-3 py-2 text-right">−{formatVnd(result.bhtn)}</td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="px-3 py-2 font-medium">Tổng BH NLĐ</td>
                  <td className="px-3 py-2 text-right font-medium">
                    −{formatVnd(result.bhTotal)}
                  </td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="px-3 py-2">Giảm trừ bản thân</td>
                  <td className="px-3 py-2 text-right">
                    −{formatVnd(result.personalDeduction)}
                  </td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="px-3 py-2">
                    Giảm trừ NPT ({result.dependents})
                  </td>
                  <td className="px-3 py-2 text-right">
                    −{formatVnd(result.dependentDeduction)}
                  </td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="px-3 py-2 font-medium">Tổng giảm trừ</td>
                  <td className="px-3 py-2 text-right font-medium">
                    −{formatVnd(result.totalDeduction)}
                  </td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="px-3 py-2">Thu nhập tính thuế</td>
                  <td className="px-3 py-2 text-right">
                    {formatVnd(result.taxableIncome)}
                  </td>
                </tr>
                <tr className="border-b border-ink/5">
                  <td className="px-3 py-2">Thuế TNCN</td>
                  <td className="px-3 py-2 text-right">
                    −{formatVnd(result.personalIncomeTax)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-semibold">Lương net</td>
                  <td className="px-3 py-2 text-right font-semibold text-accent">
                    {formatVnd(result.net)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-ink">
              Thuế từng bậc
            </h3>
            <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white/50">
              <table className="w-full min-w-[320px] text-left text-sm">
                <thead className="border-b border-ink/10 text-ink-muted">
                  <tr>
                    <th className="px-3 py-2 font-medium">Bậc</th>
                    <th className="px-3 py-2 font-medium">Thuế suất</th>
                    <th className="px-3 py-2 font-medium text-right">
                      TNTT trong bậc
                    </th>
                    <th className="px-3 py-2 font-medium text-right">Thuế</th>
                  </tr>
                </thead>
                <tbody>
                  {result.brackets.map((b, i) => (
                    <tr key={i} className="border-b border-ink/5 last:border-0">
                      <td className="px-3 py-2">
                        {formatVnd(b.from)} –{" "}
                        {b.to === null ? "∞" : formatVnd(b.to)}
                      </td>
                      <td className="px-3 py-2">{formatPercent(b.rate, 0)}</td>
                      <td className="px-3 py-2 text-right">
                        {formatVnd(b.taxableInBracket)}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {formatVnd(b.taxInBracket)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2 rounded-lg border border-ink/10 bg-cream-dark/40 px-3 py-3 text-xs leading-relaxed text-ink-muted">
            <p>
              BH NLĐ: BHXH {formatPercent(BHXH_EMPLOYEE_RATE)} + BHYT{" "}
              {formatPercent(BHYT_EMPLOYEE_RATE)} + BHTN{" "}
              {formatPercent(BHTN_EMPLOYEE_RATE)} ={" "}
              {formatPercent(BH_EMPLOYEE_TOTAL_RATE)}. Giảm trừ:{" "}
              {formatVnd(PERSONAL_DEDUCTION)} + {formatVnd(DEPENDENT_DEDUCTION)}{" "}
              × NPT.
            </p>
            <ul className="list-disc space-y-1 pl-4">
              {result.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p>
              Kết quả chỉ mang tính <strong className="text-ink">ước tính</strong>
              , không thay thế cơ quan thuế / kế toán.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-ink-muted">
          Nhập số liệu rồi bấm <strong className="text-ink">Tính lương net</strong>{" "}
          để xem BHXH, BHYT, BHTN, giảm trừ, thuế từng bậc và lương net.
        </p>
      )}
    </div>
  );
}
