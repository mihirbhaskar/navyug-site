# Navyug Sanskriti Foundation website

Source for **[navyugsanskriti.org](https://navyugsanskriti.org)**, the website of Navyug Sanskriti Foundation (NSF).
It is a static site built with [Astro](https://docs.astro.build), and it has an English and a Hindi version.
Cloudflare Pages hosts it and redeploys it automatically every time `main` is pushed to GitHub.

You can do most edits without knowing Astro. Every page is mostly plain HTML, and the steps below cover the usual
tasks.

---

## Quick start

You need **Node.js 22 or newer** (`node -v` to check) and git.

```sh
git clone git@github.com:mihirbhaskar/navyug-site.git
cd navyug-site
npm install
git config core.hooksPath .githooks   # turns on the Hindi check before each commit (see below)
npm run dev                           # opens the site at http://localhost:4321
```

The dev server reloads the page as you save files. Stop it with `Ctrl+C`. To run it in the background instead, use
`npx astro dev --background`; `npx astro dev status`, `logs` and `stop` manage it.

| Command | What it does |
|---|---|
| `npm run dev` | Local preview with live reload |
| `npm run build` | Builds the final site into `dist/`. This is what Cloudflare runs, so use it to check nothing is broken |
| `npm run preview` | Serves the built `dist/` locally |

---

## Where things live

```
src/
  pages/              One file per page. The file path is the URL.
    index.astro         → /            (home)
    about.astro         → /about
    programs.astro      → /programs
    team.astro          → /team
    stories.astro       → /stories
    donate.astro        → /donate
    contact.astro       → /contact
    impact/
      index.astro       → /impact      ("What we have done so far")
      surveys-and-research.astro
      mosquito-nets.astro
      storm-relief.astro
    hi/               Hindi copies of every page above, same file names → /hi, /hi/about, ...
  layouts/Base.astro  Header, navigation, language toggle and footer, in both languages
  components/         PageHero (the title band at the top of inner pages), CommunityMap (the Leaflet map)
  data/boundaries.json  Map outlines of the areas we work in
  styles/global.css   All styling: colours, fonts, layout
public/               Files served as-is: images/, favicon, nsf-upi-qr.pdf
TRANSLATION.md        Rules and word list for the Hindi pages
.githooks/pre-commit  The Hindi check that runs before each commit
```

---

## Making changes

### Edit text on a page
Open the page in `src/pages/` and change the text between the HTML tags. Save the file and check it in the dev
server.

Each English page has a Hindi copy in `src/pages/hi/` (see [Hindi version](#hindi-version)).

### Add or replace a photo
1. Put the image in the right folder under `public/images/`, e.g. `public/images/community/new-photo.jpeg`.
   Keep files under about 500 KB; large phone photos should be resized first.
2. Reference it from the page by its path without `public`:
   `<img src="/images/community/new-photo.jpeg" alt="Short description of the photo" loading="lazy" />`

Always write a real `alt` description; screen readers rely on it. Get the family's consent before publishing
photos of children.

### Add a new page
1. Create `src/pages/new-page.astro`, copying an existing page such as `contact.astro` as a starting point.
2. To put it in the menu, add it to `links` / `moreLinks` in `src/layouts/Base.astro`. Add the label in both the
   `hi` and `en` blocks of the `t` object.
3. Create the Hindi copy at `src/pages/hi/new-page.astro`. The commit check can create it for you.

### Change colours or fonts
They're defined as variables at the top of `src/styles/global.css` (`--primary` teal, `--accent` saffron,
`--font-head` Source Serif 4, `--font-body` Inter). Hindi pages use the Noto Devanagari fonts, set further down
under `:root:lang(hi)`.

### Update contact details, phone numbers or registration info
- Footer: `src/layouts/Base.astro`, for both languages.
- Contact page: `src/pages/contact.astro`.
- Donate page: `src/pages/donate.astro`.
- About page, "Legal & registration status": `src/pages/about.astro`.

Then update the matching `hi/` pages.

---

## Hindi version

Every page has a hand-written Hindi translation under `src/pages/hi/`. The **हिंदी / English** button in the header
switches to the same page in the other language. The header and footer text for both languages is in
`src/layouts/Base.astro`.

The Hindi pages are ordinary files, so they don't update themselves. To keep them from drifting out of date, a
**pre-commit check** runs whenever a commit includes changes to English pages:

```
hindi-sync: English pages changed:
- src/pages/about.astro  ->  src/pages/hi/about.astro
Is the Hindi version up to date for these pages?
  [u] Update the Hindi pages with Claude Code, then commit
  [y] Yes, I've checked the Hindi pages myself; commit as is
  [n] No, cancel the commit so I can fix it
```

- **`u`** runs [Claude Code](https://claude.com/claude-code) without opening it, using your Claude login (no API
  key needed).
  - It reads what changed in the English page and updates only those parts of the Hindi page, following
    `TRANSLATION.md`.
  - It then adds the Hindi files to the commit, shows you what changed, and asks for confirmation.
  - It takes a minute or two.
- **`y`** is for when you've updated the Hindi yourself, or the change doesn't affect wording (e.g. a style tweak).
- **`n`** cancels the commit.
- **Committing from VS Code's Source Control panel:** there's no terminal for the question, so the hook runs the
  Claude Code update automatically.

**Requirements and options**
- The check needs `git config core.hooksPath .githooks` to have been run once in your copy of the repo.
- The `u` option needs Claude Code installed and logged in.
- Skip the check for one commit: `SKIP_HINDI=1 git commit -m "..."` or `git commit --no-verify`.
- See which pages it would check, without translating: `DRY_RUN=1 .githooks/pre-commit`.

**Improving the translations.** Machine-assisted Hindi should be read by a native speaker (e.g. Vikram), especially
names, legal and tax terms, and NGO vocabulary. When a term is corrected:
1. Fix it in the `hi/` page.
2. Add it to the glossary in `TRANSLATION.md`.

Future automatic updates will then use the corrected term, and won't overwrite Hindi text that wasn't affected by
an English change.

---

## Publishing (Cloudflare Pages)

The site deploys automatically. Pushing to `main` is publishing:

```sh
git add -A
git commit -m "Describe the change"   # the Hindi check runs here
git push
```

Cloudflare picks up the push, runs `npm run build`, and the new version is live at navyugsanskriti.org within a
couple of minutes. If the build fails, the previous version stays live. The error shows in the Cloudflare dashboard
under **Workers & Pages → navyug-site → Deployments**.

**Previewing before going live:** push to any other branch, e.g. `git push origin draft-donate-page`. Cloudflare
builds a separate preview URL for it, shown in the Deployments list, which you can share for review. Merge into
`main` when it's ready.

**Cloudflare settings, for reference:**

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22` |
| Production branch | `main` |

**Domain:**
- `navyugsanskriti.org` is registered with, and its DNS is managed by, Cloudflare.
- Both `navyugsanskriti.org` and `www.navyugsanskriti.org` are attached to the Pages project under **Custom
  domains**. Cloudflare issues the HTTPS certificates automatically.
- The www → root redirect is a **Redirect Rule** on the domain itself (dashboard → navyugsanskriti.org → Rules), not
  in the Pages project.

**Rolling back:** in **Deployments**, open any earlier deployment and choose **Rollback to this deployment**. Or
revert the commit in git and push.

---

## Things to keep in mind

- **The repo is public.** Don't commit drafts, internal documents, personal photos, bank details beyond what's
  already on the Donate page, or anything private. Keep source material like the content draft outside the repo
  folder, or add it to `.gitignore`. Run `git status` before committing to check what's included.
- `compressHTML: false` in `astro.config.mjs` is deliberate. Without it, spaces before inline links in paragraphs
  disappear.
- **The map** (`CommunityMap.astro`) loads Leaflet from cdnjs and map tiles from OpenStreetMap, so it needs an
  internet connection even in local preview.
- **Sources:** facts about Yamuna Khadar on the About page are cited inline to news articles (Maktoob, The Patriot,
  India Water Portal). Keep citations when editing those paragraphs.
