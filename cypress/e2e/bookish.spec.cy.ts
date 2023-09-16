import axios from "axios";

const gotoApp = () => {
  cy.visit("http://127.0.0.1:3000/");
};

const checkAppTitle = () => {
  cy.get('h2[data-test="heading"]').contains("Bookish");
};

const cleanUpStubBooks = () => {
  return axios
    .delete("http://127.0.0.1:8080/books?_cleanup=true")
    .catch((err) => err);
};

describe("Bookish application", function () {
  // before(() => {
  //   cleanUpStubBooks();
  // });

  // afterEach(() => {
  //   cleanUpStubBooks();
  // });

  // beforeEach(async () => {
  //   const books = [
  //     { name: "Refactoring", id: 1 },
  //     { name: "Domain-driven design", id: 2 },
  //     { name: "Building Microservices", id: 3 },
  //   ];
  //
  //   await axios.post("http://localhost:8080/books", books[0], {
  //     headers: { "Content-Type": "application/json" },
  //   });
  //
  //   await axios.post("http://localhost:8080/books", books[1], {
  //     headers: { "Content-Type": "application/json" },
  //   });
  //
  //   await axios.post("http://localhost:8080/books", books[2], {
  //     headers: { "Content-Type": "application/json" },
  //   });
  // });

  it("Visits the bookish", () => {
    gotoApp();
    checkAppTitle();
  });

  it("Shows a book list", () => {
    gotoApp();
    cy.get('div[data-test="book-list"]').should("exist");
    cy.get("div.book-item").should((books) => {
      // eslint-disable-next-line jest/valid-expect
      expect(books).to.have.length(4);
      // @ts-ignore
      const titles = [...books].map((x) => x.querySelector("h2").innerHTML);
      // eslint-disable-next-line jest/valid-expect
      expect(titles).to.deep.equal([
        "Refactoring",
        "Domain-driven design",
        "Building Microservices",
        "Acceptance Test Driven Development with React",
      ]);
    });
  });

  it("Goes to the detail page", () => {
    gotoApp();
    cy.get("div.book-item").contains("View Details").eq(0).click();
    cy.url().should("include", "/books/1");
    cy.get("h2.book-title").contains("Refactoring");
  });

  it("Searches for a title", () => {
    gotoApp();
    cy.get("div.book-item").should("have.length", 4);
    cy.get('[data-test="search"] input').type("design");
    cy.get("div.book-item").should("have.length", 1);
    cy.get("div.book-item").eq(0).contains("Domain-driven design");
  });
});
