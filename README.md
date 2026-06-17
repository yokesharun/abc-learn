# ABC & 123 Fun! 🔤🔢

A simple, colorful, interactive learning app for 3-year-olds.

- **ABC mode** — letters A–Z, capital + small, with a picture and word (A for Apple).
- **123 mode** — numbers 1–20 with counting pictures.
- **Auto pilot** — tap ▶️ Auto and it flips through cards and speaks each one automatically.
- Talks out loud (uses the browser's built-in voice), big bouncy emojis, tap anywhere to hear it again.

Pure frontend — one `index.html`, no build step, no backend.

## Run locally
Open `index.html` in a browser, or serve the folder:
```
npx serve .
```

## Deploy to GitHub Pages
1. Create a new repo on GitHub (e.g. `abc-learn`).
2. Push this folder:
   ```
   git remote add origin https://github.com/<your-username>/abc-learn.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root**, then Save.
4. Your app will be live at `https://<your-username>.github.io/abc-learn/`.

> Tip: sound usually needs one tap/click first (browsers block autoplay audio until the user interacts).
