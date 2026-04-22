const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');

describe('UI Validation', () => {
  it('validates the main inventory page elements for a standard user', () => {
    cy.fixture('users').then(({ standard_user: user }) => {
      LoginPage.visit();
      LoginPage.assertLoaded();
      LoginPage.loginAs(user.username, user.password);

      InventoryPage.assertLoaded();
      cy.url().should('include', '/inventory.html');
      InventoryPage.menuButton().should('be.visible');
      InventoryPage.sortDropdown().should('be.visible');
      InventoryPage.inventoryItems().should('have.length.at.least', 1);
    });
  });

  it('documents duplicated item imagery for problem_user', () => {
    cy.fixture('users').then(({ problem_user: user }) => {
      LoginPage.visit();
      LoginPage.loginAs(user.username, user.password);

      InventoryPage.assertLoaded();
      InventoryPage.getItemImageSources().then((sources) => {
        const uniqueSources = [...new Set(sources)];
        expect(uniqueSources.length).to.be.lessThan(sources.length);
      });
    });
  });
});
