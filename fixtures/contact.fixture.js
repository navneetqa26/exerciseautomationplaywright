import { test as base } from '@playwright/test';

export const test = base.extend({
  contactData: async ({}, use) => {
    const contact = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message for contact form'
    };
    await use(contact);
  }
});

export { expect } from '@playwright/test';
