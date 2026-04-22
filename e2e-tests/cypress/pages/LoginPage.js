class LoginPage {
  visit() {
    cy.visit('/');
  }

  usernameInput() {
    return cy.get('[data-test="username"]');
  }

  passwordInput() {
    return cy.get('[data-test="password"]');
  }

  loginButton() {
    return cy.get('[data-test="login-button"]');
  }

  errorMessage() {
    return cy.get('[data-test="error"]');
  }

  assertLoaded() {
    this.usernameInput().should('be.visible');
    this.passwordInput().should('be.visible');
    this.loginButton().should('be.visible');
  }

  loginAs(username, password) {
    this.usernameInput().clear().type(username);
    this.passwordInput().clear().type(password, { log: false });
    this.loginButton().click();
  }
}

module.exports = new LoginPage();
