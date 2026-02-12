import { expect } from '@playwright/test';

export class TestCasesPage {
  constructor(page) {
    this.page = page;
  }

  async verifyTestCasesPageVisible() {
    await expect(this.page).toHaveURL(/test_cases/i);
  }
}
