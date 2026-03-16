const fs = require('fs');
const path = require('path');
const uiDir = path.join(__dirname, 'src', 'components', 'ui');
fs.readdirSync(uiDir).forEach(file => {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(uiDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const newContent = content.replace(/@\d+\.\d+\.\d+/g, '');
        if (content !== newContent) fs.writeFileSync(filePath, newContent);
    }
});
