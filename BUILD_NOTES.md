# BUILD_NOTES

## Cách chạy

```bash
cd /workspace/tinh-luong-thue-vn
npm install
npm run build
npm run dev
```

## Trạng thái

- Project MVP tại /workspace/tinh-luong-thue-vn
- Vercel Web Analytics: package `@vercel/analytics` + `<Analytics />` in `app/layout.tsx`. Enable Web Analytics in the Vercel project dashboard (Analytics tab) once if it is not already on — usually the package + dashboard toggle is enough.

## Kiểm tra nhanh

- Trang chủ: 3 liên kết công cụ
- /tinh-luong: gross, NPT, vùng → net + BH/thuế
- /thue-ho-kinh-doanh: doanh thu + ngành → ước tính (NĐ 141/2026)
- /luong-toi-thieu: số NĐ 293/2025
- Footer disclaimer mọi trang
