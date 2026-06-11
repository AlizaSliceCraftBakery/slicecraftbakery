# 🍰 Slice Craft Bakery — Website

A luxury artisan bakery website built with vanilla HTML, CSS, and JavaScript.
AI-powered menu via the Anthropic API. Works fully offline with a static fallback menu.

---

## 📁 Project Structure

```
slicecraft/
├── index.html          ← Main page (open this in your browser)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← All JavaScript + AI menu logic
├── images/
│   ├── hero-bg.svg
│   ├── about-1.svg … about-4.svg
│   ├── cake-1.svg … cake-3.svg
│   ├── cheesecake-1.svg, cheesecake-2.svg
│   ├── tart-1.svg, tart-2.svg
│   ├── sourdough-1.svg, sourdough-2.svg
│   ├── drink-1.svg, drink-2.svg
│   ├── sansrival-1.svg
│   └── gallery-1.svg … gallery-8.svg
├── .gitignore
└── README.md           ← This file
```

> **To swap in your own photos:** replace any `.svg` file in `images/`
> with a real JPEG/PNG of the same name (e.g. `cake-1.jpg`), then
> update the matching filename in `js/main.js` under `CAT_IMAGES`.

---

## 🖥️ Working Offline (Local Development)

1. Download the whole `slicecraft/` folder to your computer.
2. Double-click `index.html` — it opens in your browser instantly.
3. No server, no install, no internet needed for the basic site.
4. The AI menu auto-detects if you're offline and loads the fallback menu instead.
5. Edit `css/style.css`, `js/main.js`, or `index.html` in any text editor
   (VS Code recommended), then just refresh the browser.

---

## 🚀 Going Live — Step-by-Step

### Step 1: Create a GitHub account & repository

1. Go to [github.com](https://github.com) → Sign up (free)
2. Click **New repository** (the green button)
3. Name it: `slicecraftbakery` (or anything you like)
4. Set it to **Public**
5. Do **NOT** check "Add README" (we already have one)
6. Click **Create repository**

### Step 2: Upload your files to GitHub

**Option A — Browser upload (easiest, no Git needed):**
1. On your new empty repo page, click **uploading an existing file**
2. Drag the entire contents of your `slicecraft/` folder into the window
3. Make sure the folder structure is preserved — you should see:
   - `index.html`
   - `css/style.css`
   - `js/main.js`
   - `images/` folder with all SVG files
4. Scroll down, write a commit message like `Initial upload`
5. Click **Commit changes**

**Option B — Git command line (for future updates):**
```bash
# One-time setup (inside your slicecraft folder)
git init
git remote add origin https://github.com/YOUR_USERNAME/slicecraftbakery.git
git add .
git commit -m "Initial upload"
git push -u origin main
```

### Step 3: Deploy on Cloudflare Pages (free, fast)

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → Sign up free
2. Click **Create a project** → **Connect to Git**
3. Authorize GitHub and select your `slicecraftbakery` repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` (or just leave blank)
5. Click **Save and Deploy**
6. Cloudflare will give you a URL like `slicecraftbakery.pages.dev` — your site is live!

### Step 4: Connect your GoDaddy domain

1. In Cloudflare Pages, go to your project → **Custom domains**
2. Click **Set up a custom domain** → type `slicecraftbakery.com`
3. Cloudflare will show you **nameserver addresses** like:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
4. Go to **GoDaddy** → My Products → your domain → **DNS** → **Nameservers**
5. Change from GoDaddy nameservers to the Cloudflare ones above
6. Save — DNS changes take a few hours (up to 24h) to fully propagate
7. Once done, `slicecraftbakery.com` will load your site with free HTTPS ✅

---

## 🔄 Updating the Site Later

Every time you want to update the live site:

1. Edit files locally in the `slicecraft/` folder
2. Go to your GitHub repo → navigate to the file → click the pencil ✏️ icon to edit
   (or use git push if you set that up)
3. Cloudflare Pages auto-detects the GitHub change and redeploys in ~30 seconds

---

## 🖼️ Replacing Placeholder Images

The current `images/` folder has elegant SVG placeholders.
When you have real bakery photos:

1. Name your photo files to match (e.g. `cake-1.jpg`, `sourdough-1.jpg`)
2. Place them in the `images/` folder
3. In `js/main.js`, find `CAT_IMAGES` and update the extensions:
   ```js
   // Change:  'images/cake-1.svg'
   // To:      'images/cake-1.jpg'
   ```
4. Recommended image sizes: menu cards → 600×480px, gallery → 320×220px
5. Compress with [squoosh.app](https://squoosh.app) before uploading

---

## 🤖 AI Menu (Anthropic API)

The menu is generated live by Claude on each page load.
- Online → AI generates a fresh, realistic Filipino bakery menu
- Offline → Falls back to the 20-item hardcoded menu in `js/main.js`

The Anthropic API key is handled automatically by the Claude.ai environment.
If you deploy this yourself and want the AI menu to work on your own server,
you'd need to set up a small backend proxy (to hide your API key).
For now, the static fallback menu is perfect for the live site.

---

*Built with ❤️ using vanilla HTML · CSS · JavaScript*
