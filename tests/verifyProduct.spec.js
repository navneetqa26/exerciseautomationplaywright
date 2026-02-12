import { test } from '../fixtures/products.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { ProductsPage } from '../pages/productsPage.js';

test('Verify product', async ({ page, productData }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);

  // Launch browser and navigate
  await home.goto();
  await home.verifyHomePageVisible();

  // Click Products button
  await home.clickProducts();

  // Verify ALL PRODUCTS page
  await products.verifyAllProductsPageVisible();

  // Verify products list is visible
  await products.verifyProductsListVisible();

  // Click View Product of first product
  await products.clickViewProductOfFirstItem();

  // Verify product detail page
  await products.verifyProductDetailPageVisible();

  // Verify all product details
  await products.verifyAllProductDetails();
});
