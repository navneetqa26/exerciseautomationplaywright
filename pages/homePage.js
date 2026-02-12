import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://automationexercise.com');
  }

  async verifyHomePageVisible() {
    // Verify we're on the home page by checking for main navigation
    await expect(this.page.locator('nav').first()).toBeVisible();
  }

  async clickSignupLogin() {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
  }

  async clickTestCases() {
    await this.page.getByRole('link', { name: 'Test Cases' }).first().click();
  }

  async clickProducts() {
    await this.page.getByRole('link', { name: 'Products' }).first().click();
  }
}
