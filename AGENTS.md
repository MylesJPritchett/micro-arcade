# Micro Arcade

The Arcade: a personal collection of small browser Games built on [crisp-game-lib](https://github.com/abagames/crisp-game-lib), played from one Dashboard. This repo holds only the Games and the site glue. The engine is an npm dependency (see `docs/adr/0001-crisp-game-lib-as-pinned-npm-dependency.md`); engine changes go upstream or through `patch-package`.

Use the glossary's terms (Arcade, Game, Dashboard, Game Card, High Score) in code, commits and issues. See `GLOSSARY.md`.

## Layout

- `public/` is the published site: the Dashboard (`index.html`), one folder per Game, and `_template/`. Only site files belong here.
- `docs/`, `GLOSSARY.md` and the agent docs stay outside `public/` so they are never served.
- `scripts/generate-game-list.js` rewrites the `const games = [...]` line in `public/index.html` from the Game folders (skipping names starting with `_` or `ref_`). `npm run build` runs it, and Netlify runs `npm run build` on every deploy.
- `public/bundle.js` and `public/bundle.d.ts` are copied from the `crisp-game-lib` package on `npm install` and are gitignored. If they are missing, run `npm install`.

## Develop

`npm install`, then `npm run dev` serves `public/` with live reload on port 4000. Open a Game at `http://localhost:4000/?game=<name>`.

## Add a Game

1. Copy `public/_template` to `public/<name>` and write the Game in `public/<name>/main.js`.
2. Add a preview at `public/<name>/<name>.gif`; the Game Card shows it. With `isCapturing: true` (set in the template), crisp-game-lib records a GIF of play.
3. The Dashboard picks the Game up on deploy. To see its Game Card locally, run `npm run build` and commit the updated `public/index.html`.

High Scores are stored in the player's `localStorage` under keys derived from each Game's `title`. Keep a published Game's `title` stable: renaming it wipes every player's High Score for that Game.

## Upgrade crisp-game-lib

1. Bump the exact version of `crisp-game-lib` in `package.json` (no `^` or `~`).
2. Run `npm install` so the lockfile and the copied bundle update.
3. Play every Game with `npm run dev` and check each one still feels the same and logs no console errors.
4. Commit `package.json` and `package-lock.json` together.

If the new version moves its bundle inside the package, update the copy script (`scripts/copy-crisp-game-lib.js`); it is the only place that records where the bundle sits.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues for MylesJPritchett/micro-arcade, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five default triage labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
