import { test } from '../fixtures/testcases.fixture.js';
import { HomePage } from '../pages/homePage.js';
import { TestCasesPage } from '../pages/testCasesPage.js';

test('Visit test cases page', async ({ page, testCaseData }) => {
  const home = new HomePage(page);
  const testCases = new TestCasesPage(page);

  // Launch browser and navigate
  await home.goto();
  await home.verifyHomePageVisible();

  // Click Test Cases button
  await home.clickTestCases();

  // Verify user is navigated to test cases page
  await testCases.verifyTestCasesPageVisible();
});
