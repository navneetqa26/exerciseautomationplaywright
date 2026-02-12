import { test as base } from '@playwright/test';

export const test = base.extend({
  user: async ({}, use) => {
    const timestamp = Date.now();
    const user = {
      name: 'user' + timestamp,
      email: 'user' + timestamp + '@example.com',
      password: 'Password123'
    };
    await use(user);
  }
});

export { expect } from '@playwright/test';