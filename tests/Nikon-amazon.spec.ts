import { test, expect } from "@playwright/test";
import { chromium } from "playwright";

test("test", async ({}) => {
	const browser = await chromium.launch();
	const context = await browser.newContext();
	context.setDefaultTimeout(120000);
	const page = await context.newPage();
	const getRandomDelay = () => Math.random() * (153) + 67;
	const getRandomMouseMove = async () => {
		await page.mouse.move(Math.random() * 1000, Math.random() * 800);
	};
	await page.goto("https://www.amazon.com/");
	await getRandomMouseMove();
	await getRandomMouseMove();
	// await page.waitForSelector('input#twotabsearchtextbox', { state: 'visible', timeout: 100000 });
	const searchBox = page.locator("input#twotabsearchtextbox");
	await searchBox.fill("Nikon");
	await getRandomMouseMove();
	await getRandomMouseMove();
	await page.locator("input#nav-search-submit-button").click({ delay: getRandomDelay() });
	await getRandomMouseMove();
	await getRandomMouseMove();
	// await page.waitForSelector('[aria-label="Sort by"]', { state: "visible", timeout: 10000 });
	await page.evaluate(() => {
		window.scrollBy(0, window.innerHeight);
	  });
	await page.getByText("Sort by:Featured").click({ delay: getRandomDelay() });
	await page
		.getByLabel("Price: High to Low")
		.getByText("Price: High to Low")
		.click({ delay: getRandomDelay() });
	await page.waitForTimeout(getRandomDelay());
	await page.mouse.wheel(0, 500);
	await page.waitForTimeout(getRandomDelay());
	await page.mouse.wheel(0, -500); // Scroll up

	const secondProduct = page
		.locator('[data-component-type="s-search-result"]')
		.nth(1);
	await secondProduct.waitFor();
	await secondProduct.click({ delay: getRandomDelay() });
	await page.waitForTimeout(getRandomDelay());
	await page.mouse.wheel(0, 500);
	await page.waitForTimeout(getRandomDelay());
	await page.mouse.wheel(0, -500); // Scroll up
	await page.getByRole("link", { name: "See more product details" }).click();
	await page.waitForTimeout(getRandomDelay());
	await page.getByText("Product information Item").click();
	await page.getByRole("button", { name: "Item details" }).click();
	// Verify that the product title includes "Nikon D3X"
	const productTitle = await page.locator('#productTitle').textContent();
	expect(productTitle).toContain('Nikon D3X');
	await browser.close();
});
