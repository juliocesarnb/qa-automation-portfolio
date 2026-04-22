const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CheckoutPage = require('../../pages/CheckoutPage');

describe('Edge Users', () => {
  it('allows performance_glitch_user to log in within an extended timeout', () => {
    let startedAt;

    cy.fixture('users').then(({ performance_glitch_user: user }) => {
      LoginPage.visit();
      cy.then(() => {
        startedAt = Date.now();
      });

      LoginPage.loginAs(user.username, user.password);

      cy.url({ timeout: 15000 }).should('include', '/inventory.html');
      InventoryPage.assertLoaded();

      cy.then(() => {
        expect(Date.now() - startedAt).to.be.lessThan(15000);
      });
    });
  });

  it('shows checkout form instability for error_user without breaking the suite', () => {
    cy.fixture('users').then(({ error_user: user }) => {
      cy.fixture('products').then(({ checkoutProduct }) => {
        LoginPage.visit();
        LoginPage.loginAs(user.username, user.password);

        InventoryPage.assertLoaded();
        InventoryPage.addItemToCart(checkoutProduct.name);
        InventoryPage.openCheckoutFromCart();

        CheckoutPage.assertInformationStepLoaded();
        CheckoutPage.firstNameInput().should('be.visible');
        CheckoutPage.lastNameInput().should('be.visible').and('have.value', '');
        CheckoutPage.postalCodeInput().should('be.visible');
      });
    });
  });
});
