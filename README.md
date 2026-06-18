# ABC & 123 Fun! 🔤🔢

A colorful, talking, interactive learning app for 3-year-olds. Pure frontend — no build step, no backend, all pictures are hand-made **SVG** so it stays crisp at any size and works fully offline.

## Features
- **7 decks** — ABC (A–Z), 123 (1–20), Colors, Shapes, Animals, Fruits, and **Rhymes**. Each card has a picture, the word, and is spoken aloud in a clear **women's voice**.
- **Nursery rhymes** — 8 traditional/public-domain rhymes (Twinkle Twinkle, Baa Baa Black Sheep, Humpty Dumpty, Jack and Jill, Hickory Dickory Dock, Itsy Bitsy Spider, Row Your Boat, Mary Had a Little Lamb) with a picture; recited **line-by-line with the active line highlighted** and gentle music.
- **Memory match game** — flip cards to find matching pairs from any deck; pair count adapts to screen size and it celebrates when the board is cleared.
- **Mobile-app layout** — slim top bar, a swipeable deck-chip strip, a big learning stage, and a bottom tab bar (🏠 Learn · 🎮 Play · ⚙️ Settings). Games open in a **Play** sheet and toggles/speed in a **Settings** sheet, so the main screen stays clean. Fully responsive (phone → desktop).
- **Phonics** — letters say their name *and* their sound ("A… A says ah… A for Apple").
- **Numbers with counting** — the digit plus that many relevant SVG objects (3 = three stars), and it counts out loud.
- **Auto pilot** — flips through the deck on its own; speed slider (🐢–🐇). Celebrates 🎉 at the end.
- **Quiz game** — "Find the B!" with three picture/letter choices, cheers on correct, gentle retry on wrong.
- **Tracing** — trace the letter with a finger on a dotted guide.
- **Song mode** — alphabet auto-plays with gentle background music.
- **Tap to play** — tap the picture for a pop, confetti, and to hear it again.
- **Capital / small** toggle for focused letter practice (Aa → A → a).
- **Sound & music** toggles, **fullscreen** kiosk button.
- **Mobile-first & responsive**, swipe left/right to change cards, big touch targets, safe-area aware.
- **Accessible** — ARIA labels, respects `prefers-reduced-motion`.
- **PWA** — installable ("Add to Home Screen") and works offline via a service worker.
- **Settings saved** across reloads (last deck, speed, sound/music, letter case).

## Project layout
```
index.html              app shell
css/styles.css          all styles (responsive)
js/svg.js               SVG icon library (all pictures)
js/data.js              deck content
js/audio.js             Web Audio sounds + speech
js/app.js               app logic, games, PWA
icon.svg / favicon.svg  app logo (SVG)
icon-192.png/-512.png   PWA icons (generated from icon.svg)
manifest.webmanifest    PWA manifest
sw.js                   offline service worker
.github/workflows/deploy.yml   auto-deploy to GitHub Pages
```

## Run locally
Open with any static server (service workers/modules need http, not `file://`):
```
npx serve .
```
Then visit the printed URL.

## Deploy to GitHub Pages (automatic)
1. Create a repo on GitHub (e.g. `abc-learn`) and push:
   ```
   git remote add origin https://github.com/<your-username>/abc-learn.git
   git branch -M main
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` then builds and publishes automatically (see `.github/workflows/deploy.yml`).
   Your app will be live at `https://<your-username>.github.io/abc-learn/`.

> Prefer the manual way? Settings → Pages → *Deploy from a branch* → `main` / root also works — `.nojekyll` is included.

## Regenerating the PNG icons
The PWA PNG icons are generated from `icon.svg`:
```
npx -y sharp-cli -i icon.svg -o icon-512.png resize 512 512
npx -y sharp-cli -i icon.svg -o icon-192.png resize 192 192
```
Modern browsers also accept the SVG icon directly, so the PNGs are just a fallback.

## Voice
Speech uses the browser's built-in voices and prefers a clear female voice (Samantha on
macOS/iOS, otherwise the device's best available female English voice). It only speaks with
voices installed on the device, so the exact sound varies by platform.

> Tip: sound needs one tap/click first — browsers block audio until the user interacts.
