// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");

  app.document.head.appendChild(style);
}
import HomePage from "../support/pageObjects/homePage";
import ShoppingCart from "../support/pageObjects/shoppingCart";

Cypress.Commands.add("addItemsToCartFromFixture", () => {
  const homePage = new HomePage();
  const shoppingCart = new ShoppingCart();
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
        shoppingCart
          .shoppingCartQty()
          .should("exist")
          .invoke("text")
          .should("eq", `(${totalItemsAdded})`);
      });
    });
  });
});
