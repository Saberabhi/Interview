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
    cy.addItemsToCartFromFixture();
    homePage.getShoppingCart().click();
  });

  it("updates the shopping cart by deleting one item", () => {
    cy.addItemsToCartFromFixture();
    homePage.getShoppingCart().click();
    shoppingCart.removeFromCart(
      ".cart-item:nth-child(2) input[type='checkbox']"
    );
    shoppingCart.removeItem(2).check().should("be.checked");
    shoppingCart.updateCart().click();
    shoppingCart.termsOfService().check().should("be.checked");
    shoppingCart.checkout().click();
  });

  it("proceed to checkout", () => {
    cy.fixture("example.json").then((fixture) => {
      cy.addItemsToCartFromFixture();
      homePage.getShoppingCart().click();
      shoppingCart.termsOfService().check().should("be.checked");
      shoppingCart.checkout().click();
      checkoutPage.checkoutAsGuest().click();
      checkoutPage.continueButton1().click();
      checkoutPage.fieldValidationError().should("have.length.gt", 0);
    });
  });
});
