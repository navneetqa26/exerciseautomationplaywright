import { expect } from '@playwright/test';

export class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async verifyAllProductsPageVisible() {
    await expect(this.page).toHaveURL(/products/i);
  }

  async verifyProductsListVisible() {
    const firstProduct = this.page.locator('div.productinfo').first();
    await expect(firstProduct).toBeVisible();
  }

  async clickViewProductOfFirstItem() {
    await this.page.locator('a:has-text("View Product")').first().click();
  }

  async verifyProductDetailPageVisible() {
    await expect(this.page).toHaveURL(/product_details/i);
  }

  async verifyProductName() {
    const nameElement = this.page.locator('h2').first();
    await expect(nameElement).toBeVisible();
  }

  async verifyProductCategory() {
    const categoryElement = this.page.locator('text=/Category:/i').first();
    await expect(categoryElement).toBeVisible();
  }

  async verifyProductPrice() {
    const priceElement = this.page.locator('span:has-text("Rs.")').first();
    await expect(priceElement).toBeVisible();
  }

  async verifyProductAvailability() {
    const availabilityElement = this.page.locator('text=/Availability:/i').first();
    await expect(availabilityElement).toBeVisible();
  }

  async verifyProductCondition() {
    const conditionElement = this.page.locator('text=/Condition:/i').first();
    await expect(conditionElement).toBeVisible();
  }

  async verifyProductBrand() {
    const brandElement = this.page.locator('text=/Brand:/i').first();
    await expect(brandElement).toBeVisible();
  }

  async verifyAllProductDetails() {
    await this.verifyProductName();
    await this.verifyProductCategory();
    await this.verifyProductPrice();
    await this.verifyProductAvailability();
    await this.verifyProductCondition();
    await this.verifyProductBrand();
  }
}
