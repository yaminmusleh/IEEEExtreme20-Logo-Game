# IEEE Xtreme 20 Logo Challenge

A 10-round logo guessing game for IEEE Xtreme 20 (IEEE Computer Society).
React + Vite + JavaScript + Material UI. Frontend-only prototype.

## Run locally
1. Install Node.js 18+ (https://nodejs.org). Check: `node -v`
2. `npm install`
3. `npm run dev`  ->  open http://localhost:5173
4. Stop the server with Ctrl + C

Other commands: `npm run build` (production build in `dist/`), `npm run preview`,
`npm run verify` (offline self-checks), `npm run verify:remote` (also checks every logo URL).

## Customize (all in `src/config/gameConfig.js`)
Rounds, easy/medium/hard split (must add up to the total), qualification threshold,
points per correct answer, event name, all screen text, colors, branding paths, logo source.
If the split doesn't add up to the number of rounds, the game warns in the console and adjusts it.

## Add or replace logos
- Add one line to `src/data/logoDatabase.js`:
  `entry("slug", "Display Name", CATEGORY, difficulty, ["alias one", "alias two"])`
- The slug must exist at https://simpleicons.org (look at the icon's page or its file name).
- Difficulty: 1 very recognizable, 2 easy, 3 moderate, 4 difficult, 5 niche.
- Aliases are optional extras; the canonical name is always accepted.
  Case, spaces, accents and punctuation are ignored (`Node.js` = `nodejs` = `node js`),
  but `+` and `#` are kept so `C`, `C++` and `C#` are different answers.
- Run `npm run verify:remote` to confirm the new logo loads.

## Use local logo files (recommended for the live event)
Remote logos need the participant's phone to reach cdn.jsdelivr.net. Local files are faster
and keep working if that CDN is blocked.
1. Download each SVG, name it `<id>.svg`, and place it in `public/logos/`
   (for example `github.svg`). Simple Icons is a free npm package: `npm install simple-icons`,
   then copy files from `node_modules/simple-icons/icons/` into `public/logos/`.
2. In `gameConfig.js` set `logos.source: "local"`.
3. Run `npm run verify` to list any missing files.
Note: the remote `13` version range follows new 13.x releases. Simple Icons occasionally
removes brand icons, so confirm with `npm run verify:remote` before the event.

## Brand assets
No official IEEE logos are included. Place approved files in `public/branding/` and set the paths
in `gameConfig.js`.

## Troubleshooting
- `npm: command not found` / `node: command not found`: install Node.js, then reopen the terminal.
- `Failed to resolve import "@mui/..."`: run `npm install` in the project folder.
- `Failed to resolve import "./components/X.jsx"`: file name or folder is misspelled; paths are case-sensitive.
- Blank white page: open the browser console (F12). Usually a missing file or a typo in an import.
- Port 5173 busy: Vite picks the next port and prints it; use that URL.
- A logo shows "Logo unavailable": the slug doesn't exist or the CDN is unreachable. Run
  `npm run verify:remote`, fix or remove the entry, or switch to local files.

## Limitations of a frontend-only app (important)
- The answer key (`logoDatabase.js`) is bundled into the JavaScript the browser downloads.
  Anyone can read it with developer tools. Remote image URLs also contain the logo's slug.
- The score is calculated in the browser, so it can be manipulated. It is not verified.
- Therefore the app never issues a coupon code. It only says eligibility is subject to
  organizer verification. Use it for engagement, not for monetary prizes.
- Nothing is stored: no localStorage, no cookies, no personal data are collected.

## For a real campaign with valuable coupons: add a backend
The backend should:
1. Pick the 10 logos server-side (reuse `selectRandomLogos.js`) and return only `{ sessionId, rounds: [{ roundId, imageUrl }] }`.
2. Keep names/aliases on the server and validate each submitted answer there (reuse `normalizeAnswer.js`).
3. Calculate and store the score; return it only after round 10.
4. Reject duplicate submissions per round/session and rate-limit by IP or device.
5. Check eligibility server-side before issuing a one-time coupon code.
6. If you collect contact details, collect only what you need, say why, and delete it after the campaign.

Moving over without rewriting the UI: the UI only talks to `useGame.js`. Replace
`selectRandomLogos(...)` in `startGame` with `POST /api/sessions`, and the scoring in
`submitAnswer` with `POST /api/sessions/:id/answers` plus `GET /api/sessions/:id/result`.
Components, theme, and config stay as they are. Move `logoDatabase.js` and the two utils to the server.

## Deploy (beginner-friendly: Netlify or Vercel, both free)
Option A, drag and drop (fastest):
1. `npm run build` creates the `dist/` folder.
2. Go to https://app.netlify.com/drop and drag the `dist` folder onto the page.
3. Netlify gives you a public URL like `https://something.netlify.app`. You can rename it in Site settings.

Option B, via GitHub (auto-updates on every push):
1. Push the project to a GitHub repository.
2. In Vercel or Netlify choose "Import project" and pick the repo.
3. Build command `npm run build`, output directory `dist`. Deploy.

Then turn the URL into a QR code (any free QR generator) and share the link or QR on Instagram.
Test on a real phone over mobile data before announcing it.
Hosting only serves static files; it does not make validation or coupon verification secure.