# ScaleUp Web Agency Website (v2)

High-performance marketing website and conversion engine for **ScaleUp Web** (`scaleupweb.xyz`), a premier digital engineering and AI automation agency based in Dhaka, Bangladesh.

---

## ⚡ Tech Stack

- **Framework:** Next.js (App Router, latest stable) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v4 + Custom Dark System Design Tokens
- **Animations:** Motion (`motion/react`) with graceful reduced-motion fallbacks
- **Smooth Scrolling:** Lenis smooth scroll
- **Icons:** Lucide React + Custom Brand SVGs
- **Forms & Validation:** Zod + React Hook Form + Server Actions
- **SEO & Schema:** Dynamic metadata, OpenGraph, JSON-LD (`LocalBusiness`, `Service`, `FAQPage`)
- **Deploy Target:** Vercel

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure Node.js LTS (v20+ or v26+) is installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build & Test
```bash
npm run build
npm run start
```

---

## 📁 Content Architecture (Zero Code Editing Needed)

All business data lives in typed data files under `/data`:

- **Site & Contact Info:** `data/site.ts` (Phone, WhatsApp, address, license, socials)
- **Services & Packages:** `data/services.ts` (All 5 categories & 15+ sub-service deliverables)
- **Pricing & Bundles:** `data/pricing.ts` (Launch, Grow, Scale bundles + standalone rates)
- **Real Stats:** `data/stats.ts` (Delivered projects, active clients, average ROAS)
- **Client Case Studies:** `data/caseStudies.ts` (Problem, solution, real metric cards, quotes)
- **Industries:** `data/industries.ts` (Pain points, blueprints, package recommendations)
- **FAQ:** `data/faq.ts` (FAQ questions + answers indexed in Google FAQPage schema)

---

## 🌐 Deploying to Vercel & Domain Setup (`scaleupweb.xyz`)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete ScaleUp Web production site"
   git branch -M main
   git remote add origin https://github.com/your-username/scaleup-web.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import the `scaleup-web` repository.
4. Add environment variables from `.env.example` in the Vercel dashboard.
5. Click **Deploy**.
6. Under **Settings → Domains**, add `scaleupweb.xyz` and configure your DNS records (A record pointing to `76.76.21.21`).

---

## 📞 Business Details

- **Office:** Tejgaon Commercial Area, Tejgaon / Farmgate, Dhaka 1215, Bangladesh
- **Phone / WhatsApp:** +880 1645-650504
- **Email:** hello@scaleupweb.xyz
- **Trade License:** TRAD/DSCC/019482/2024
