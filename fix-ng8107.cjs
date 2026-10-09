#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const apply = process.argv.includes('--apply');

const file = path.join(
  root,
  'src/app/contact-card/components/contact-card/contact-card.component.html'
);

const replacements = [
  {
    from: "!this.email?.errors?.['required']",
    to: "!this.email.errors['required']",
    expected: 2,
  },
];

const run = () => {
  if (!fs.existsSync(file)) {
    console.error(`[ERROR] File not found: ${file}`);
    process.exitCode = 1;
    return;
  }

  const original = fs.readFileSync(file, 'utf8');
  let updated = original;

  for (const { from, to, expected } of replacements) {
    const occurrences = updated.split(from).length - 1;

    if (occurrences !== expected) {
      console.error(
        `[ERROR] Expected ${expected} occurrences of "${from}", found ${occurrences}.`
      );
      process.exitCode = 1;
      return;
    }

    updated = updated.replaceAll(from, to);
  }

  if (updated === original) {
    console.log('[OK] No changes required.');
    return;
  }

  console.log(`Mode: ${apply ? 'APPLY' : 'DRY-RUN'}`);
  console.log(`File: ${path.relative(root, file)}`);

  for (const { from, to, expected } of replacements) {
    console.log(`\n[${apply ? 'REPLACE' : 'WOULD REPLACE'}] ${expected} occurrences`);
    console.log(`  - ${from}`);
    console.log(`  + ${to}`);
  }

  if (!apply) {
    console.log('\nRun with --apply to apply changes.');
    return;
  }

  fs.writeFileSync(file, updated, 'utf8');
  console.log('\n[OK] Changes applied.');
};

run();

