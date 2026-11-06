// Copies the crisp-game-lib bundle and its type definitions into public/.
// Runs on postinstall. This is the only place that records where the bundle
// sits inside the package; if a future crisp-game-lib version moves it,
// update BUNDLE_DIR.
const fs = require('fs');
const path = require('path');

const libDir = path.dirname(require.resolve('crisp-game-lib/package.json'));
// Directory inside the crisp-game-lib package holding the bundle (1.5.0).
const BUNDLE_DIR = 'docs';
const publicDir = path.join(__dirname, '..', 'public');

for (const file of ['bundle.js', 'bundle.d.ts']) {
    fs.copyFileSync(path.join(libDir, BUNDLE_DIR, file), path.join(publicDir, file));
    console.log(`Copied crisp-game-lib ${file} to public/`);
}
