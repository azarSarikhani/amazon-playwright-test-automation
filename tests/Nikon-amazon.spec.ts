import { test, expect } from "@playwright/test";

const baseURL = process.env.BASE_URL || "https://www.amazon.com/";


/*
The fuction "retryVisibility" is a helper function to reload the page if the element is not
visible. This could be due to page taking more than usual to load or test automation 
blockers blocking playwright browsers. Use this fuction with caution!
This function reloads the whole page if the element specified with its locator is not visible.
*/
async function retryVisibility(page: any, locator: any, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            await expect(locator).toBeVisible();
            break;
        } catch (e) {
            if (i === retries - 1) throw e;
            console.log(`Retry ${i + 1} failed for locator: ${locator}, retrying...`);
			await page.reload({ waitUntil: "domcontentloaded" });
            await page.waitForTimeout(delay);
        }
    }
}
/*
The "amazon Nikon search test" is an end to end test that tests user experience.
It assumes that we can search for "Nikon" in the searchbox, sort the result from high
to low price, click on the second option and click on it, finally it asserts / expects
that this item has D3X in its Item details when we expand the See more product details 
section. The most stuborn element is the search box. There's a helper function for it. 
If this or any other element times out try grabbing them with alternative ways of grabbing elements.
Here are a few examples for the search box:
using ARIA role: const searchBox = page.getByRole('searchbox', { name: 'Search Amazon' });
using test id: const searchBox = page.locator('[data-testid="SearchBox"]');
using element id: const searchBox = page.locator("input#twotabsearchtextbox");
using alternative element id: const searchBox = page.locator("input#nav-bb-search");
*/
test("amazon Nikon search test", async ({page}) => {
	await page.goto(baseURL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
	const searchBox = page.getByRole('searchbox', { name: 'Search Amazon' });
	await retryVisibility(page, searchBox, 5, 2000);
	await searchBox.fill("Nikon");
	await page.locator("input#nav-search-submit-button").click();
	const sortDropDown = page.locator('#a-autoid-0');
	await retryVisibility(page, sortDropDown, 5, 2000);
	await sortDropDown.click();
	const priceHighToLow = page.getByRole('option', { name: 'Price: High to Low' }).locator('#s-result-sort-select_2');
	await priceHighToLow.click();
	await page.locator('.s-product-image-container').nth(1).click();
	const seeProductDetail = page.getByRole("link", { name: "See more product details" });
	await retryVisibility(page, seeProductDetail, 5, 2000);
	await seeProductDetail.click();
	await page.getByRole("button", { name: "Item details" }).click();
	await expect(page.locator('#productDetails_expanderTables_depthLeftSections')).toContainText('Nikon D3X');
	//To make the tests pass comment the above line and uncomment the bellow line,
	//At the time of writting this file the second choice in search list was Nikon J3 and not D3X
  	//await expect(page.locator('#productDetails_expanderTables_depthLeftSections')).toContainText('J3');  
});
