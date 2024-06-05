import { test, expect } from '@playwright/test';
import { selectors } from './selectors'; // Adjust the path as necessary

test('user logs in and views task details', async ({ page }) => {
  // Navigate to your application's login page
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000); // Wait for  second

  // Fill in the email and password fields
  await page.fill(selectors.loginPage.emailInput, 'abc123@gmail.com');
  await page.fill(selectors.loginPage.passwordInput, 'tester');

  // Click the login button
  await page.click(selectors.loginPage.submitButton);

  // Wait for navigation to the dashboard
  await page.waitForURL('http://localhost:5173/dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Wait for 1 second

  // Click on the first task in the dashboard
  await page.click(selectors.dashboardPage.firstTask);
  await page.waitForTimeout(1000); // Wait for 1 second

  // Wait for the task details page to load and display content
  await page.waitForSelector(selectors.dashboardPage.detailsSection);
  await page.waitForTimeout(1000); // Wait for 1 second

  // Assert various details are correctly displayed
  await expect(page.locator(selectors.taskDetails.id)).toContainText('Id:');
  await expect(page.locator(selectors.taskDetails.task)).toContainText('Task:');
  await expect(page.locator(selectors.taskDetails.description)).toContainText('Description:');
  await expect(page.locator(selectors.taskDetails.status)).toContainText('Status:');
  await expect(page.locator(selectors.taskDetails.assignee)).toContainText('Assignee:');
  await expect(page.locator(selectors.taskDetails.createdBy)).toContainText('Created By:');
  await expect(page.locator(selectors.taskDetails.createdDate)).toContainText('Created Date:');
});
