import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('login-field');
    this.passwordInput = page.getByTestId('password-field');
    this.loginButton = page.getByTestId('submit-button');
    this.errorMessage = page.getByTestId('error-message-label');
  }

  async goto() {
    await this.page.goto('https://merchandise-dev.odds.team/index.html');
  }

  async loginAs(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/\/store/);
    await expect(this.page.getByText('products')).toBeVisible();
  }

  async expectLoginFailed() {
    await expect(this.page).toHaveURL(/\/index/);
    await expect(this.errorMessage).toHaveText('Invalid username or password.');
  }
}
