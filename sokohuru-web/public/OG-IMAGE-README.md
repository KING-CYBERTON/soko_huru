# Open Graph Image Placeholder

## Current Status
- An SVG placeholder (`og-default.svg`) has been created
- The metadata in `app/layout.tsx` references `/og-default.png`

## Action Required
**Replace `og-default.png` with a proper branded image:**

### Specifications:
- **Dimensions:** 1200px × 630px
- **Format:** PNG
- **Content:**
  - Sokohuru branding
  - Tagline: "Creator Marketplace for East Africa"
  - Brand colors (green: #00A651)
  - High-quality graphics

### To Create the PNG:
1. Design the OG image in Figma/Photoshop/Canva
2. Export as PNG at 1200×630px
3. Replace this file at `/public/og-default.png`
4. Test with [Open Graph Debugger](https://www.opengraph.xyz/)

### Temporary Solution:
Convert the existing SVG to PNG using ImageMagick:
```bash

brew install imagemagick
convert public/og-default.svg -resize 1200x630 public/og-default.png
```

Or use an online converter: https://cloudconvert.com/svg-to-png
