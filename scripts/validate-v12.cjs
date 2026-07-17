const fs = require('fs');
const path = require('path');

const root = path.resolve('output/超量子官网_HTML提案_V12/html');
const htmlPath = path.join(root, 'superquant-homepage-v12.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
scripts.forEach((script, index) => {
  try {
    new Function(script);
  } catch (error) {
    throw new Error(`Inline script ${index + 1}: ${error.message}`);
  }
});

const localRefs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((ref) => !/^(?:https?:|mailto:|tel:|#|javascript:)/.test(ref) && !ref.includes('${'));
const missing = [...new Set(localRefs)].filter((ref) => {
  const cleanRef = ref.split(/[?#]/)[0];
  return !fs.existsSync(path.resolve(root, cleanRef));
});

const cssFiles = [...html.matchAll(/href="([^"]+\.css)"/g)].map((match) => match[1]);
const cssMissing = [];
for (const cssFile of cssFiles) {
  const cssPath = path.resolve(root, cssFile);
  const css = fs.readFileSync(cssPath, 'utf8');
  for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    const ref = match[1];
    if (!/^(?:data:|https?:)/.test(ref) && !fs.existsSync(path.resolve(path.dirname(cssPath), ref))) {
      cssMissing.push(`${cssFile}:${ref}`);
    }
  }
}

console.log(JSON.stringify({
  inlineScripts: scripts.length,
  htmlRefs: localRefs.length,
  missing,
  cssFiles: cssFiles.length,
  cssMissing,
}, null, 2));

if (missing.length || cssMissing.length) process.exit(1);
