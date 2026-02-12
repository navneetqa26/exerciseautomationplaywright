import { test } from '../fixtures/login.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { SignupPage } from '../pages/signupPage.js';

test('Existing user', async ({ page, createdUser }) => {
  const home = new HomePage(page);
  const signup = new SignupPage(page);

  // Launch browser and navigate
  await home.goto();
  await home.verifyHomePageVisible();

  // Click Signup/Login button
  await home.clickSignupLogin();
  await signup.verifyNewUserSignupVisible();

  // Enter name and already registered email
  await signup.enterNameAndEmail('Test User', createdUser.email);

  // Click Signup button
  await signup.clickSignupButton();

  // Verify error message
  await signup.verifyEmailAlreadyExistErrorVisible();
});
