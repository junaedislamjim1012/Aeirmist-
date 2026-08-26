const fs = require('fs');
const glob = require('glob'); // maybe not available, use fs
const path = require('path');

const distDir = path.join(process.cwd(), 'dist', 'assets');
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.map'));

for (const f of files) {
  const mapData = JSON.parse(fs.readFileSync(path.join(distDir, f), 'utf8'));
  const sources = mapData.sources;
  const idx = sources.findIndex(s => s.includes('AeirmistContext.tsx'));
  if (idx !== -1) {
    console.log('Found in', f);
    const content = mapData.sourcesContent[idx];
    fs.writeFileSync('restored_AeirmistContext.tsx', content, 'utf8');
    console.log('Restored to restored_AeirmistContext.tsx');
    process.exit(0);
  }
}
console.log('Not found');
