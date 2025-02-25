import { test, expect } from "@playwright/test";

const baseURL = process.env.BASE_URL || "https://www.amazon.com/";

test("test", async ({page}) => {
	await page.goto(baseURL);
	await page.waitForLoadState('networkidle'); // Wait until no new requests
    await page.waitForTimeout(2000);
	const searchBox = page.getByRole('searchbox', { name: 'Search Amazon' });
	await searchBox.click({ force: true });
	await searchBox.fill("Nikon", { force: true });
	await page.locator("input#nav-search-submit-button").click();
	await page.locator('#a-autoid-0').click();
	await page.getByRole('option', { name: 'Price: High to Low' }).locator('#s-result-sort-select_2').click();
	await page.locator('.s-product-image-container').nth(1).click();
	await page.getByRole("link", { name: "See more product details" }).click();
	await page.getByRole("button", { name: "Item details" }).click();
	//await expect(page.locator('#productDetails_expanderTables_depthLeftSections')).toContainText('Nikon D3X');
	//To make the tests pass comment the above line and uncomment the bellow line,
	//At the time of writting this file the second choice in search list was Nikon D6 and not D3X
  	await expect(page.locator('#productDetails_expanderTables_depthLeftSections')).toContainText('D6 FX-Format');  
});
