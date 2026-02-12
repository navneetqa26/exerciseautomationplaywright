import { test, expect } from '../fixtures/signup.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { AccountPage } from '../pages/accountPage.js';
import fs from 'fs/promises';
import path from 'path';

test('Signup and create account', async ({ page, user, address }) => {
  const home = new HomePage(page);
  const account = new AccountPage(page);

  // Navigate to site and verify home
  await home.goto();
  await home.verifyHomePageVisible();

  // Go to signup/login and create an account
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

  // Verify logged in
  await account.verifyLoggedInAs(user.name);

  // Persist created user for follow-up tests
  const outDir = path.join(process.cwd(), 'test-data');
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, 'created-user.json');
  await fs.writeFile(outPath, JSON.stringify({ name: user.name, email: user.email, password: user.password }, null, 2));
});