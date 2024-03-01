import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5000/";

// before each test -> sign in
test.beforeEach(async ({ page }) => {
    // goto ui
    await page.goto(UI_URL);

    // get sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

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
    await page.getByRole("button", {name: "Search"}).click();

    await expect(page.getByText("Hotels found in test country")).toBeVisible();
    await expect(page.getByText("Test Hotel").first()).toBeVisible();
});
