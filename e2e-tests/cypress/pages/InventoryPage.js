class InventoryPage {
  inventoryContainer() {
    return cy.get('[data-test="inventory-container"]');
  }

  inventoryItems() {
    return cy.get('.inventory_item');
  }

  cartLink() {
    return cy.get('[data-test="shopping-cart-link"]');
  }

  cartBadge() {
    return cy.get('[data-test="shopping-cart-badge"]');
  }

  sortDropdown() {
    return cy.get('[data-test="product-sort-container"]');
  }

  pageTitle() {
    return cy.get('[data-test="title"]');
  }

  menuButton() {
    return cy.get('#react-burger-menu-btn');
  }

  inventoryItemByName(name) {
    return cy.contains('.inventory_item', name);
  }

  addItemToCart(name) {
    this.inventoryItemByName(name)
      .find('button')
      .should('contain.text', 'Add to cart')
      .click();
  }

  openCart() {
    this.cartLink().click();
  }

  openCheckoutFromCart() {
    this.openCart();
    cy.get('[data-test="checkout"]').click();
  }

  cartBadgeShouldEqual(count) {
    this.cartBadge().should('be.visible').and('have.text', String(count));
  }

  assertLoaded() {
    this.inventoryContainer().should('be.visible');
    this.pageTitle().should('contain.text', 'Products');
    this.cartLink().should('be.visible');
  }

  assertItemPresent(name) {
    this.inventoryItemByName(name).should('be.visible');
  }

  getItemImageSources() {
    return cy.get('.inventory_item_img img').then(($images) =>
      Cypress._.map($images, (image) => image.getAttribute('src'))
    );
  }
}

module.exports = new InventoryPage();
