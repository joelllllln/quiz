const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Collect script src order from index.html
const scriptRe = /<script src="([^"]+)"><\/script>/g;
let m, scripts = [];
while ((m = scriptRe.exec(html)) !== null) scripts.push(m[1]);

// fonts.css is already base64-embedded (self-contained)
const fontsCss = fs.readFileSync('fonts.css', 'utf8');

// Build inlined script blocks
const scriptBlocks = scripts.map(src => {
  const code = fs.readFileSync(src, 'utf8');
  return '<script>\n' + code + '\n</script>';
}).join('\n');

let out = html;
// Strip PWA-only bits: they reference sibling files that don't exist in the
// single-file artifact (the Artifact tool sets its own favicon/title).
[
  /<link rel="manifest"[^>]*>\n?/,
  /<link rel="icon"[^>]*>\n?/g,
  /<link rel="apple-touch-icon"[^>]*>\n?/,
  /<meta name="apple-mobile-web-app-[^"]*"[^>]*>\n?/g,
  /<meta name="mobile-web-app-capable"[^>]*>\n?/,
  /<meta name="application-name"[^>]*>\n?/,
  /<script>\s*\/\* PWA:[\s\S]*?\}\(\)\);\s*<\/script>\n?/,
].forEach(re => { out = out.replace(re, () => ''); });

// Use function replacements everywhere so `$`/`$$` in content is never
// treated as a String.replace special pattern.
// Replace the <link ... fonts.css> with an inline <style>
out = out.replace(/<link rel="stylesheet" href="fonts\.css">/,
  () => '<style>\n' + fontsCss + '\n</style>');
// Replace the whole run of <script src=...> lines with the inlined blocks.
// Remove each individual script tag line, then insert blocks before app.js position.
scripts.forEach(src => {
  out = out.replace('<script src="' + src + '"></script>\n', '');
  out = out.replace('<script src="' + src + '"></script>', '');
});
// Insert the inlined blocks right before </body>
out = out.replace('</body>', () => scriptBlocks + '\n</body>');

const dest = '/tmp/claude-0/-home-user-quiz/75bbf453-532d-59a8-98a9-0149b01e49e2/scratchpad/datasense.html';
fs.writeFileSync(dest, out);
console.log('bundled', scripts.length, 'scripts ->', dest);
console.log('size', (out.length/1024).toFixed(0), 'KB');
