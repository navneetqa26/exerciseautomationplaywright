import { expect } from '@playwright/test';

export class AccountPage {
  constructor(page) {
    this.page = page;
  }

  async verifyNewUserSignupVisible() {
    await expect(this.page.getByText('New User Signup!')).toBeVisible();
  }

  async enterNameAndEmail(name, email) {
    await this.page.locator("input[data-qa='signup-name']").fill(name);
    await this.page.locator("input[data-qa='signup-email']").fill(email);
  }

  async clickSignupButton() {
    await this.page.locator("button[data-qa='signup-button']").click();
  }

  async verifyEnterAccountInfoVisible() {
    await expect(this.page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();
  }

  async fillAccountDetails(name, email, password, day, month, year) {
    await this.page.locator('#id_gender1').check();
    await this.page.locator('#password').fill(password);
    await this.page.locator('select[name="days"]').selectOption(day);
    await this.page.locator('select[name="months"]').selectOption(month);
    await this.page.locator('select[name="years"]').selectOption(year);
  }

  async selectNewsletterCheckbox() {
    await this.page.locator('#newsletter').check();
  }

  async selectOffersCheckbox() {
    await this.page.locator('#optin').check();
  }

  async fillAddressDetails(firstName, lastName, company, address, country, state, city, zipcode, mobile) {
    await this.page.locator('input[name="first_name"]').fill(firstName);
    await this.page.locator('input[name="last_name"]').fill(lastName);
    await this.page.locator('input[name="company"]').fill(company);
    await this.page.locator('input[name="address1"]').fill(address);
    await this.page.locator('select[name="country"]').selectOption({ label: country });
    await this.page.locator('input[name="state"]').fill(state);
    await this.page.locator('input[name="city"]').fill(city);
    await this.page.locator('input[name="zipcode"]').fill(zipcode);
    await this.page.locator('input[name="mobile_number"]').fill(mobile);
  }

  async clickCreateAccountButton() {
    await this.page.locator("button[data-qa='create-account']").click();
  }

  async verifyAccountCreatedVisible() {
    await expect(this.page.getByText('ACCOUNT CREATED!')).toBeVisible();
  }

  async clickContinueButton() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }

  async verifyLoggedInAs(username) {
    const loggedInElement = this.page.locator('a:has-text("' + username + '")').first();
    await expect(loggedInElement).toBeVisible();
  }

  async clickDeleteAccountButton() {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
  }

  async verifyAccountDeletedVisible() {
    await expect(this.page.getByText('ACCOUNT DELETED!')).toBeVisible();
  }

  async logout() {
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }
}
