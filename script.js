// ============ CONFIG — عدّل هنا ============
const CONFIG = {
  // رقم الواتساب بالصيغة الدولية من غير + أو مسافات (مثال: "201xxxxxxxxx").
  // لو سبته فاضي، الضغط على الواتساب هينسخ اسم المستخدم بدل ما يفتح شات.
  whatsappNumber: "",
  whatsappHandle: "@muhammad.dahab",
};

// منتجات أمازون مصر — غيّر/زوّد هنا
const PRODUCTS = [
  {
    asin: "B0GG7J99Y8",
    title: "Cotton Bath Towel Set — 4 pcs",
    ar: "طقم فوط حمام قطن ٤ قطع",
    size: "50×100 cm",
    colors: [],
  },
  {
    asin: "B0H9BXFQM4",
    title: "Cotton Bath Towel Set — 4 pcs",
    ar: "طقم فوط حمام قطن ٤ قطع",
    size: "50×100 cm",
    colors: [],
  },
  {
    asin: "B0HK3JZXCL",
    title: "Towel Set — Light Tones",
    ar: "طقم ٤ فوط — سماوي وموف",
    size: "50×100 cm",
    colors: ["#9fd3ea", "#b9a3d6", "#9fd3ea", "#b9a3d6"],
  },
  {
    asin: "B0HK3L9X67",
    title: "Towel Set — Dark Tones",
    ar: "طقم ٤ فوط — كحلي ونبيتي",
    size: "50×100 cm",
    colors: ["#1e2a4a", "#6b1e2e", "#1e2a4a", "#6b1e2e"],
  },
];
// ===========================================

const $ = (s) => document.querySelector(s);

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2200);
}

// Typing effect
(function typer() {
  const el = $("#typed");
  const words = ["AI Engineer", "Amazon Merchant — EG & US", "Automation Builder", "Founder @ EENSAN"];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { el.textContent = words.join(" · "); return; }
  let w = 0, i = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, i);
    if (!del && i < word.length) i++;
    else if (!del) { del = true; return setTimeout(tick, 1400); }
    else if (i > 0) i--;
    else { del = false; w = (w + 1) % words.length; }
    setTimeout(tick, del ? 35 : 70);
  })();
})();

// Products
(function renderProducts() {
  const box = $("#products");
  box.innerHTML = PRODUCTS.map((p, n) => `
    <a class="card" href="https://www.amazon.eg/dp/${p.asin}" target="_blank" rel="noopener">
      <div class="prod-top"><span class="rank">#${n + 1}</span><span>ASIN ${p.asin}</span></div>
      <p class="prod-title">${p.title}</p>
      <p class="prod-ar" dir="rtl" lang="ar">${p.ar} · <bdi dir="ltr">${p.size}</bdi></p>
      ${p.colors.length ? `<div class="swatches" aria-hidden="true">${p.colors.map((c) => `<i style="background:${c}"></i>`).join("")}</div>` : ""}
      <span class="prod-cta">→ view on amazon.eg</span>
    </a>`).join("");
})();

// WhatsApp
document.querySelector('[data-kind="whatsapp"]').addEventListener("click", async (e) => {
  if (CONFIG.whatsappNumber) {
    e.currentTarget.href = `https://wa.me/${CONFIG.whatsappNumber}`;
    e.currentTarget.target = "_blank";
    return;
  }
  e.preventDefault();
  try { await navigator.clipboard.writeText(CONFIG.whatsappHandle); toast(`✓ copied ${CONFIG.whatsappHandle}`); }
  catch { toast(`WhatsApp: ${CONFIG.whatsappHandle}`); }
});

// Copy-only handles (e.g. WeChat has no public profile link)
document.querySelectorAll("[data-copy]").forEach((el) => {
  el.addEventListener("click", async (e) => {
    e.preventDefault();
    const v = el.dataset.copy, label = el.dataset.label || "ID";
    try { await navigator.clipboard.writeText(v); toast(`\u2713 copied ${label}: ${v}`); }
    catch { toast(`${label}: ${v}`); }
  });
});

// vCard download
$("#vcard").addEventListener("click", () => {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Dahab;Muhammad;;;",
    "FN:Muhammad Dahab",
    "TITLE:AI Engineer & Merchant",
    "URL:https://muhammaddahab.com",
    "URL;TYPE=LinkedIn:https://www.linkedin.com/in/muhammaddahab",
    "URL;TYPE=GitHub:https://github.com/muhammaddahab",
    "URL;TYPE=Instagram:https://www.instagram.com/ig.muhammaddahab/",
    "URL;TYPE=Telegram:https://t.me/MuhammadDahab",
    "URL;TYPE=YouTube:https://www.youtube.com/@muhammaddahab",
    "X-WECHAT:muhammaddahab",
    "URL;TYPE=Facebook:https://www.facebook.com/FB.MuhammadDahab/",
    CONFIG.whatsappNumber ? `TEL;TYPE=CELL:+${CONFIG.whatsappNumber}` : `NOTE:WhatsApp ${CONFIG.whatsappHandle}`,
    "END:VCARD",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/vcard" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "muhammad-dahab.vcf";
  a.click();
  URL.revokeObjectURL(a.href);
  toast("✓ contact saved");
});

$("#year").textContent = new Date().getFullYear();
