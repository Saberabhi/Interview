class CheckoutPage {
  checkoutAsGuest() {
    return cy.get(".checkout-as-guest-button");
  }
  registerButton() {
    return cy.get(".register-button");
  }

  continueButton1() {
    return cy.get("#billing-buttons-container > .button-1");
  }

  fieldValidationError() {
    return cy.get(".field-validation-error");
  }
}

export default CheckoutPage;
