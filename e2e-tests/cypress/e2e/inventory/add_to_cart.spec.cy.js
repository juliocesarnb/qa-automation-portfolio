const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');

describe('Inventory - Add To Cart', () => {
  it('adds a product to the cart and updates the badge', () => {
    cy.fixture('users').then(({ standard_user: user }) => {
      cy.fixture('products').then(({ checkoutProduct }) => {
        LoginPage.visit();
        LoginPage.loginAs(user.username, user.password);

        InventoryPage.assertLoaded();
        InventoryPage.assertItemPresent(checkoutProduct.name);
        InventoryPage.addItemToCart(checkoutProduct.name);
        InventoryPage.cartBadgeShouldEqual(1);
        InventoryPage.openCart();

        cy.url().should('include', '/cart.html');
        cy.contains('.cart_item', checkoutProduct.name).should('be.visible');
      });
    });
  });
});
