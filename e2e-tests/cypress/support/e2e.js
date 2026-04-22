require('./commands');

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
