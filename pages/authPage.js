import { expect } from '@playwright/test';

export class AuthPage {
  constructor(page) {
    this.page = page;
  }

  async verifyLoginToYourAccountVisible() {
    await expect(this.page.getByText('Login to your account')).toBeVisible();
  }

  async enterLoginCredentials(email, password) {
    await this.page.locator("input[data-qa='login-email']").fill(email);
    await this.page.locator("input[data-qa='login-password']").fill(password);
  }

  async clickLoginButton() {
    await this.page.locator("button[data-qa='login-button']").click();
  }

  async verifyLoginErrorVisible() {
    await expect(this.page.getByText('Your email or password is incorrect!')).toBeVisible();
  }
}
