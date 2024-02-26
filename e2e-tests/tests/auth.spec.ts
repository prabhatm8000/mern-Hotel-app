import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5000/";

test("should allow the user to sign in", async ({ page }) => {
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
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
    // genarating random email
    const testEmail = `testUser_${Math.floor(Math.random() * 10000)}@test.com`;

    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("link", { name: "Create an Account" }).click();

    await expect(
        page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();

    // need to generate email to make test robust
    await page.locator("[name=firstName]").fill("test_firstName");
    await page.locator("[name=lastName]").fill("test_lastName");
    await page.locator("[name=email]").fill(testEmail);
    await page.locator("[name=password]").fill("testpass1254");
    await page.locator("[name=confirmPassword]").fill("testpass1254");

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Registration Success!")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
