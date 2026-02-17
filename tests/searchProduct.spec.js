import { describe } from 'node:test';
import {test,expect} from '../fixtures/login.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { SearchPage } from '../pages/searchPage.js';    

describe('Test Case 4:', () => {
    test('Search product', async ({ page }) => {
      const home = new HomePage(page);
      const search = new SearchPage(page);
        // Launch and verify home   
        await home.goto();
        await home.verifyHomePageVisible(); 
        //Click on "Products" link and verify products page
        await home.clickProducts();
        await search.verifyAllProductsVisible();

        // Search for product and verify results
        await home.enterSearchQuery('dress');
        await home.clickSearchButton();
        await search.verifySearchedProductsVisible();
    });
}); 
//npx playwright test tests/searchProduct.spec.js --headed