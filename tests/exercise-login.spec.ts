import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page.ts';

test.describe('Login Tests', () => {

  let login: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();

    await expect(page.getByTestId('login-field-label')).toContainText('Login');
    await expect(page.getByTestId('login-form')).toContainText('Password');
    await expect(login.loginButton).toBeVisible();
  });

  test('TC001&TC002: Login with valid credentials (customer1)', async ({ }) => {

    await login.loginAs('customer1', 'password');
    await login.expectLoginSuccess();
  });

  test('TC003: Login with invalid username', async ({ }) => {

    await login.loginAs('invaliduser', 'password');
    await login.expectLoginFailed();
  });

  test('TC004: Login with invalid password', async ({ }) => {

    await login.loginAs('customer1', 'wrongpassword');
    await login.expectLoginFailed();
  });

  test('TC005: Login with empty credentials', async ({ }) => {

    await login.loginAs('', '');
    await login.expectLoginFailed();
  });
});
