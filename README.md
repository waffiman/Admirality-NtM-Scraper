# ⚓ Admiralty Notices to Mariners (NtM) Auto-Scraper & Live ECDIS Plotter

Automated weekly scraper for UKHO (United Kingdom Hydrographic Office) Admiralty Notices to Mariners. Every Thursday, it fetches the official weekly bulletin from `msi.admiralty.co.uk`, parses all notices (Permanent, Temporary, Preliminary, Areas & Lines), resolves cancellations, and publishes an interactive navigation chart and JRC ECDIS overlay.

---

## 🚀 Live Architecture

```
┌─────────────────────────────────┐
│ UKHO Admiralty MSI Portal       │
│ (msi.admiralty.co.uk)           │
└────────────────┬────────────────┘
                 │ 1. Publishes weekly bulletin (every Thursday)
                 ▼
┌─────────────────────────────────┐
│ GitHub Actions Workflow         │
│ (.github/workflows/scrape.yml)  │
│ - Runs every Thursday 10:00 UTC │
│ - Runs scraper/scrape.py        │
│ - Parses notices & cancellations│
│ - Updates public/notices.json   │
└────────────────┬────────────────┘
                 │ 2. Auto-commits notices.json
                 ▼
┌─────────────────────────────────┐
│ Cloudflare Pages                │
│ - Deploys public/ in ~20s       │
│ - Free SSL & Custom Domain      │
│   (e.g. admirality-ntm.pages.dev)
└────────────────┬────────────────┘
                 │ 3. Instant live access
                 ▼
┌─────────────────────────────────┐
│ Bridge Navigators & Officers    │
│ - Always up-to-date NtM map     │
│ - Export to JRC ECDIS (.uchm)   │
│ - Export to GeoJSON / CSV       │
└─────────────────────────────────┘
```

---

## 📁 Repository Structure

```
Admirality-NtM-Scraper/
├── .github/
│   └── workflows/
│       └── scrape.yml          # GitHub Actions scheduled workflow
├── scraper/
│   ├── scrape.py               # Automated PDF scraper and parser
│   └── requirements.txt        # Python dependencies (pdfplumber, requests, bs4)
├── public/                     # Root folder served by Cloudflare Pages
│   ├── index.html              # Full OPEN CALC & Auto-NtM Navigation Application
│   ├── notices.json            # Live auto-generated notices database
│   └── assets/
│       └── Auto NtM Plotting/  # Offline JS engines, Leaflet, styles, PDF.js
├── push_to_github.py           # Remote uploader tool (no local Git needed)
└── README.md
```

---

## 🛠️ Step 1: Push Files to GitHub (No Local Git Required)

Since ship computers often don't have Git installed, you have **two easy ways** to push these files:

### Method A: Web Upload (Easiest, No setup)
1. Open your repository: [github.com/waffiman/Admirality-NtM-Scraper](https://github.com/waffiman/Admirality-NtM-Scraper)
2. Click **Add file** ➔ **Upload files**
3. Drag and drop all files and folders (`.github`, `scraper`, `public`, `README.md`) into the browser
4. Click **Commit changes**

### Method B: Automated Upload Script
1. Generate a GitHub Token at [github.com/settings/tokens](https://github.com/settings/tokens) (select `repo` scope).
2. Run in terminal:
   ```bash
   python push_to_github.py --token YOUR_GITHUB_TOKEN
   ```

---

## 🌐 Step 2: Publish on Cloudflare Pages (Free Forever)

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** ➔ **Create application** ➔ **Pages** ➔ **Connect to Git**
3. Select the repository: `waffiman/Admirality-NtM-Scraper`
4. Set the build configuration:
   - **Framework preset**: `None`
   - **Build command**: *(leave blank)*
   - **Build output directory**: `public`
5. Click **Save and Deploy**.

Within 30 seconds, your site will be live at `https://admirality-ntm-scraper.pages.dev` (or your custom domain).

---

## ⏱️ Step 3: Automated Weekly Runs

- **Automatic**: Every Thursday at 10:00 UTC, GitHub Actions runs `scrape.py`, downloads the fresh UKHO bulletin, and updates `notices.json`. Cloudflare Pages redeploys the site automatically.
- **Manual**: You can also trigger an update anytime by opening the **Actions** tab on GitHub and clicking **Run workflow**.
