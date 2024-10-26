import React from "react";
import { render, screen } from "@testing-library/react";
import { ReviewList } from "./ReviewList";
import BookDetail from "./BookDetail";
import { customRender } from "../renderWithReduxProvider";

describe("ReviewList", () => {
  it("renders an empty list", () => {
    const reviews = [
      {
        id: 1,
        bookId: 1,
        name: "Juntao Qiu",
        date: "2023/06/01",
        content: "Excellent work, really impressed by your efforts",
      },
    ];

    customRender(<ReviewList reviews={reviews} />);
    expect(screen.getByTestId("reviews-container")).toBeInTheDocument();
  });

  it("renders a list when data is passed", () => {
    const reviews = [
      {
        id: 1,
        bookId: 1,
        name: "Juntao Qiu",
        date: "2023/06/21",
        content: "Excellent work, really impressed by your efforts",
      },
      {
        id: 2,
        bookId: 1,
        name: "Abruzzi Kim",
        date: "2023/06/22",
        content: "What a great book",
      },
    ];
    customRender(<ReviewList reviews={reviews} />);
    const items = screen.getAllByTestId("review");
    expect(items.length).toBe(2);
  });

  it("renders reviews", () => {
    const props = {
      book: {
        id: 1,
        name: "Refactoring",
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques...",
        reviews: [
          {
            id: 1,
            bookId: 1,
            name: "Juntao",
            date: "2023/06/21",
            content: "Excellent work, really impressed by your efforts",
          },
        ],
      },
    };
    customRender(<BookDetail {...props} />);
    const reviews = screen.getAllByTestId("review");
    const content = screen.getAllByTestId("review-content");
    expect(reviews.length).toBe(1);
    expect(content[0].innerHTML).toEqual(
      "Excellent work, really impressed by your efforts"
    );
  });

  it("renders book review detailed information", () => {
    const reviews = [
      {
        id: 1,
        bookId: 1,
        name: "Juntao Qiu",
        date: "2023/06/21",
        content: "Excellent work, really impressed by your efforts",
      },
    ];

    customRender(<ReviewList reviews={reviews} />);
    expect(screen.getByTestId("name")).toHaveTextContent("Juntao Qiu");
    expect(screen.getByTestId("review-content")).toHaveTextContent(
      "Excellent work, really impressed by your efforts"
    );
  });
});
