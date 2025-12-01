import { Page, Locator, expect } from '@playwright/test';

export class CompleteOrderPage {
  readonly page: Page;
  readonly thankyouText: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.thankyouText = page.getByTestId('thank-you-container');
  }

  async verfyOrderCompletedBySee (successText: string) {
    await expect(this.thankyouText).toContainText(successText);
  }
}
