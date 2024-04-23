class ShoppingCart {
  static updateCart() {
    return cy.get(".button-2.update-cart-button");
  }

  continueShopping() {
    return cy.get("button-2.continue-shopping-button");
  }

  static checkout() {
    return cy.get(".button-1.checkout-button");
  }

  static termsOfService() {
    return cy.get("#termsofservice");
  }

  static removeFromCart() {
    return cy.get("input[name='removefromcart']");
  }

  static removeItem() {
    return cy.get(":nth-child(2) > .remove-from-cart > input");
  }
}

export default ShoppingCart;
