import { test as base } from '@playwright/test';

export const test = base.extend({
  productData: async ({}, use) => {
    const productData = {
      allProductsUrl: /products/i,
      detailPageUrl: /product_details/i
    };
    await use(productData);
  }
});

export { expect } from '@playwright/test';
