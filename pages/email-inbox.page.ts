import { Page, Locator, expect } from '@playwright/test';

export class EmailPage {
  readonly page: Page;
  readonly messageContainer: Locator;

  constructor(page: Page){
    this.page = page;
    this.messageContainer = page.locator('#message-page');
  }

  async goto() {
    await this.page.goto('https://mailpit.odds.team');
  }

  async expectEmailReceived(email: string) {
    await expect(this.messageContainer).toContainText(`To: ${email}`);
  }
}