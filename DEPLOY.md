# ScaleUp Web — home server e hosting

Site ta ei PC er **Ubuntu (WSL)** server e Docker diye chole, baki project gulor (Morpheus, FB Leads,
Spin & Win…) motoi. Server er niyom: `~/server/PROJECTS.md`.

```
Visitor ──► Cloudflare (SSL) ──► "home-server" tunnel (cloudflared, network "proxy") ──► scaleup-web container (:3000)
```

| Ki | Kothay |
|---|---|
| Code (server) | `~/apps/scaleup-web` (GitHub theke clone) |
| Local address | http://localhost:3006 |
| Public address | https://scaleupweb.xyz (www → main domain e redirect) |
| Cloudflare route | Tunnels → home-server → `http://scaleup-web:3000` (scaleupweb.xyz ar www) |
| Settings | `~/apps/scaleup-web/.env` (chmod 600) — `.env.example` dekho |

## Update kora (code bodlanor por)

1. Ei PC te (Windows) code bodle GitHub e push:
   ```bash
   git add -A && git commit -m "message" && git push
   ```
2. Ubuntu (WSL) terminal e:
   ```bash
   cd ~/apps/scaleup-web && git pull && docker compose up -d --build
   ```
   1–3 minute e notun version live.

## Check

- `docker ps` e `scaleup-web` → **(healthy)**
- http://localhost:3006 ar https://scaleupweb.xyz
- Dashboard (http://localhost:3001) e "ScaleUp Web" card
- 502 dekhale: `docker logs scaleup-web --tail 50`

## Google, Bing ar AI search e site jog koro (SEO + GEO)

1. **Google Search Console** → <https://search.google.com/search-console> → Add property → **Domain** → `scaleupweb.xyz`
   → je TXT record dey, Cloudflare → DNS e add koro → Verify. Tarpor **Sitemaps** e `sitemap.xml` submit koro.
   (HTML tag method chaile: code ta `.env` er `GOOGLE_SITE_VERIFICATION` e bosiye abar `docker compose up -d --build`.)
2. **Bing Webmaster Tools** → <https://www.bing.com/webmasters> → Search Console theke import → sitemap submit.
   ChatGPT search ar Copilot Bing er index use kore, tai GEO er jonno eta joruri.
3. **Google Business Profile** → <https://business.google.com> → "ScaleUp Web", Dhaka, website link.
4. **"Easin Arafat" search er jonno:**
   - LinkedIn e website hishebe `https://scaleupweb.xyz/easin-arafat` dao (Facebook, GitHub e-o).
   - Search Console → URL Inspection → `https://scaleupweb.xyz/easin-arafat` → **Request indexing**.

## Site e ja ache (SEO / GEO)

- Prottek page er alada title, description, canonical URL ar share image.
- `sitemap.xml`, `robots.txt` (Google, Bing ar AI bot — GPTBot, ClaudeBot, PerplexityBot etc. — allowed).
- `llms.txt` — AI assistant der jonno studio er summary (site er data theke automatic).
- Structured data: Organization, WebSite, Person (Easin Arafat), ProfilePage, FAQ, Breadcrumb, Service.
- `/easin-arafat` — founder profile page. Brand favicon ar share image.
