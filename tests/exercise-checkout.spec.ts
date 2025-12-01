import { test } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { StorePage } from './pages/store.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';
import { CompleteOrderPage } from './pages/complete-order.page';

test.describe('Checkout Scenarios', () => {
  let login: LoginPage;
  let store: StorePage;
  let cart: CartPage;
  let checkout: CheckoutPage;
  let completeOrder: CompleteOrderPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    store = new StorePage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
    completeOrder = new CompleteOrderPage(page);

    await login.goto();
    await login.loginAs('customer1', 'password');

    await store.addProductToCartByName('NordicPeak Jacket');
    await store.openCart();
    await cart.checkoutCart();
  });

  test('TC011 - Checkout with all valid information', async () => {
    await checkout.fillFirstnameWith('Geeky');
    await checkout.fillLastnameWith('Base');
    await checkout.fillEmailWith('test@mailinator.com');
    await checkout.fillZipcodeWith('12345');
    await checkout.confirmOrder();

    await completeOrder.verfyOrderCompletedBySee('Thank you for your order.');
  });

  test('TC012 - Checkout with invalid email domain', async () => {
    await checkout.fillFirstnameWith('Code');
    await checkout.fillLastnameWith('Git');
    await checkout.fillEmailWith('test@gmail.com');
    await checkout.fillZipcodeWith('54321');
    await checkout.triedToConfirmOrder();

    await checkout.expectToSeeErrorMessage('We support only email address with domain mailinator.com.')
  });

  test('TC013 - Checkout with invalid zip code format', async () => {
    await checkout.fillFirstnameWith('Code');
    await checkout.fillLastnameWith('Git');
    await checkout.fillEmailWith('test@mailinator.com');
    await checkout.fillZipcodeWith('543');
    await checkout.triedToConfirmOrder();

    await checkout.expectToSeeErrorMessage('We support only 5 digits zip code.')
  });

  test('TC014 - Checkout with empty required fields', async () => {
    await checkout.fillZipcodeWith('98765');
    await checkout.triedToConfirmOrder();

    await checkout.expectToSeeErrorMessage('First name is required.')
  });

  test('TC015 - Checkout with zip code containing non-numeric characters', async () => {

    await checkout.fillFirstnameWith('Sarah');
    await checkout.fillLastnameWith('Williams');
    await checkout.fillEmailWith('sarah@mailinator.com');
    await checkout.fillZipcodeWith('12A45');
    await checkout.triedToConfirmOrder();

    await checkout.expectToSeeErrorMessage('We support only 5 digits zip code.')
  });
});
