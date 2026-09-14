import {
  APPLY_BH_CEILING,
  BASE_SALARY_VND,
  BHXH_EMPLOYEE_RATE,
  BHYT_EMPLOYEE_RATE,
  BHTN_EMPLOYEE_RATE,
  DEPENDENT_DEDUCTION,
  MIN_WAGE_BY_REGION,
  PERSONAL_DEDUCTION,
  TNCN_BRACKETS,
  type RegionCode,
} from "./tax-2026";

const BH_CEILING_MULTIPLIER = 20;

const NOTE_BHXH_BHYT_PENDING =
  "Trần BHXH/BHYT (20× lương cơ sở): cần cập nhật";

export type BracketRow = {
  from: number;
  to: number | null;
  rate: number;
  taxableInBracket: number;
  taxInBracket: number;
};

export type GrossToNetResult = {
  gross: number;
  dependents: number;
  region: RegionCode;
  bhxh: number;
  bhyt: number;
  bhtn: number;
  bhTotal: number;
  incomeAfterBh: number;
  personalDeduction: number;
  dependentDeduction: number;
  totalDeduction: number;
  taxableIncome: number;
  personalIncomeTax: number;
  net: number;
  brackets: BracketRow[];
  applyCeiling: boolean;
  /** Trần BHTN = 20 × lương tối thiểu vùng */
  bhtnCap: number;
  /** Trần BHXH/BHYT = 20 × lương cơ sở; null khi chưa có mức lương cơ sở */
  bhxhBhytCap: number | null;
  bhxhBhytCeilingPending: boolean;
  notes: string[];
};

export function calcProgressiveTax(taxableIncome: number): {
  tax: number;
  brackets: BracketRow[];
} {
  let remaining = Math.max(0, taxableIncome);
  let lower = 0;
  let tax = 0;
  const brackets: BracketRow[] = [];

  for (const b of TNCN_BRACKETS) {
    const upper = b.upTo;
    const width = upper === null ? remaining : Math.max(0, upper - lower);
    const inBracket = Math.min(remaining, width);
    const taxInBracket = inBracket * b.rate;
    brackets.push({
      from: lower,
      to: upper,
      rate: b.rate,
      taxableInBracket: inBracket,
      taxInBracket,
    });
    tax += taxInBracket;
    remaining -= inBracket;
    lower = upper ?? lower;
    if (remaining <= 0) {
      // vẫn giữ các bậc còn lại với 0 để bảng đủ
      continue;
    }
  }

  return { tax, brackets };
}

function resolveBhxhBhytCeiling(gross: number): {
  cap: number | null;
  base: number;
  pending: boolean;
} {
  if (typeof BASE_SALARY_VND === "number" && Number.isFinite(BASE_SALARY_VND)) {
    const cap = BH_CEILING_MULTIPLIER * BASE_SALARY_VND;
    return { cap, base: Math.min(gross, cap), pending: false };
  }
  return { cap: null, base: gross, pending: true };
}

/**
 * Gross → Net.
 * BHTN: min(gross, 20 × LTT vùng).
 * BHXH/BHYT: min(gross, 20 × lương cơ sở) nếu BASE_SALARY_VND là số; không thì trên gross.
 */
export function calcGrossToNet(
  gross: number,
  dependents: number,
  region: RegionCode
): GrossToNetResult {
  const g = Math.max(0, gross);
  const deps = Math.max(0, Math.floor(dependents));

  const bhtnCap = BH_CEILING_MULTIPLIER * MIN_WAGE_BY_REGION[region];
  const bhtnBase = Math.min(g, bhtnCap);
  const {
    cap: bhxhBhytCap,
    base: bhxhBhytBase,
    pending: bhxhBhytCeilingPending,
  } = resolveBhxhBhytCeiling(g);

  const bhxh = bhxhBhytBase * BHXH_EMPLOYEE_RATE;
  const bhyt = bhxhBhytBase * BHYT_EMPLOYEE_RATE;
  const bhtn = bhtnBase * BHTN_EMPLOYEE_RATE;
  const bhTotal = bhxh + bhyt + bhtn;

  const incomeAfterBh = g - bhTotal;
  const personalDeduction = PERSONAL_DEDUCTION;
  const dependentDeduction = deps * DEPENDENT_DEDUCTION;
  const totalDeduction = personalDeduction + dependentDeduction;
  const taxableIncome = Math.max(0, incomeAfterBh - totalDeduction);

  const { tax, brackets } = calcProgressiveTax(taxableIncome);
  const net = g - bhTotal - tax;

  const notes: string[] = [
    `Trần BHTN (20× LTT vùng ${region}): ${bhtnCap.toLocaleString("vi-VN")} đ`,
  ];
  if (bhxhBhytCeilingPending) {
    notes.push(NOTE_BHXH_BHYT_PENDING);
  } else if (bhxhBhytCap !== null) {
    notes.push(
      `Trần BHXH/BHYT (20× lương cơ sở): ${bhxhBhytCap.toLocaleString("vi-VN")} đ`
    );
  }

  return {
    gross: g,
    dependents: deps,
    region,
    bhxh,
    bhyt,
    bhtn,
    bhTotal,
    incomeAfterBh,
    personalDeduction,
    dependentDeduction,
    totalDeduction,
    taxableIncome,
    personalIncomeTax: tax,
    net,
    brackets,
    applyCeiling: APPLY_BH_CEILING,
    bhtnCap,
    bhxhBhytCap,
    bhxhBhytCeilingPending,
    notes,
  };
}
