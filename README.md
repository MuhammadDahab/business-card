# business-card

Personal business card — **Muhammad Dahab**, AI Engineer & Amazon Merchant (EG · US).

Live: https://muhammaddahab.com

Static site (HTML + CSS + vanilla JS), no build step, hosted on **GitHub Pages** with a custom domain.

```
.
├── index.html     # page structure
├── style.css      # editor / terminal theme
├── script.js      # CONFIG (WhatsApp number, products) + typing effect + vCard
├── favicon.svg
└── CNAME          # muhammaddahab.com
```

## Edit
- Contact links → `index.html` (section `contact.json`)
- WhatsApp number & Amazon products → top of `script.js` (`CONFIG`, `PRODUCTS`)

## Deploy (GitHub Pages)
1. **Settings → Pages →** Source: `Deploy from a branch`, Branch: `main` / `(root)`.
2. Custom domain: `muhammaddahab.com` → Save → tick **Enforce HTTPS** once available.

## DNS (Cloudflare)
| Type  | Name | Content                    | Proxy     |
|-------|------|----------------------------|-----------|
| A     | @    | 185.199.108.153            | DNS only  |
| A     | @    | 185.199.109.153            | DNS only  |
| A     | @    | 185.199.110.153            | DNS only  |
| A     | @    | 185.199.111.153            | DNS only  |
| CNAME | www  | `muhammaddahab.github.io`  | DNS only  |

Keep records **DNS only** (grey cloud) until GitHub issues the HTTPS certificate.
