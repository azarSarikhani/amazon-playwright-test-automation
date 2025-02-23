
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');
  //await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('Nikon');
  await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('Nikon');
  await page.getByRole('textbox', { name: 'Search For' }).fill('Nikon');
  await expect(page.getByRole('button', { name: 'Go', exact: true })).toContainText('Go');
  await page.getByRole('button', { name: 'Go', exact: true }).click();
  await expect(page.locator('#a-autoid-0')).toContainText('Sort by:Featured');
  //await page.locator('#a-autoid-0').click();
  //const dropDownList = page.locator('#a-autoid-69-announce');
  //await expect(dropDownList).toHaveValue('Price: High to Low');
  //await page.getByLabel('Price: High to Low').getByText('Price: High to Low').click();

  //await page.getByRole('link', { name: 'D6 FX-Format Digital SLR Camera Body, Black' }).click();
  //await expect(page.locator('#productDetails_expanderTables_depthLeftSections')).toContainText('Item details');
  //await page.locator('#productDetails_feature_div').click();
  //await expect(page.locator('#productDetails_expanderTables_depthLeftSections')).toContainText('Nikon something');

});

//test('Amazon homepage has search bar', async ({ page }) => {
//	// Navigate to the Amazon homepage
//	await page.goto('https://www.amazon.com');
//  
//	// Assert that the title contains "Amazon"
//	await expect(page).toHaveTitle(/Amazon/i);
//  });
//
//test('get started link', async ({ page }) => {
//	await page.goto('https://playwright.dev/');
//  
//	// Click the get started link.
//	await page.getByRole('link', { name: 'Get started' }).click();
//  
//	// Expects page to have a heading with the name of Installation.
//	await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
//  });
//
//test('has title', async ({ page }) => {
//	await page.goto('https://playwright.dev/');
//  
//	// Expect a title "to contain" a substring.
//	await expect(page).toHaveTitle(/Playwright/);
//  });

// test('Amazon Nikon test', async ({ page }) => {
// 	await page.goto('https://www.amazon.com/');
// 	await page.getByRole('textbox', { name: 'Search For' }).click();
// 	await page.getByRole('textbox', { name: 'Search For' }).fill('Nikon');
// 	await page.getByRole('button', { name: 'Go' }).click();
// 	await page.getByText('Sort by:Featured').click();
// 	await page.getByLabel('Price: High to Low').getByText('Price: High to Low').click();
// 	await page.getByRole('link', { name: 'D6 FX-Format Digital SLR Camera Body, Black' }).click();
// 	await page.getByRole('link', { name: 'See more product details' }).click();
// 	await page.getByText('Product information Item').click();
// 	await page.getByRole('button', { name: 'Item details' }).click();
//     await page.getByText('Product information Item').click();
//   });