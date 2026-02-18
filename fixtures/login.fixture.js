import { test as base } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

export const test = base.extend({
  createdUser: async ({ page }, use) => {
    // Always create a fresh user for every test run
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
    await account.logout();
    await use(user);
  }
});

export { expect } from '@playwright/test';
