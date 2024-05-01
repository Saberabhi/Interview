/// <reference types="cypress" />
import CheckoutPage from "../support/pageObjects/checkoutPage";
import HomePage from "../support/pageObjects/homePage";
import ShoppingCart from "../support/pageObjects/shoppingCart";
describe("Add to Cart and Delete Item", () => {
  const homePage = new HomePage();
  const shoppingCart = new ShoppingCart();
  const checkoutPage = new CheckoutPage();
  beforeEach(() => {
    cy.visit("/");
  });
  it("should search for items from fixtures and adds available items to cart", () => {
    cy.fixture("example.json").then((fixture) => {
      let totalItemsAdded = 0;
      fixture.tobuy.forEach((productName) => {
        homePage.searchBox().type(productName);
        homePage.searchButton().click();
        shoppingCart.addToCartButton().click();
        cy.wait(1000);
        shoppingCart.barNotification().then((notification) => {
          if (notification.text().includes("Out of stock")) {
            cy.log(`${productName} is out of stock`);
          } else {
            shoppingCart
              .barNotificationSucess()
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
      homePage.getShoppingCart().click();
    });
  });

  it("updates the shopping cart by deleting one item", () => {
    cy.fixture("example.json").then((fixture) => {
      fixture.tobuy.forEach((productName) => {
        homePage.searchBox().type(productName);
        homePage.searchButton().click();
        shoppingCart.addToCartButton().click();
        cy.wait(1000);
        shoppingCart.barNotification().then((notification) => {
          if (notification.text().includes("Out of stock")) {
            cy.log(`${productName} is out of stock`);
          } else {
            shoppingCart
              .barNotificationSucess()
              .should("exist")
              .and("be.visible");
          }
        });
      });
      homePage.getShoppingCart().click();
      shoppingCart.removeFromCart(
        ".cart-item:nth-child(2) input[type='checkbox']"
      );
      shoppingCart.removeItem(2).check().should("be.checked");
      shoppingCart.updateCart().click();
      shoppingCart.termsOfService().check().should("be.checked");
      shoppingCart.checkout().click();
    });
  });
  it("proceed to checkout", () => {
    cy.fixture("example.json").then((fixture) => {
      fixture.tobuy.forEach((productName) => {
        homePage.searchBox().type(productName);
        homePage.searchButton().click();
        shoppingCart.addToCartButton().click();
        cy.wait(1000);
        shoppingCart.barNotification().then((notification) => {
          if (notification.text().includes("Out of stock")) {
            cy.log(`${productName} is out of stock`);
          } else {
            shoppingCart
              .barNotificationSucess()
              .should("exist")
              .and("be.visible");
          }
        });
      });
      homePage.getShoppingCart().click();
      shoppingCart.termsOfService().check().should("be.checked");
      shoppingCart.checkout().click();
      checkoutPage.checkoutAsGuest().click();
      checkoutPage.continueButton1().click();
      checkoutPage.fieldValidationError().should("have.length.gt", 0);
    });
  });
});
