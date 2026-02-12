import { test, expect } from '../fixtures/invalid.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { AuthPage } from '../pages/authPage.js';

test.describe('Test Case 3:', () => {
    test(' Login with invalid email and password', async ({ page, invalidCredentials }) => {
      const home = new HomePage(page);
      const auth = new AuthPage(page);

      // Launch and verify home
      await home.goto();
      await home.verifyHomePageVisible();

      // Go to login
      await home.clickSignupLogin();
      await auth.verifyLoginToYourAccountVisible();

      // Enter invalid credentials and submit
      await auth.enterLoginCredentials(invalidCredentials.email, invalidCredentials.password);
      await auth.clickLoginButton();

      // Verify error message
      await auth.verifyLoginErrorVisible();
    });
});
