import { test, expect } from "@playwright/test";

test("test", async ({page}) => {
	await page.goto("https://www.amazon.com/");
	const searchBox = page.locator("input#twotabsearchtextbox");
	await searchBox.fill("Nikon");
	await page.locator("input#nav-search-submit-button").click();
	await page.locator('#a-autoid-0').click();
	await page.getByRole('option', { name: 'Price: High to Low' }).locator('#s-result-sort-select_2').click();
	await page.locator('.s-product-image-container').nth(1).click();
	await page.getByRole("link", { name: "See more product details" }).click();
	await page.getByRole("button", { name: "Item details" }).click();
  	await expect(page.locator('#productDetails_expanderTables_depthLeftSections')).toContainText('D6 FX-Format');
});
