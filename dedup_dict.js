const fs = require('fs');
const path = '/home/fedora/projects/km/layout-cms-km/src/app/design-z/context/LanguageContext.tsx';
const content = fs.readFileSync(path, 'utf8');

const dictionaryMatch = content.match(/const dictionary: Translations = \{([\s\S]*?)\};/);
if (!dictionaryMatch) {
    console.log("Dictionary not found");
    process.exit(1);
}

const dictContent = dictionaryMatch[1];
const lines = dictContent.split('\n');
const newLines = [];
const seenKeys = new Set();

lines.forEach(line => {
    const match = line.match(/^\s*'([^']*)':/);
    if (match) {
        const key = match[1];
        if (seenKeys.has(key)) {
            console.log(`Removing duplicate: ${key}`);
            return; // Skip this line
        }
        seenKeys.add(key);
    }
    newLines.push(line);
});

const newContent = content.replace(
    /const dictionary: Translations = \{[\s\S]*?\};/,
    `const dictionary: Translations = {${newLines.join('\n')}};`
);

fs.writeFileSync(path, newContent);
console.log("Deduplicated dictionary.");
