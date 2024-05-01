class ShoppingCart {
  updateCart() {
    return cy.get(".button-2.update-cart-button");
  }

  continueShopping() {
    return cy.get("button-2.continue-shopping-button");
  }

  addToCartButton() {
    return cy.get(".button-2");
  }

  checkout() {
    return cy.get(".button-1.checkout-button");
  }

  barNotification() {
    return cy.get(".bar-notification");
  }

  barNotificationSucess() {
    return cy.get(".bar-notification.success");
  }

  termsOfService() {
    return cy.get("#termsofservice");
  }

  removeFromCart() {
    return cy.get("input[name='removefromcart']");
  }

  removeItem() {
    return cy.get(":nth-child(2) > .remove-from-cart > input");
  }

  shoppingCartQty() {
    return cy.get(".cart-qty");
  }
}

export default ShoppingCart;
