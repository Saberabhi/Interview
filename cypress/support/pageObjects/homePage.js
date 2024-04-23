class HomePage {
  getLoginLink() {
    return cy.get(".ico-login");
  }

  static getShoppingCart() {
    return cy.get(".ico-cart > .cart-label");
  }

  static getFeaturedProducts() {
    return cy.get(".product-item");
  }

  static searchBox() {
    return cy.get("#small-searchterms");
  }

  static searchButton() {
    return cy.get("form > .button-1");
  }
}

export default HomePage;
