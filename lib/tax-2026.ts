/**
 * Hằng số thuế / BH / lương tối thiểu Việt Nam — tham chiếu 2025–2026.
 * Không bịa thêm mức ngoài các số đã ghi trong sản phẩm MVP.
 *
 * Nguồn (ghi chú):
 * - Giảm trừ gia cảnh TNCN: bản thân 15.500.000; phụ thuộc 6.200.000 / người / tháng
 * - Biểu thuế TNCN lũy tiến hàng tháng (MVP): 5/10/20/30/35% theo các ngưỡng dưới
 * - BH bắt buộc NLĐ: BHXH 8% + BHYT 1.5% + BHTN 1% = 10.5% lương đóng BH
 * - Lương tối thiểu vùng: NĐ 293/2025 (áp dụng từ 01/01/2026 theo văn bản)
 * - Hộ kinh doanh: tham chiếu khung NĐ 141/2026 (ước tính; không thay tư vấn pháp lý)
 */

/** Giảm trừ bản thân (VND/tháng) */
export const PERSONAL_DEDUCTION = 15_500_000;

/** Giảm trừ người phụ thuộc (VND/tháng/người) */
export const DEPENDENT_DEDUCTION = 6_200_000;

/** Tỷ lệ BH do người lao động đóng trên lương đóng BH */
export const BHXH_EMPLOYEE_RATE = 0.08;
export const BHYT_EMPLOYEE_RATE = 0.015;
export const BHTN_EMPLOYEE_RATE = 0.01;
export const BH_EMPLOYEE_TOTAL_RATE =
  BHXH_EMPLOYEE_RATE + BHYT_EMPLOYEE_RATE + BHTN_EMPLOYEE_RATE; // 0.105

/**
 * Trần đóng BHXH/BHYT thường lấy theo 20 × lương cơ sở.
 * MVP hiện tại: KHÔNG áp trần (tính trên gross).
 * Ghi rõ trên UI: "không áp trần".
 */
export const APPLY_BH_CEILING = false;

/** Lương tối thiểu vùng (VND/tháng) — NĐ 293/2025 */
export const MIN_WAGE_BY_REGION = {
  I: 5_310_000,
  II: 4_730_000,
  III: 4_140_000,
  IV: 3_700_000,
} as const;

/** Lương tối thiểu giờ (VND/giờ) — NĐ 293/2025 */
export const MIN_HOURLY_BY_REGION = {
  I: 25_500,
  II: 22_700,
  III: 20_000,
  IV: 17_800,
} as const;

export type RegionCode = keyof typeof MIN_WAGE_BY_REGION;

export const REGION_LABELS: Record<RegionCode, string> = {
  I: "Vùng I",
  II: "Vùng II",
  III: "Vùng III",
  IV: "Vùng IV",
};

/**
 * Biểu thuế TNCN lũy tiến trên thu nhập tính thuế tháng (MVP).
 * Ngưỡng: 0–10tr 5%; 10–30tr 10%; 30–60tr 20%; 60–100tr 30%; >100tr 35%.
 */
export const TNCN_BRACKETS: ReadonlyArray<{ upTo: number | null; rate: number }> = [
  { upTo: 10_000_000, rate: 0.05 },
  { upTo: 30_000_000, rate: 0.1 },
  { upTo: 60_000_000, rate: 0.2 },
  { upTo: 100_000_000, rate: 0.3 },
  { upTo: null, rate: 0.35 },
];

/** Ngưỡng doanh thu năm HKD (VND) — nhóm miễn / chịu thuế theo khung NĐ 141/2026 style */
export const HKD_REVENUE_THRESHOLDS = {
  exemptUpTo: 1_000_000_000, // ≤ 1 tỷ: miễn GTGT + TNCN (ước tính theo nhóm)
  group2UpTo: 3_000_000_000, // >1–3 tỷ
  group3UpTo: 50_000_000_000, // >3–50 tỷ
  // >50 tỷ: nhóm còn lại
} as const;

/**
 * Preset ngành — tỷ lệ ước tính trên doanh thu (GTGT % / TNCN %).
 * Giữ minh bạch; UI gắn nhãn "ước tính" và trích NĐ 141/2026.
 * Không bịa thêm ngành ngoài danh sách này.
 */
export const HKD_INDUSTRY_PRESETS = [
  {
    id: "phan_phoi_cung_cap_hang_hoa",
    label: "Phân phối, cung cấp hàng hóa",
    gtgtRate: 0.01,
    tncnRate: 0.005,
  },
  {
    id: "dich_vu_xay_dung_khong_vat_tu",
    label: "Dịch vụ, xây dựng không bao thầu nguyên vật liệu",
    gtgtRate: 0.05,
    tncnRate: 0.02,
  },
  {
    id: "san_xuat_van_tai_dich_vu_kem_hang_hoa",
    label: "Sản xuất, vận tải, dịch vụ kèm hàng hóa",
    gtgtRate: 0.03,
    tncnRate: 0.015,
  },
  {
    id: "hoat_dong_khac",
    label: "Hoạt động kinh doanh khác",
    gtgtRate: 0.02,
    tncnRate: 0.01,
  },
] as const;

export type HkdIndustryId = (typeof HKD_INDUSTRY_PRESETS)[number]["id"];

export const DISCLAIMER_VI =
  "Công cụ chỉ mang tính tham khảo, ước tính. Không thay thế tư vấn pháp lý / kế toán chính thức. Số liệu theo các văn bản được ghi chú trên từng trang; bạn nên đối chiếu văn bản gốc trước khi quyết định.";
