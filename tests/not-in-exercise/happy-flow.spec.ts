import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { StorePage } from '../../pages/store.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { EmailPage } from '../../pages/email-inbox.page';
import { CompleteOrderPage } from '../../pages/complete-order.page';

test('Buy products successfully and received email', async ({ page }) => {
  const firstname = 'John';
  const lastname = 'Doe';
  const email = 'john.doe@mailinator.com';
  const zipcode = '12345';
  
  const loginPage = new LoginPage(page);
  const storePage = new StorePage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const completeOrderPage = new CompleteOrderPage(page);
  const emailInboxPage = new EmailPage(page);
  
  await loginPage.goto();
  await loginPage.loginAs('customer1', 'password');
  
  await storePage.addProductToCartByName('NordicPeak Jacket');
  await storePage.addProductToCartByName('Astra Hiking Cap');
  await storePage.addProductToCartByName('TerraFlex Gloves');
  await storePage.expectCartItemCountToBe(3);
  await storePage.openCart();

  await cartPage.checkoutCart();
  
  await checkoutPage.fillFirstnameWith(firstname);
  await checkoutPage.fillLastnameWith(lastname);
  await checkoutPage.fillEmailWith(email);
  await checkoutPage.fillZipcodeWith(zipcode);
  await checkoutPage.confirmOrder();
  
  await completeOrderPage.verfyOrderCompletedBySee('Thank you for your order.')

  await emailInboxPage.goto();
  await emailInboxPage.expectEmailReceived(email);
  
});

