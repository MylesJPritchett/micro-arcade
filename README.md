# Micro Arcade

A personal collection of small browser Games, played from a single Dashboard that shows each Game's preview and your High Score.

## Play locally

```sh
npm install
npm run dev
```

Then open `http://localhost:4000` for the Dashboard, or `http://localhost:4000/?game=<name>` for a single Game.

## Add a Game

1. Copy `public/_template` to `public/<name>` and write the Game in `main.js`.
2. Add a preview GIF at `public/<name>/<name>.gif`.
3. The Dashboard's Game list is regenerated on deploy (run `node scripts/generate-game-list.js` to update it locally).

Keep a Game's `title` stable once it's published: High Scores are keyed on it.

## Credits

Built on [crisp-game-lib](https://github.com/abagames/crisp-game-lib) by abagames.

## License

[MIT](LICENSE)
