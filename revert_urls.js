const fs = require('fs');
const path = require('path');

const OLD_URL = "http://127.0.0.1:8000/api/";
const NEW_URL = "https://c5tkvglx-8000.inc1.devtunnels.ms/api/";

function processDirectory(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        // Ignore node_modules, .git, etc
        if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
            processDirectory(fullPath);
        } else if (entry.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes(OLD_URL)) {
                content = content.replace(new RegExp(OLD_URL, 'g'), NEW_URL);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Done.');
