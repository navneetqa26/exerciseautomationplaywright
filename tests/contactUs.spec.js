import { test } from '../fixtures/contact.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { ContactPage } from '../pages/contactPage.js';
import path from 'path';

test('Contact us form', async ({ page, contactData }) => {
  const home = new HomePage(page);
  const contact = new ContactPage(page);

  // Launch browser and navigate
  await home.goto();
  await home.verifyHomePageVisible();

  // Click Contact Us button
  await contact.clickContactUs();
  await contact.verifyGetInTouchVisible();

  // Enter contact details
  await contact.enterName(contactData.name);
  await contact.enterEmail(contactData.email);
  await contact.enterSubject(contactData.subject);
  await contact.enterMessage(contactData.message);

  // Setup dialog handler before submit
  page.once('dialog', dialog => dialog.accept());

  // Click submit button
  await contact.clickSubmitButton();

  // Verify form was submitted successfully
  await contact.verifyFormSubmitted();

  // Close ad popup if present
  await contact.closeAdPopup();

  // Scroll to top to see success message
  await contact.scrollToTop();

  // Wait to see success message in video
  await page.waitForTimeout(3000);

  // Click home and verify
  await contact.clickHome();
  await home.verifyHomePageVisible();
});
