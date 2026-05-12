# HydroHEA

Multi-physics SaaS prototype for hydrogen-storage high-entropy alloys.
Pure static site — HTML + Babel-in-browser JSX + CSS, no build step.

## Run locally

Open `HydroHEA.html` directly in a modern browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000/
```

The root `index.html` redirects to `HydroHEA.html`.

## Deploy on Render

This repo ships with a [`render.yaml`](./render.yaml) Blueprint that
deploys it as a free static site.

### Option A — Blueprint (recommended)

1. Push this branch to GitHub (already done if you can read this).
2. Sign in at <https://dashboard.render.com>.
3. Click **New +** → **Blueprint**.
4. Connect the GitHub repo `Jonathan-Lukwichi/hydrogen-storage-simulation`.
5. Render reads `render.yaml` and proposes a static site named `hydrohea`.
   Click **Apply**.
6. Wait ~30 s for the first publish. The URL will look like
   `https://hydrohea.onrender.com/`.

### Option B — Manual static site

1. **New +** → **Static Site** → connect the repo.
2. Settings:
   - **Branch:** `claude/implement-hydrohea-dDQ2F` (or `main` after merge)
   - **Build Command:** *(leave empty)*
   - **Publish Directory:** `.`
3. Click **Create Static Site**.

Render auto-redeploys on every push to the configured branch.
