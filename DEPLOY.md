# ScaleUp Web — Ubuntu server e hosting (Docker + Portainer + Cloudflare Tunnel)

Ei guide follow korle `https://scaleupweb.xyz` tomar Ubuntu server theke cholbe.
Router e kono port khulte hobe na, home IP lukano thakbe, SSL free.

```
Visitor ──► Cloudflare (SSL, CDN) ──► Tunnel ──► server: "tunnel" container ──► "web" container (Next.js :3000)
```

---

## 1. Domain Cloudflare e nao (ekbar korlei hobe)

1. <https://dash.cloudflare.com> e free account kholo → **Add a domain** → `scaleupweb.xyz` → Free plan.
2. Cloudflare 2-ta nameserver dibe (jemon `xxx.ns.cloudflare.com`).
3. Hostinger e jao → **Domains → scaleupweb.xyz → DNS / Nameservers → Change nameservers** →
   Cloudflare er 2-ta nameserver bosao → Save.
4. Kichukkhon (kokhono 24 ghonta porjonto) por Cloudflare e domain **Active** dekhabe.

> Email (hello@scaleupweb.xyz) Hostinger e thakle: Cloudflare DNS e Hostinger er MX/TXT record
> gulo thik ache kina check koro (Cloudflare usually auto-import kore).

## 2. Cloudflare Tunnel banao

1. Cloudflare dashboard → **Zero Trust** → **Networks → Tunnels** → **Create a tunnel** → **Cloudflared**.
2. Nam dao: `scaleup-home-server` → Save.
3. "Install connector" page e Docker option e je command dekhay, tar **token** (`eyJ...` lomba string) copy koro.
   Eta-i `CLOUDFLARE_TUNNEL_TOKEN`. (Command ta chalate hobe na, compose file e already ache.)
4. **Public Hostnames** tab → **Add a public hostname**:
   | Subdomain | Domain | Type | URL |
   |---|---|---|---|
   | *(khali)* | scaleupweb.xyz | HTTP | `web:3000` |
   | `www` | scaleupweb.xyz | HTTP | `web:3000` |

   (`web` holo docker-compose er service er nam. `www` theke main domain e redirect site nijei kore.)

## 3. Code server e nao

**Option A — GitHub (recommended, update shohoj):**
1. Project ta ekta **private** GitHub repo te push koro.
2. Portainer → **Stacks → Add stack** → nam `scaleup-web` → **Repository**
   - Repository URL: tomar repo
   - Authentication: GitHub username + personal access token (private repo hole)
   - Compose path: `docker-compose.yml`

**Option B — Folder copy:** project folder ta server e copy koro (`node_modules` ar `.next` chara), tarpor server e:
```bash
cd ~/scaleup-web && docker compose up -d --build
```

## 4. Environment variables

Portainer stack er **Environment variables** e (ba Option B te project folder e `.env` file e):

| Name | Value |
|---|---|
| `CLOUDFLARE_TUNNEL_TOKEN` | Step 2 er token |
| `NEXT_PUBLIC_SITE_URL` | `https://scaleupweb.xyz` |
| `GOOGLE_SITE_VERIFICATION` | Step 6 er code (pore dileo hobe) |
| `BING_SITE_VERIFICATION` | Step 6 er code (pore dileo hobe) |

**Deploy the stack** chapo. Prothom build e 2–5 minute lagte pare.

## 5. Check

- Server e: `curl -I http://localhost:3100` → `200 OK` asha uchit.
- Browser e: <https://scaleupweb.xyz> khulo.
- Portainer → Containers: `scaleup-web` (healthy) ar `scaleup-tunnel` (running).
- Cloudflare → Tunnels: tunnel er status **Healthy**.

**Update korte:** GitHub e push koro → Portainer stack e **Pull and redeploy** (Re-build image on) chapo.
Option B te: notun code copy kore `docker compose up -d --build`.

## 6. Google, Bing ar AI search e site jog koro (SEO + GEO)

1. **Google Search Console** → <https://search.google.com/search-console> → Add property → **URL prefix** `https://scaleupweb.xyz`
   → verification method **HTML tag** → `content="..."` er bhitorer code ta `GOOGLE_SITE_VERIFICATION` e bosao → redeploy → Verify.
   Tarpor **Sitemaps** e `sitemap.xml` submit koro.
2. **Bing Webmaster Tools** → <https://www.bing.com/webmasters> → Search Console theke import (shobcheye shohoj),
   ba HTML tag code `BING_SITE_VERIFICATION` e. Sitemap submit koro.
   (ChatGPT search ar Copilot Bing er index use kore, tai eta GEO er jonno joruri.)
3. **Google Business Profile** → <https://business.google.com> → "ScaleUp Web", Dhaka address, website link.
   Local search ("web development company Dhaka") e dekhanor jonno.
4. **Nijer nam er jonno** ("Easin Arafat" search):
   - LinkedIn profile e website hishebe `https://scaleupweb.xyz/easin-arafat` dao.
   - Facebook, GitHub, onno profile e-o eki link dao. Joto jaygay link, Google toto taratari bujhbe ei page ta tomar.
   - Search Console → URL Inspection → `https://scaleupweb.xyz/easin-arafat` → **Request indexing**.

## Site e ja ache (SEO / GEO)

- Prottek page er alada title, description, canonical URL ar share image (Facebook/WhatsApp/LinkedIn preview).
- `sitemap.xml`, `robots.txt` (Google, Bing ar AI bot — GPTBot, ClaudeBot, PerplexityBot etc. — allowed).
- `llms.txt` — AI assistant der jonno studio er puro summary (site er data theke automatic).
- Structured data: Organization, WebSite, Person (Easin Arafat), ProfilePage, FAQ, Breadcrumb, Service.
- `/easin-arafat` — founder profile page.
- Brand icon (favicon) ar share image.
