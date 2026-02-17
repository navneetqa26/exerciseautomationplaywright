import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://automationexercise.com', { waitUntil: 'domcontentloaded' });
  }

  async verifyHomePageVisible() {
    // Wait for navigation to complete
    await this.page.waitForLoadState('domcontentloaded');
    
    // Verify page is truly loaded
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
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

  async enterSearchQuery(query) {
    // Ensure the search input is visible and ready before filling
    await this.page.locator('#search_product').isVisible({ timeout: 5000 });
    await this.page.locator('#search_product').fill(query);
  }

  async clickSearchButton() {
    await this.page.locator('#submit_search').click();
  }
}
