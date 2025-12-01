import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://merchandise-dev.odds.team/index.html');
    await page.getByTestId('login-field').click();
    await page.getByTestId('login-field').fill('customer1');
    await page.getByTestId('password-field').click();
    await page.getByTestId('password-field').fill('password');
    await page.getByTestId('submit-button').click();
    await expect(page.getByText('products')).toBeVisible();
});
test.describe('Logout success', () => {
    test('Logout success', async ({ page }) => {
        await expect(page.getByTestId('menu')).toBeVisible();
        await page.getByTestId('menu').click();
        await expect(page.getByRole('link', { name: 'Store' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
        await page.getByRole('link', { name: 'Log Out' }).click();
        await expect(page.getByText('ODT x merchandise Login')).toBeVisible();
    });
})