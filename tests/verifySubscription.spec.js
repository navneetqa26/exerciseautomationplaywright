import { describe } from 'node:test';
import {test,expect} from '../fixtures/login.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { Subscription } from '../pages/subscriptionPage.js';    

describe('Test Case 5:', () => {
    test('Verify subscription', async ({ page }) => {
      const home = new HomePage(page);
      const subscription = new Subscription(page);
        // Launch and verify home   
        await home.goto();
        await home.verifyHomePageVisible(); 
        // Scroll to footer and verify subscription section
        await home.scrollToFooter();
        await subscription.verifySubscriptionSectionVisible();
       
    });
}); 
//npx playwright test tests/verifySubscription.spec.js --headed