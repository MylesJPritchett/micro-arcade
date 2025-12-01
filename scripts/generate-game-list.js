const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const indexPath = path.join(docsDir, 'index.html');

// Find all directories in docs/ that contain a main.js file at their root.
const games = fs.readdirSync(docsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(dirName => {
        const mainJsPath = path.join(docsDir, dirName, 'main.js');
        return fs.existsSync(mainJsPath);
    })
    // Exclude directories starting with '_' or 'ref_'
    .filter(dirName => !dirName.startsWith('_') && !dirName.startsWith('ref_'));

console.log('Found games:', games.length > 0 ? games.join(', ') : 'none');

let indexContent = fs.readFileSync(indexPath, 'utf8');

const regex = /const games = .*/;
const replacement = `const games = ${JSON.stringify(games)}`;

if (regex.test(indexContent)) {
    indexContent = indexContent.replace(regex, replacement);
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('Successfully updated docs/index.html with the game list.');
} else {
    console.error('Error: Could not find `const games = ...` line in docs/index.html.');
    process.exit(1);
}
