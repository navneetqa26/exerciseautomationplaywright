import { expect } from '@playwright/test';

export class SearchPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('http://automationexercise.com');
  }

  async verifyHomePageVisible() {
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
  }

  async clickOnProducts() {
    await this.page.getByRole('link', { name: 'Products' }).first().click();
  }
  //Verify user is navigated to ALL PRODUCTS page successfully
  async verifyAllProductsVisible() {
    await expect(this.page.getByText('All Products')).toBeVisible();
  }
  //Enter product name in search input and click search button
  async searchForProduct(productName) {
    await this.page.locator('#search_product').fill(productName);
    await this.page.locator('#submit_search').click();
  } 
    //Verify "SEARCHED PRODUCTS" is visible
    async verifySearchedProductsVisible() {
    await expect(this.page.getByText('Searched Products')).toBeVisible();
    }
    //Verify all the products related to search are visible
    async verifySearchedProductsListVisible() {
      const firstSearchedProduct = this.page.locator('div.productinfo').first();
      await expect(firstSearchedProduct).toBeVisible();
    }   
}