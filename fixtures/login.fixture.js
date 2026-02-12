import { test as base } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

export const test = base.extend({
  createdUser: async ({}, use) => {
    const inPath = path.join(process.cwd(), 'test-data', 'created-user.json');

    async function waitForFile(filePath, timeout = 20000, interval = 500) {
      const start = Date.now();
      while (Date.now() - start < timeout) {
        try {
          await fs.access(filePath);
          return true;
        } catch (e) {
          await new Promise((r) => setTimeout(r, interval));
        }
      }
      return false;
    }

    const found = await waitForFile(inPath, 20000, 500);
    if (!found) throw new Error('Created user file not found. Run the signup test first.');
    const raw = await fs.readFile(inPath, 'utf8');
    const created = JSON.parse(raw);
    await use(created);
  }
});

export { expect } from '@playwright/test';
