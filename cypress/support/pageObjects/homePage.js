class HomePage {
  getLoginLink() {
    return cy.get(".ico-login");
  }

  getShoppingCart() {
    return cy.get(".ico-cart > .cart-label");
  }

  getFeaturedProducts() {
    return cy.get(".product-item");
  }

  searchBox() {
    return cy.get("#small-searchterms");
  }

  searchButton() {
    return cy.get("form > .button-1");
  }

  accountName() {
    return cy.get(".header-links > ul > :nth-child(1) > .account");
  }

  logoutButton() {
    return cy.get(".ico-logout");
  }
}

export default HomePage;
