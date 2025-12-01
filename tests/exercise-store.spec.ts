import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { StorePage } from '../pages/store.page';
import { CartPage } from '../pages/cart.page';

test.describe('Cart Management Tests', () => {
  let login: LoginPage;
  let store: StorePage;
  let cart: CartPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    store = new StorePage(page);
    cart = new CartPage(page);

    await login.goto();
    await login.loginAs('customer1', 'password');
  });

  test('TC006: Add product to cart', async ({ }) => {
    await store.addProductToCartByName('NordicPeak Jacket');
    await store.expectCartItemCountToBe(1);
  });

  test('TC007: Update product quantity in cart', async ({ page }) => {
    await store.addProductToCartByName('NordicPeak Jacket');
    await store.openCart();

    await cart.changeQuantity('NordicPeak Jacket', 3);
    
    await cart.expectSubtotalPrice();
  });

  test('TC008: Remove product from cart', async ({ }) => {
    await store.addProductToCartByName('NordicPeak Jacket');
    await store.openCart();

    await cart.removeItem('NordicPeak Jacket');
    await cart.expectEmptyCart();
    await cart.expectSubtotalPrice();
  });


  test('TC009: View empty cart', async ({ }) => {

    await store.openCart();
    await cart.expectEmptyCart();
    await cart.expectSubtotalPrice();
  });

  test('TC010: Add multiple products to cart', async ({ }) => {
    await store.addProductToCartByName('NordicPeak Jacket');
    await store.addProductToCartByName('TerraFlex Gloves');

    await store.expectCartItemCountToBe(2);

    await store.openCart();
    await cart.expectItemVisible('NordicPeak Jacket');
    await cart.expectItemVisible('TerraFlex Gloves');
    await cart.expectSubtotalPrice();
  });
});
