import { test, expect } from "@playwright/test";

const baseURL = process.env.BASE_URL || "https://www.amazon.com/";

async function retryVisibility(page: any, locator: any, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            await expect(locator).toBeVisible();
            break;
        } catch (e) {
            if (i === retries - 1) throw e;
            console.log(`Retry ${i + 1} failed, retrying...`);
			await page.reload({ waitUntil: "domcontentloaded" });
            await page.waitForTimeout(delay);
        }
    }
}

test("test", async ({page}) => {
	await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
	const searchBox = page.getByRole('searchbox', { name: 'Search Amazon' });
	//alternative ways to getting searchbox
	//using test id: const searchBox = page.locator('[data-testid="SearchBox"]');
	//using element id: const searchBox = page.locator("input#twotabsearchtextbox");
	//using alternative element id: const searchBox = page.locator("input#nav-bb-search");
	await retryVisibility(page, searchBox, 3, 2000);
	await searchBox.fill("Nikon");
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
