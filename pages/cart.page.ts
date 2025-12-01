import { Page, Locator, expect } from '@playwright/test';
import { CheckoutPage } from './checkout.page';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByTestId('checkout-button');
  }

  async checkoutCart() {
    const button = this.checkoutButton;
    await button.click();
    return new CheckoutPage(this.page);
  }

  getCartItemByName(name: string) {
    return this.page.getByTestId('cart-item').filter({ hasText: name });
  }

  async changeQuantity(name: string, qty: number) {
    const item = this.getCartItemByName(name);
    const qtyInput = item.getByTestId('quantity');
    await qtyInput.fill(String(qty));
    await qtyInput.press('Enter');
  }

  async removeItem(name: string) {
    const item = this.getCartItemByName(name);
    await item.getByTestId('remove-from-cart-button').click();
  }

  async expectEmptyCart() {
    await expect(this.page.getByText('No item in cart.')).toBeVisible();
  }

  async expectItemVisible(name: string) {
    await expect(this.getCartItemByName(name)).toBeVisible();
  }

async expectSubtotalPrice() {
  const items = this.page.getByTestId('cart-item');
  let calculatedSubtotal = 0;

  const count = await items.count();
  for (let i = 0; i < count; i++) {
    const item = items.nth(i);
    const priceText = await item.getByTestId('price').textContent();
    const qtyInput = await item.getByTestId('quantity');

    const qty = Number(await qtyInput.inputValue());
    const price = Number(priceText);
    calculatedSubtotal += price * qty;
  }

  const subtotalText = await this.page.getByTestId('subtotal-price').textContent();
  const subtotal = Number(subtotalText);

  expect(subtotal).toBeCloseTo(calculatedSubtotal, 2);
}

}

