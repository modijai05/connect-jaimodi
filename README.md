# JAI MODI — HIGH-END DIGITAL BUSINESS CARD

A high-end, production-ready full-stack digital business card web application designed specifically for **Jai Modi** for the **Canton Fair**, international trade, Chinese suppliers, and global business contacts.

---

## 💎 Key Features

- **2-Page Focused Architecture**:
  - **Page 1: Digital Business Card**:
    - High-resolution Jai Modi portrait with luxury gold accent ring & verified business badge.
    - Personal Monogram / Logo (**JM**) engineered for Canton Fair business aesthetics.
    - Brand Descriptor: `BUSINESS • TRADE • GLOBAL CONNECTIONS`.
    - Primary Contact Actions: **WeChat**, **WhatsApp**, **Call**, **Email**, and **Save Contact (.VCF)**.
    - Quick actions: **Share Card** (Web Share API with clipboard fallback) & **Live QR Code** for camera-to-camera scanning.
    - **My Business Section**: Compact card for **The South Pickleball Arena** in Sitapura, Jaipur (features, active phone links, address, and high-res visiting card modal preview).
  - **Page 2: Partners, Businesses & Locations**:
    - **Partner 1: Shailendra Modi** (Business Partner portrait, active Call, WhatsApp, Email, Save Contact, and existing businesses: *The South Waterpark* & *The Palm Banquet* with visiting card modal).
    - **Partner 2: Rakesh Gupta** (Hong Kong Business Partner portrait, *Vandan Jewels - Gems & Diamonds*, verified HK Mobile, China Mobile, Office Tel, Fax, Email, and Save Contact).
    - **Locations**:
      - **India Headquarters**: B-29, New Light Colony, Tonk Road, Jaipur (Google Maps, Apple Maps, and verified AMap 高德 destination coordinates: `75.799958, 26.865328`).
      - **Hong Kong Office**: Room 8B, 8/F, Lee Wai Comm. Bldg, 1–3 Hart Ave, T.S.T., Kowloon (九龍尖沙咀赫德道1-3號利威商業大廈8樓B室) with Google Maps and Apple Maps. AMap is disabled until official HK AMap coordinates are supplied.
- **Centralized Configuration**: All personal contact details, partners, businesses, and map links live in [`src/data/config.js`](file:///j:/Jai%20Modi%20Digital%20Business%20Card%20Web/src/data/config.js).
- **Graceful Handling of Optional Info**: Unsupplied personal numbers/emails are cleanly hidden without showing broken buttons or fake placeholders.
- **Dynamic & Native .VCF Generation**: Downloads standards-compliant vCards (`Jai_Modi.vcf`, `Shailendra_Modi.vcf`, `Rakesh_Gupta.vcf`) via both Express backend API and client-side offline Blob generation.
- **PWA Ready**: Web App Manifest (`manifest.json`), service worker (`sw.js`), apple touch icon, and multi-size icons for home-screen installation.
- **Accessible & Performance Optimized**: Semantic HTML5, ARIA labels, responsive down to small viewports with no horizontal scroll, and `prefers-reduced-motion` compliance.

---

## 📂 Project Structure

```
├── public/
│   ├── assets/
│   │   ├── profiles/       # Optimized portraits (WebP + original fallbacks)
│   │   ├── businesses/     # Pickleball Arena, Waterpark & Palm Banquet cards & logos
│   │   ├── qr/             # Official WeChat and WhatsApp QR codes
│   │   └── icons/          # JM luxury monogram SVG, PWA icons (192, 512)
│   ├── favicon.svg         # Gold luxury favicon
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service Worker for offline capability
├── server/
│   └── index.js            # Express API server (config, /api/vcf/:person, static hosting)
├── src/
│   ├── data/
│   │   └── config.js       # ONE CENTRALIZED CONFIGURATION FILE
│   ├── main.js             # Client routing, modals, QR generation, VCF download
│   └── style.css           # Luxury Vanilla CSS design system
├── index.html              # Main high-end 2-page markup
├── package.json
└── vite.config.js
```

---

## 🚀 Running the Project

### 1. Development Mode (with Hot Reload)
```bash
npm run dev
```
Runs Vite development server at `http://localhost:5173`.

### 2. Build for Production
```bash
npm run build
```
Compiles and optimizes assets into `dist/`.

### 3. Start Full-Stack Production Server
```bash
npm start
```
Starts Express server on `http://localhost:3000` (or `PORT` environment variable).

---

## ⚙️ Updating Personal Information

To update Jai Modi's mobile number, email, or WeChat ID when available, edit [`src/data/config.js`](file:///j:/Jai%20Modi%20Digital%20Business%20Card%20Web/src/data/config.js):

```javascript
export const BUSINESS_CARD_CONFIG = {
  personal: {
    name: "JAI MODI",
    mobile: "+91XXXXXXXXXX",       // Insert personal mobile
    whatsapp: "91XXXXXXXXXX",      // Insert WhatsApp number (numeric with country code)
    email: "jaimodi@example.com",  // Insert email
    wechatId: "JaiModi_WeChat",    // Insert WeChat ID
    // ...
  }
}
```
The interface will automatically adapt and display the corresponding contact buttons.
