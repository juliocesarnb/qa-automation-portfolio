class CheckoutPage {
  firstNameInput() {
    return cy.get('[data-test="firstName"]');
  }

  lastNameInput() {
    return cy.get('[data-test="lastName"]');
  }

  postalCodeInput() {
    return cy.get('[data-test="postalCode"]');
  }

  continueButton() {
    return cy.get('[data-test="continue"]');
  }

  finishButton() {
    return cy.get('[data-test="finish"]');
  }

  completeHeader() {
    return cy.get('[data-test="complete-header"]');
  }

  cartItems() {
    return cy.get('.cart_item');
  }

  assertInformationStepLoaded() {
    cy.url().should('include', '/checkout-step-one.html');
    this.firstNameInput().should('be.visible');
    this.lastNameInput().should('be.visible');
    this.postalCodeInput().should('be.visible');
  }

  fillInformation({ firstName, lastName, postalCode }) {
    this.enterFirstName(firstName);
    this.enterLastName(lastName);
    this.enterPostalCode(postalCode);
  }

  enterFirstName(firstName) {
    this.firstNameInput().clear().type(firstName);
  }

  enterLastName(lastName) {
    this.lastNameInput().clear().type(lastName);
  }

  enterPostalCode(postalCode) {
    this.postalCodeInput().clear().type(postalCode);
  }

  continue() {
    this.continueButton().click();
  }

  assertOverviewStepLoaded() {
    cy.url().should('include', '/checkout-step-two.html');
    this.finishButton().should('be.visible');
  }

  assertItemPresent(name) {
    cy.contains('.cart_item', name).should('be.visible');
  }

  finish() {
    this.finishButton().click();
  }

  assertCompletion() {
    cy.url().should('include', '/checkout-complete.html');
    this.completeHeader().should('be.visible').and('contain.text', 'Thank you for your order');
  }
}

module.exports = new CheckoutPage();
