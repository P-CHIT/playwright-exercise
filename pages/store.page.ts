import { Page, Locator, expect } from '@playwright/test';
import { CartPage } from './cart.page';

export class StorePage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly cartItemCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.getByTestId('cart').locator('#Layer_1');
    this.cartItemCount = page.getByTestId('cart-items-count');
  }

  async goto() {
    await this.page.goto('https://merchandise-dev.odds.team/store.html');
  }

  async addProductToCartByName(productName: string) {
    const productCard = this.page
      .getByTestId('product-item')
      .filter({ hasText: productName });
    const addButton = productCard.getByTestId('add-to-cart-button');
    await addButton.click();
  }

  async expectCartItemCountToBe(expectedCount: number) {
    await expect(this.cartItemCount).toHaveText(expectedCount.toString());
  }

  async openCart() {
    await this.cartButton.click();
    return new CartPage(this.page);
  }
}

