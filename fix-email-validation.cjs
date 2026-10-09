#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const apply = process.argv.includes('--apply');

const file = path.join(
  __dirname,
  'src/app/contact-card/components/contact-card/contact-card.component.html'
);

const replacements = [
  [
    "this.email?.errors?.['email'] && !this.email?.errors?.['required']",
    "form.hasError('email', 'email')"
  ],
  [
    "this.email?.errors?.['email'] && !this.email.errors['required']",
    "form.hasError('email', 'email')"
  ],
  [
    "this.email?.errors?.['required']",
    "form.hasError('required', 'email')"
  ]
];

const main = () => {
  console.log(`Mode: ${apply ? 'APPLY' : 'DRY-RUN'}`);
  console.log(`File: ${path.relative(__dirname, file)}\n`);

  if (!fs.existsSync(file)) {
    console.error('[ERROR] File not found.');
    process.exitCode = 1;
    return;
  }

  const original = fs.readFileSync(file, 'utf8');
  let updated = original;
  let count = 0;

  for (const [from, to] of replacements) {
    const occurrences = updated.split(from).length - 1;

    if (occurrences === 0) continue;

    updated = updated.replaceAll(from, to);
    count += occurrences;

    console.log(
      `[${apply ? 'REPLACE' : 'WOULD REPLACE'}] ${occurrences} occurrence(s)`
    );
    console.log(`  - ${from}`);
    console.log(`  + ${to}\n`);
  }

  if (count === 0) {
    console.log('[OK] No changes needed.');
    return;
  }

  if (!apply) {
    console.log(`Total: ${count} replacement(s).`);
    console.log('\nRun with --apply to apply changes.');
    return;
  }

  fs.writeFileSync(file, updated, 'utf8');
  console.log(`[OK] Applied ${count} replacement(s).`);
};

main();

