import { test as base } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

export const test = base.extend({
  createdUser: async ({ page }, use) => {
    const outDir = path.join(process.cwd(), 'test-data');
    const inPath = path.join(outDir, 'created-user.json');

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

    // If file exists, read and return it
    if (found) {
      const raw = await fs.readFile(inPath, 'utf8');
      const created = JSON.parse(raw);
      await use(created);
      return;
    }

    // File not found — create a new user via the UI and persist it so dependent tests can run independently
    const timestamp = Date.now();
    const user = {
      name: 'user' + timestamp,
      email: 'user' + timestamp + '@example.com',
      password: 'Password123'
    };

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

    // Use the existing page objects to perform signup
    const { HomePage } = await import('../pages/homePage.js');
    const { AccountPage } = await import('../pages/accountPage.js');
    const home = new HomePage(page);
    const account = new AccountPage(page);

    await home.goto();
    await home.verifyHomePageVisible();
    await home.clickSignupLogin();
    await account.verifyNewUserSignupVisible();
    await account.enterNameAndEmail(user.name, user.email);
    await account.clickSignupButton();
    await account.verifyEnterAccountInfoVisible();
    await account.fillAccountDetails(user.name, user.email, user.password, address.day, address.month, address.year);
    await account.selectNewsletterCheckbox();
    await account.selectOffersCheckbox();
    await account.fillAddressDetails(address.firstName, address.lastName, address.company, address.address1, address.country, address.state, address.city, address.zipcode, address.mobile);
    await account.clickCreateAccountButton();
    await account.verifyAccountCreatedVisible();
    await account.clickContinueButton();
    await account.verifyLoggedInAs(user.name);

    // Persist created user for follow-up tests and then log out to avoid side effects
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(inPath, JSON.stringify(user, null, 2));
    await account.logout();

    await use(user);
  }
});

export { expect } from '@playwright/test';
