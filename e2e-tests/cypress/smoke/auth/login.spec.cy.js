const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');

describe('Smoke - Authentication', () => {
  it('logs in successfully with standard_user', () => {
    cy.fixture('users').then(({ standard_user: user }) => {
      LoginPage.visit();
      LoginPage.assertLoaded();
      LoginPage.loginAs(user.username, user.password);

      cy.url().should('include', '/inventory.html');
      InventoryPage.assertLoaded();
    });
  });
});
