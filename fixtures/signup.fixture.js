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
  ,
  address: async ({}, use) => {
    const address = {
      firstName: 'John',
      lastName: 'Doe',
      company: 'Test Company',
      address1: '123 Main St',
      country: 'United States',
      state: 'CA',
      city: 'Los Angeles',
      zipcode: '90001',
      mobile: '9876543210',
      day: '1',
      month: '1',
      year: '1990'
    };
    await use(address);
  }
});

export { expect } from '@playwright/test';
