import { test, expect } from '../fixtures/signup.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { AuthPage } from '../pages/authPage.js';
import { AccountPage } from '../pages/accountPage.js';

test('Logout user', async ({ page, user, address }) => {
  const home = new HomePage(page);
  const auth = new AuthPage(page);
  const account = new AccountPage(page);

  // Create account first (use signup fixture `user`)
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

  // Verify logged in and then logout
  await account.verifyLoggedInAs(user.name);
  await account.logout();
  await auth.verifyLoginToYourAccountVisible();
});
