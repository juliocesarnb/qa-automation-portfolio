const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CheckoutPage = require('../../pages/CheckoutPage');

describe('Inventory - Checkout Flow', () => {
  it('completes the checkout flow successfully', () => {
    cy.fixture('users').then(({ standard_user: user }) => {
      cy.fixture('products').then(({ checkoutProduct }) => {
        cy.fixture('checkout').then((customer) => {
          LoginPage.visit();
          LoginPage.loginAs(user.username, user.password);

          InventoryPage.assertLoaded();
          InventoryPage.addItemToCart(checkoutProduct.name);
          InventoryPage.openCheckoutFromCart();

          CheckoutPage.assertInformationStepLoaded();
          CheckoutPage.fillInformation(customer);
          CheckoutPage.continue();

          CheckoutPage.assertOverviewStepLoaded();
          CheckoutPage.assertItemPresent(checkoutProduct.name);
          CheckoutPage.finish();
          CheckoutPage.assertCompletion();
        });
      });
    });
  });
});
