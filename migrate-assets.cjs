
const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const dryRun = !process.argv.includes('--apply');

const files = {
  'Jenkinsfile': [
    ['src/assets/json', 'public/json']
  ],
  'nodejs.example.Jenkinsfile': [
    ['src/assets/json', 'public/json']
  ],
  'windows.Jenkinsfile': [
    ['src/assets/json', 'public/json']
  ],
  'README.md': [
    ['assets/json/', 'public/json/']
  ],
  'src/app/core/services/projects.service.ts': [
    ['./assets/json/projects.json', '/json/projects.json']
  ],
  'src/app/home/components/footer/footer.component.html': [
    ['src="assets/svg/', 'src="/svg/']
  ],
  'src/app/home/components/home/home.component.ts': [
    ['/assets/images/', '/images/']
  ],
  'src/app/shared/components/preview-card/preview-card.component.html': [
    ['src="assets/svg/', 'src="/svg/']
  ]
};

const replaceAll = (content, search, replacement) => {
  const count = content.split(search).length - 1;

  return {
    content: content.replaceAll(search, replacement),
    count
  };
};

const migrateFile = (relativePath, replacements) => {
  const filePath = path.join(root, relativePath);

  if (!fs.existsSync(filePath)) {
    console.log(`[SKIP] ${relativePath} (not found)`);
    return 0;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;
  let total = 0;

  for (const [search, replacement] of replacements) {
    const result = replaceAll(updated, search, replacement);

    updated = result.content;
    total += result.count;

    if (result.count > 0) {
      console.log(`  ${search} -> ${replacement} (${result.count})`);
    }
  }

  if (updated === original) {
    console.log(`[SKIP] ${relativePath} (no changes)`);
    return 0;
  }

  console.log(`[${dryRun ? 'DRY-RUN' : 'UPDATED'}] ${relativePath}`);

  if (!dryRun) {
    fs.writeFileSync(filePath, updated, 'utf8');
  }

  return total;
};

const main = () => {
  console.log(`Asset migration: ${dryRun ? 'DRY-RUN' : 'APPLY'}`);
  console.log(`Root: ${root}\n`);

  let total = 0;

  for (const [file, replacements] of Object.entries(files)) {
    total += migrateFile(file, replacements);
  }

  console.log(`\nTotal replacements: ${total}`);

  if (dryRun) {
    console.log('No files modified. Use --apply to apply changes.');
  }
};

main();

