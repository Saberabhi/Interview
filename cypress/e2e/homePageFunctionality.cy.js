/// <reference types="cypress" />
import HomePage from "../support/pageObjects/homePage";
import LoginPage from "../support/pageObjects/loginPage";

describe("Login/Logout functionality", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();

  beforeEach(() => {
    cy.visit("/");
    homePage.getLoginLink().click();
  });

  it("should log in with valid credentials", () => {
    loginPage.login("user.one@yopmail.com", "1Q@qwe");
    cy.url().should("eq", "https://demowebshop.tricentis.com/");
    homePage
      .accountName()
      .should("have.text", "user.one@yopmail.com")
      .should("be.visible");
    homePage.logoutButton().should("exist").click();
  });

  it("should display error message for invalid credentials", () => {
    loginPage.login("invalid@yopmail.com", "invalidpassword");
    loginPage
      .loginError1()
      .should(
        "have.text",
        "Login was unsuccessful. Please correct the errors and try again."
      );
    loginPage.loginError2().should("have.text", "No customer account found");
  });
});
describe("Featured Products on Home Page", () => {
  const homePage = new HomePage();
  beforeEach(() => {
    cy.visit("/");
  });

  it("should validate featured products on the home page", () => {
    // Assert that at least one featured product is visible
    homePage.getFeaturedProducts().should("be.visible");

    //Assert that each featured product has image, product title, product rating, price, and an "Add to Cart" button
    homePage.getFeaturedProducts().each(($product) => {
      cy.wrap($product).find(".picture").should("be.visible");
      cy.wrap($product).find(".product-title").should("be.visible");
      cy.wrap($product).find(".rating").should("be.visible");
      cy.wrap($product).find(".prices").should("be.visible");
      cy.wrap($product).find(".buttons").should("be.visible");
    });
  });
});
