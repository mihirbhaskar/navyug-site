# Hindi translation guide

Every English page in `src/pages/` has a hand-written Hindi (Devanagari) copy at the same path under `src/pages/hi/`
(e.g. `src/pages/about.astro` → `src/pages/hi/about.astro`, `src/pages/impact/storm-relief.astro` →
`src/pages/hi/impact/storm-relief.astro`). The pre-commit hook in `.githooks/pre-commit` uses this file as the brief
when it asks Claude Code to bring the Hindi pages in line with English edits. Add to the glossary whenever a
native speaker corrects a term, so the fix sticks.

## Rules

1. Keep markup, classes, ids/anchors, images, inline styles, numeric data and code identical to the English page.
   Translate only human-readable text: headings, paragraphs, list items, table text, alt text, aria-labels,
   PageHero props (eyebrow/title/lede/crumb labels), display text in frontmatter arrays, button labels, and the
   `<Base title="...">` (home page title is exactly `मुख्य पृष्ठ`).
2. Import paths go one level deeper (`../layouts/Base.astro` → `../../layouts/Base.astro`; in `hi/impact/`,
   `../../../layouts/Base.astro`).
3. Internal links get a `/hi` prefix (`/about#our-story` → `/hi/about#our-story`, `/` → `/hi`). External links,
   `mailto:`, `tel:`, `/images/...` and `/nsf-upi-qr.pdf` stay unchanged.
4. When updating an existing Hindi page, change only the parts that correspond to what changed in English. Do not
   rewrite or "improve" untouched Hindi text — it may contain corrections from a native speaker.
5. Register: simple, natural, everyday Hindi that families in the community and local donors read easily — not
   heavily Sanskritised, not machine-literal. Common English loanwords are fine (स्कूल, सर्वे, NGO, पायलट, डेटा,
   UPI, QR कोड). Keep the factual, understated tone; no added flourish.
6. Western digits (1,500 / 2020 / 28). Registration numbers, PAN, IDs, UPI ID, emails, phones exactly as in English.
   Titles of cited English articles (e.g. "Rising from the rubble", The Patriot, Maktoob) stay in Latin script. The
   bank account name "M S Navyug Sanskriti Foundation, Indian Bank" stays in English.

## Glossary

| English | Hindi |
|---|---|
| Navyug Sanskriti Foundation | नवयुग संस्कृति फ़ाउंडेशन (NSF stays NSF; "Navyug" → नवयुग) |
| jhuggis | झुग्गियाँ |
| Yamuna Khadar / Chilla Khadar | यमुना खादर / चिल्ला खादर |
| Mayur Vihar Phase-I | मयूर विहार फ़ेज़-1 |
| East Delhi | पूर्वी दिल्ली |
| community | समुदाय (बस्ती when it means the settlement itself) |
| Impact & Research | प्रभाव और शोध |
| NIOS | NIOS (first mention on a page: NIOS, राष्ट्रीय मुक्त विद्यालयी शिक्षा संस्थान) |
| NIOS re-engagement pathway/track | NIOS के ज़रिए पढ़ाई में वापसी |
| open schooling | ओपन स्कूलिंग |
| bridge education / teaching | ब्रिज शिक्षा |
| documentation | दस्तावेज़ |
| DDA | डीडीए |
| Public Works Department | लोक निर्माण विभाग (PWD) |
| demolition(s) | तोड़फोड़ |
| Vanphool Pathshala | वनफूल पाठशाला |
| Aadhaar | आधार |
| RTE/EWS quota | RTE/EWS कोटा |
| dropped out | पढ़ाई छोड़ दी / स्कूल छूट गया |
| never attended school | कभी स्कूल नहीं गए |
| census | जनगणना (सर्वे) |
| household survey | घरेलू सर्वे |
| relief / storm relief | राहत / तूफ़ान राहत |
| mosquito nets | मच्छरदानियाँ |
| tarpaulin | तिरपाल |
| ration | राशन |
| skilling | कौशल प्रशिक्षण |
| pilot | पायलट कार्यक्रम |
| Donate | दान करें |
| 80G receipt | 80G रसीद |
| mission / vision | मिशन / दृष्टि |

Names: Vikram Singh → विक्रम सिंह · Naresh → नरेश · Shrishti Verma → सृष्टि वर्मा · Mihir Bhaskar → मिहिर भास्कर ·
Smitha Cunigal → स्मिता कुनिगल · Gurmeet Singh Lubana → गुरमीत सिंह लुबाना · Pushpa Kumari → पुष्पा कुमारी ·
Rupam Kumari → रूपम कुमारी · Suraj → सूरज · Basti Suraksha Manch → बस्ती सुरक्षा मंच.

Places: Uttar Pradesh → उत्तर प्रदेश · Bihar → बिहार · Madhya Pradesh → मध्य प्रदेश · Haryana → हरियाणा ·
Badaun → बदायूँ · Sahaswan → सहसवान · IGNOU → इग्नू (IGNOU) · Delhi University → दिल्ली विश्वविद्यालय.
