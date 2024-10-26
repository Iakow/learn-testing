import React from "react";
import { render, screen, within } from "@testing-library/react";
import BookDetail from "./BookDetail";
import { customRender } from "../renderWithReduxProvider";

describe("BookList", () => {
  it("renders title", () => {
    const props = {
      book: {
        id: 1,
        name: "Refactoring",
      },
    };
    customRender(<BookDetail {...props} />);
    const title = screen.getByRole("heading");
    expect(title.innerHTML).toEqual(props.book.name);
  });

  it("renders description", () => {
    const props = {
      book: {
        id: 1,
        name: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques " +
          "that hundreds of thousands of developers have used to improve " +
          "their software.",
      },
    };
    customRender(<BookDetail {...props} />);
    const description = screen.getByText(props.book.description);
    expect(description).toBeInTheDocument();
  });

  it("displays the book name when no description was given", () => {
    const props = {
      book: {
        id: 1,
        name: "Refactoring",
      },
    };
    customRender(<BookDetail {...props} />);
    const description = screen.getByTestId("book-description");
    expect(description).toHaveTextContent(props.book.name);
  });

  it("renders review form", () => {
    const props = {
      book: {
        id: 1,
        name: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques...",
      },
    };
    customRender(<BookDetail {...props} />);
    const nameInput = screen.getByTestId("name");
    const contentInput = screen.getByTestId("content");
    const button = screen.getByTestId("submit");
    expect(nameInput).toBeInTheDocument();
    expect(contentInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
