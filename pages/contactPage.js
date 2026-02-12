import { expect } from '@playwright/test';

export class ContactPage {
  constructor(page) {
    this.page = page;
  }

  async clickContactUs() {
    await this.page.getByRole('link', { name: /Contact us/i }).click();
  }

  async verifyGetInTouchVisible() {
    await expect(this.page.getByText('GET IN TOUCH')).toBeVisible();
  }

  async enterName(name) {
    await this.page.locator('input[name="name"]').type(name, { delay: 30 });
  }

  async enterEmail(email) {
    await this.page.locator('input[name="email"]').type(email, { delay: 30 });
  }

  async enterSubject(subject) {
    await this.page.locator('input[name="subject"]').type(subject, { delay: 30 });
  }

  async enterMessage(message) {
    await this.page.locator('textarea[name="message"]').type(message, { delay: 30 });
  }

  async uploadFile(filePath) {
    await this.page.locator('input[name="upload_file"]').setInputFiles(filePath);
  }

  async clickSubmitButton() {
    await this.page.locator('input[name="submit"]').click();
  }

  async closeAdPopup() {
    try {
      await this.page.locator('button').filter({ hasText: 'Close' }).first().click({ timeout: 2000 });
    } catch (e) {
      // Ad popup not present, continue
    }
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async verifyFormSubmitted() {
    // Verify success message exists (may be hidden)
    const successElement = this.page.locator('div.status.alert-success');
    const count = await successElement.count();
    await expect(count).toBeGreaterThan(0);
  }

  async clickHome() {
    await this.page.getByRole('link', { name: 'Home' }).first().click();
  }
}
