# crisp-game-lib is a pinned npm dependency, not a fork

The Arcade used to live inside a GitHub fork of abagames/crisp-game-lib, which buried the Games under the whole engine and its history. We now consume the engine as the `crisp-game-lib` npm package, pinned to an exact version with the lockfile committed, and a `postinstall` script copies its `bundle.js` and `bundle.d.ts` into `public/` (both gitignored). Upgrading is a deliberate one-line version bump followed by playing every Game, so an upstream release can't silently change how a Game feels.

## Considered Options

- **CDN script tag**: no install step, but the bundle's type definitions wouldn't be available to each Game's `jsconfig.json`, and the site would depend on a third-party host at runtime.
- **Vendored copy of the bundle**: simple, but the repo would hold a stale engine copy with no record of which version it is.
- **Git submodule**: pins a version, but adds submodule friction and still needs a build or copy step.
- **Fork** (the old setup): carries upstream's history and source, is labelled "forked from" on GitHub, and keeps GitHub Issues disabled.

## Consequences

- Engine fixes go upstream as a PR to abagames/crisp-game-lib, or, while one is pending, through `patch-package`. Re-vendoring or re-forking the engine goes against this decision.
- Only the copy script knows where the bundle sits inside the package (`docs/bundle.js` in 1.5.0). If a future version moves it, update that script.
