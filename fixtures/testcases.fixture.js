import { test as base } from '@playwright/test';

export const test = base.extend({
  testCaseData: async ({}, use) => {
    const testCaseData = {
      pageTitle: 'Automation Exercise - Test Cases'
    };
    await use(testCaseData);
  }
});

export { expect } from '@playwright/test';
