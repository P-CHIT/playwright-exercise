import { Page, Locator, expect } from '@playwright/test';
import { CompleteOrderPage } from './complete-order.page';

export class CheckoutPage {
  readonly page: Page;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly emailInput: Locator;
  readonly zipcodeInput: Locator;
  readonly confirmPaymentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstnameInput = page.getByTestId('firstname-field');
    this.lastnameInput = page.getByTestId('lastname-field');
    this.emailInput = page.getByTestId('email-field');
    this.zipcodeInput = page.getByTestId('zipcode-field');
    this.confirmPaymentButton = page.getByTestId('confirm-payment-button');
  }

  async fillFirstnameWith (firstname: string) {
    await this.firstnameInput.fill(firstname);
  }

  async fillLastnameWith (lastname: string) {
    await this.lastnameInput.fill(lastname);
  }

  async fillEmailWith (email: string) {
    await this.emailInput.fill(email);
  }

  async fillZipcodeWith (zipcode: string) {
    await this.zipcodeInput.fill(zipcode);
  }

  async confirmOrder () {
    const button = this.confirmPaymentButton;
    await button.click();
    return new CompleteOrderPage(this.page);
  }

  async triedToConfirmOrder () {
    const button = this.confirmPaymentButton;
    await button.click();
  }

  async expectToSeeErrorMessage (error: string) {
    await expect(this.page.getByTestId('error-message-label')).toHaveText(error);
  }
}
