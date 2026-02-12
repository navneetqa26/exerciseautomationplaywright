import { test, expect } from '../fixtures/login.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { AuthPage } from '../pages/authPage.js';
import { AccountPage } from '../pages/accountPage.js';

test('Valid login', async ({ page, createdUser }) => {
  const home = new HomePage(page);
  const auth = new AuthPage(page);
  const account = new AccountPage(page);

  // Navigate and login
  await home.goto();
  await home.verifyHomePageVisible();
  await home.clickSignupLogin();
  await auth.verifyLoginToYourAccountVisible();
  await auth.enterLoginCredentials(createdUser.email, createdUser.password);
  await auth.clickLoginButton();
  await account.verifyLoggedInAs(createdUser.name);

  // Delete account and verify
  await account.clickDeleteAccountButton();
  await account.verifyAccountDeletedVisible();
  await account.clickContinueButton();

  // Cleanup
  const inPath = require('path').join(process.cwd(), 'test-data', 'created-user.json');
  const fs = require('fs/promises');
  await fs.unlink(inPath).catch(() => {});
});
