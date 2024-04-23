/// <reference types="cypress" />
import HomePage from "../support/pageObjects/homePage";

describe("Product browsing and searching", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should search for products from fixtures file and validate their existence", () => {
    cy.fixture("example.json").then((fixture) => {
      fixture.products.forEach((productName) => {
        HomePage.searchBox().type(productName);
        HomePage.searchButton().click();
        cy.contains(productName).should("be.visible");
      });
    });
  });

  it("should handle negative test cases for product not found", () => {
    HomePage.searchBox().type("no product");
    HomePage.searchButton().click();
    cy.contains("No products were found that matched your criteria.").should(
      "be.visible"
    );
  });
});
