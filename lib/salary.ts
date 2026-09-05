import {
  APPLY_BH_CEILING,
  BH_EMPLOYEE_TOTAL_RATE,
  BHXH_EMPLOYEE_RATE,
  BHYT_EMPLOYEE_RATE,
  BHTN_EMPLOYEE_RATE,
  DEPENDENT_DEDUCTION,
  PERSONAL_DEDUCTION,
  TNCN_BRACKETS,
  type RegionCode,
} from "./tax-2026";

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

/**
 * Gross → Net.
 * BH: 10.5% gross; MVP không áp trần (APPLY_BH_CEILING = false).
 * region được giữ để UI/UX và mở rộng trần BHTN sau này.
 */
export function calcGrossToNet(
  gross: number,
  dependents: number,
  region: RegionCode
): GrossToNetResult {
  const g = Math.max(0, gross);
  const deps = Math.max(0, Math.floor(dependents));

  // Không áp trần — đóng trên gross
  const base = g;
  const bhxh = base * BHXH_EMPLOYEE_RATE;
  const bhyt = base * BHYT_EMPLOYEE_RATE;
  const bhtn = base * BHTN_EMPLOYEE_RATE;
  const bhTotal = base * BH_EMPLOYEE_TOTAL_RATE;

  const incomeAfterBh = g - bhTotal;
  const personalDeduction = PERSONAL_DEDUCTION;
  const dependentDeduction = deps * DEPENDENT_DEDUCTION;
  const totalDeduction = personalDeduction + dependentDeduction;
  const taxableIncome = Math.max(0, incomeAfterBh - totalDeduction);

  const { tax, brackets } = calcProgressiveTax(taxableIncome);
  const net = g - bhTotal - tax;

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
  };
}
