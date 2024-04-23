/// <reference types="cypress" />
import CheckoutPage from "../support/pageObjects/checkoutPage";
import HomePage from "../support/pageObjects/homePage";
import ShoppingCart from "../support/pageObjects/shoppingCart";
describe("Add to Cart and Delete Item", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should search for items from fixtures and adds available items to cart", () => {
    cy.fixture("example.json").then((fixture) => {
      let totalItemsAdded = 0;
      fixture.tobuy.forEach((productName) => {
        HomePage.searchBox().type(productName);
        HomePage.searchButton().click();
        cy.get(".button-2").click();
        cy.wait(1000);
        cy.get(".bar-notification").then((notification) => {
          if (notification.text().includes("Out of stock")) {
            cy.log(`${productName} is out of stock`);
          } else {
            cy.get(".bar-notification.success")
              .should("exist")
              .and("be.visible");
            totalItemsAdded = totalItemsAdded + 1;
          }
          cy.get(".cart-qty")
            .should("exist")
            .invoke("text")
            .should("eq", `(${totalItemsAdded})`);
        });
      });
      HomePage.getShoppingCart().click();
    });
  });

  it("updates the shopping cart by deleting one item", () => {
    cy.fixture("example.json").then((fixture) => {
      fixture.tobuy.forEach((productName) => {
        HomePage.searchBox().type(productName);
        HomePage.searchButton().click();
        cy.get(".button-2").click();
        cy.wait(1000);
        cy.get(".bar-notification").then((notification) => {
          if (notification.text().includes("Out of stock")) {
            cy.log(`${productName} is out of stock`);
          } else {
            cy.get(".bar-notification.success")
              .should("exist")
              .and("be.visible");
          }
        });
      });
      HomePage.getShoppingCart().click();
      ShoppingCart.removeFromCart(
        ".cart-item:nth-child(2) input[type='checkbox']"
      );
      ShoppingCart.removeItem(2).check().should("be.checked");
      ShoppingCart.updateCart().click();
      ShoppingCart.termsOfService().check().should("be.checked");
      ShoppingCart.checkout().click();
    });
  });
  it.only("proceed to checkout", () => {
    cy.fixture("example.json").then((fixture) => {
      fixture.tobuy.forEach((productName) => {
        HomePage.searchBox().type(productName);
        HomePage.searchButton().click();
        cy.get(".button-2").click();
        cy.wait(1000);
        cy.get(".bar-notification").then((notification) => {
          if (notification.text().includes("Out of stock")) {
            cy.log(`${productName} is out of stock`);
          } else {
            cy.get(".bar-notification.success")
              .should("exist")
              .and("be.visible");
          }
        });
      });
      HomePage.getShoppingCart().click();
      ShoppingCart.termsOfService().check().should("be.checked");
      ShoppingCart.checkout().click();
      CheckoutPage.checkoutAsGuest().click();
      CheckoutPage.continueButton1().click();
      cy.get(".field-validation-error").should("have.length.gt", 0);
    });
  });
});
