const fs = require('fs');
const path = require('path');

function search(dir) {
    let results = [];
    try {
        const list = fs.readdirSync(dir);
        for (const file of list) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                if (file === 'brain' || file === 'antigravity-backup') continue;
                results = results.concat(search(fullPath));
            } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.json'))) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    if (content.includes('image path must be within')) {
                        results.push(fullPath);
                    }
                } catch (e) {}
            }
        }
    } catch (e) {}
    return results;
}

const found = search('C:\\Users\\Mizu\\.gemini');
console.log('Found:', found);
