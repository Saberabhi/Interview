class CheckoutPage {
  static checkoutAsGuest() {
    return cy.get(".checkout-as-guest-button");
  }
  static registerButton() {
    return cy.get(".register-button");
  }

  static continueButton1() {
    return cy.get("#billing-buttons-container > .button-1");
  }
}

export default CheckoutPage;
