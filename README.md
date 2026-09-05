# Tính Lương & Thuế VN

MVP website tiếng Việt: Gross → Net 2026, thuế hộ kinh doanh (NĐ 141/2026), lương tối thiểu vùng (NĐ 293/2025).

## Công cụ

- `/` — Trang chủ
- `/tinh-luong` — Gross → Net
- `/thue-ho-kinh-doanh` — Ước tính thuế HKD
- `/luong-toi-thieu` — Lương tối thiểu vùng I–IV

## Tech

- Next.js App Router + TypeScript + Tailwind
- Client components cho máy tính
- Hằng số: lib/tax-2026.ts
- app/sitemap.ts, app/robots.ts
- AdSense placeholder: components/AdSlot.tsx

## Chạy local

```bash
cd tinh-luong-thue-vn
npm install
npm run dev
```

Mở http://localhost:3000

Build: `npm run build` rồi `npm start`.

## Lưu ý

- MVP Gross→Net: không áp trần BH (ghi rõ trên UI).
- Thuế HKD là ước tính theo preset ngành.
- Footer disclaimer trên mọi trang.

## Repo

Bước tiếp theo: push thủ công lên GitHub repo lethanh2708/tinh-luong-thue-vn
