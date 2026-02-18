import { expect } from '@playwright/test';

export class Subscription {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://automationexercise.com');
  }

  async verifyHomePageVisible() {
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
  }
    async scrollToFooter() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
    async verifySubscriptionSectionVisible() {
    await expect(this.page.getByText('Subscription')).toBeVisible();
    }   


}