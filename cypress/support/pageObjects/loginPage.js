class LoginPage {
  fillEmail(email) {
    cy.get("#Email").type(email);
  }

  fillPassword(password) {
    cy.get("#Password").type(password);
  }

  submitLoginForm() {
    cy.get('input[value="Log in"]').click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submitLoginForm();
  }

  loginError1() {
    return cy.get(".validation-summary-errors > span");
  }

  loginError2() {
    return cy.get(".validation-summary-errors > ul > li");
  }
}

export default LoginPage;
