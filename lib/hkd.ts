import {
  HKD_INDUSTRY_PRESETS,
  HKD_REVENUE_THRESHOLDS,
  type HkdIndustryId,
} from "./tax-2026";

export type HkdGroup = "exempt" | "group2" | "group3" | "group4";

export type HkdResult = {
  revenue: number;
  industryId: HkdIndustryId;
  industryLabel: string;
  group: HkdGroup;
  groupLabel: string;
  gtgtRate: number;
  tncnRate: number;
  gtgt: number;
  tncn: number;
  total: number;
  note: string;
};

export function resolveHkdGroup(revenue: number): {
  group: HkdGroup;
  groupLabel: string;
} {
  const r = Math.max(0, revenue);
  if (r <= HKD_REVENUE_THRESHOLDS.exemptUpTo) {
    return {
      group: "exempt",
      groupLabel: "≤ 1 tỷ — miễn GTGT + TNCN (ước tính theo nhóm)",
    };
  }
  if (r <= HKD_REVENUE_THRESHOLDS.group2UpTo) {
    return {
      group: "group2",
      groupLabel: "> 1 tỷ – 3 tỷ",
    };
  }
  if (r <= HKD_REVENUE_THRESHOLDS.group3UpTo) {
    return {
      group: "group3",
      groupLabel: "> 3 tỷ – 50 tỷ",
    };
  }
  return {
    group: "group4",
    groupLabel: "> 50 tỷ",
  };
}

/**
 * Ước tính thuế HKD đơn giản: doanh thu năm × tỷ lệ ngành.
 * Nhóm ≤1 tỷ: GTGT+TNCN = 0.
 * Các nhóm khác: dùng preset tỷ lệ (ước tính, tham chiếu NĐ 141/2026).
 */
export function calcHkdTax(
  revenue: number,
  industryId: HkdIndustryId
): HkdResult {
  const r = Math.max(0, revenue);
  const industry =
    HKD_INDUSTRY_PRESETS.find((i) => i.id === industryId) ??
    HKD_INDUSTRY_PRESETS[0];
  const { group, groupLabel } = resolveHkdGroup(r);

  if (group === "exempt") {
    return {
      revenue: r,
      industryId: industry.id,
      industryLabel: industry.label,
      group,
      groupLabel,
      gtgtRate: 0,
      tncnRate: 0,
      gtgt: 0,
      tncn: 0,
      total: 0,
      note: "Doanh thu ≤ 1 tỷ: ước tính miễn GTGT và TNCN theo khung nhóm. Vẫn cần đối chiếu điều kiện thực tế.",
    };
  }

  const gtgt = r * industry.gtgtRate;
  const tncn = r * industry.tncnRate;

  return {
    revenue: r,
    industryId: industry.id,
    industryLabel: industry.label,
    group,
    groupLabel,
    gtgtRate: industry.gtgtRate,
    tncnRate: industry.tncnRate,
    gtgt,
    tncn,
    total: gtgt + tncn,
    note: "Ước tính theo tỷ lệ trên doanh thu (preset ngành). Tham chiếu khung NĐ 141/2026 — không thay thế kê khai chính thức.",
  };
}
