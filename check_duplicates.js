const fs = require('fs');
const content = fs.readFileSync('/home/fedora/projects/km/layout-cms-km/src/app/design-z/context/LanguageContext.tsx', 'utf8');
const dictionaryMatch = content.match(/const dictionary: Translations = \{([\s\S]*?)\};/);
if (dictionaryMatch) {
    const dictContent = dictionaryMatch[1];
    const lines = dictContent.split('\n');
    const keys = {};
    lines.forEach((line, index) => {
        const match = line.match(/^\s*'([^']*)':/);
        if (match) {
            const key = match[1];
            if (keys[key]) {
                console.log(`Duplicate key: "${key}" at line ${index + 24}`); // Approx line
            }
            keys[key] = true;
        }
    });
}
