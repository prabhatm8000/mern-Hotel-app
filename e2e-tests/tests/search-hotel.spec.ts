import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5000/";

// before each test -> sign in
test.beforeEach(async ({ page }) => {
    // goto sign-in
    await page.goto(UI_URL + "sign-in");

    // check wether its on signin page or not
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    // fill form (vaild credentials)
    await page.locator("[name=email]").fill("user1@email.com");
    await page.locator("[name=password]").fill("123123");

    // click on Sign In button
    await page.getByRole("button", { name: "Sign In" }).click();

    // check if signed in successfull
    await expect(page.getByText("Sign in Successfull!")).toBeVisible();
});

test("should show search result", async ({ page }) => {
    await page.goto(`${UI_URL}`);

    await page.getByPlaceholder("Where are you going?").fill("test country");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Hotels found in test country")).toBeVisible();
    await expect(page.getByText("Test Hotel").first()).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
    await page.goto(`${UI_URL}`);

    await page.getByPlaceholder("Where are you going?").fill("test country");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByText("Test Hotel").first().click();

    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
    await page.goto(`${UI_URL}`);

    await page.getByPlaceholder("Where are you going?").fill("test country");

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);

    await page.getByRole("button", { name: "Search" }).click();
    await page.getByText("Test Hotel").first().click();
    await page.getByRole("button", { name: "Book Now" }).click();

    await expect(page.getByText("Total Cost: ₹6000.00")).toBeVisible();

    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame
        .locator('[placeholder="Card number"]')
        .fill("4000003560000008");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/25");
    await stripeFrame.locator('[placeholder="CVC"]').fill("555");

    await page.getByRole("button", { name: "Confirm Booking" }).click();
    const iframe = page.frameLocator("iframe").first();
    const visa = iframe.frameLocator("iframe").first();
    await visa.getByRole("button", {name: "Complete"}).click()
    await expect(page.getByText("saved")).toBeVisible();
});
