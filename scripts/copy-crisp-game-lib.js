// Copies the crisp-game-lib bundle and its type definitions into public/.
// Runs on postinstall. If a future crisp-game-lib version moves these files,
// update the paths here.
const fs = require('fs');
const path = require('path');

const libDir = path.dirname(require.resolve('crisp-game-lib/package.json'));
const publicDir = path.join(__dirname, '..', 'public');

for (const file of ['bundle.js', 'bundle.d.ts']) {
    fs.copyFileSync(path.join(libDir, 'docs', file), path.join(publicDir, file));
    console.log(`Copied crisp-game-lib ${file} to public/`);
}
