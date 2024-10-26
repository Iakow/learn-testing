import React from "react";
import {act, render, screen} from "@testing-library/react";
import {ReviewItem} from "./ReviewItem";
import userEvent from "@testing-library/user-event";
import {configureStore} from "@reduxjs/toolkit";
import {updateReview} from "./reviewSlice";
import axios from "axios";
import reviewSliceReducer from "./reviewSlice";
import {customRender} from "../renderWithReduxProvider";

describe("ReviewItem", () => {
  it("renders", () => {
    const review = {
      id: 1,
      bookId: 1,
      name: "Juntao Qiu",
      date: "2023/06/21",
      content: "Excellent work, really impressed by your efforts",
    };
    customRender(<ReviewItem review={review}/>);
    expect(screen.getByTestId("name")).toHaveTextContent("Juntao Qiu");
    expect(screen.getByTestId("review-content")).toHaveTextContent(
      "Excellent work, really impressed by your efforts"
    );
  });

  it("edit a review item", () => {
    const review = {
      id: 1,
      bookId: 1,
      name: "Juntao Qiu",
      date: "2023/06/21",
      content: "Excellent work, really impressed by your efforts",
    };
    customRender(<ReviewItem review={review}/>);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Edit");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(button);
    });
    expect(button).toHaveTextContent("Submit");
  });

  it("copy content to a textarea for editing", () => {
    const review = {
      id: 1,
      bookId: 1,
      name: "Juntao Qiu",
      date: "2023/06/21",
      content: "Excellent work, really impressed by your efforts",
    };
    customRender(<ReviewItem review={review}/>);
    const button = screen.getByRole("button");
    const content = screen.getByTestId("review-content");
    expect(content).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(button);
    });
    const editingContent = screen.getByRole("textbox");
    expect(content).not.toBeInTheDocument();
    expect(editingContent).toBeInTheDocument();
    expect(editingContent).toHaveValue(
      "Excellent work, really impressed by your efforts"
    );
  });

  it("updates a review", async () => {
    const mockStore = configureStore({
      reducer: {
        reviewSliceReducer,
      },
    });
    const review = {
      id: 1,
      content: "Good work",
    };
    const putSpy = jest.spyOn(axios, "put").mockResolvedValue({data: review});

    const response = await mockStore.dispatch(updateReview({
      bookId: 1,
      reviewId: 1,
      content: "Good work",
    }))

    expect(response.payload).toEqual(review);
    expect(putSpy).toHaveBeenCalledWith(
      "http://localhost:8080/books/1/reviews/1",
      {content: "Good work"}
    );
  });

  it("handles network error", async () => {
    const mockStore = configureStore({
      reducer: {
        reviewSliceReducer,
      },
    });
    const error = new Error("Network error");
    const putSpy = jest.spyOn(axios, "put").mockRejectedValueOnce(error);
    await mockStore
      .dispatch(
        updateReview({
          bookId: 1,
          reviewId: 1,
          content: "Good work",
        })
      )
      .then((response) => {
        expect(response.type).toEqual("reviews/updateReview/rejected");
      });

    expect(putSpy).toHaveBeenCalledWith(
      "http://localhost:8080/books/1/reviews/1",
      {content: "Good work"}
    );
  });

  it("update the content", () => {
    const review = {
      id: 1,
      bookId: 1,
      name: "Juntao Qiu",
      date: "2023/06/21",
      content: "Excellent work, really impressed by your efforts",
    };
    customRender(<ReviewItem review={review}/>);
    const putSpy = jest.spyOn(axios, "put").mockResolvedValue({
      data: review,
    });
    const button = screen.getByRole("button");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(button);
    });
    const editingContent = screen.getByRole("textbox");
    expect(editingContent).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.clear(editingContent);
      userEvent.type(editingContent, "I mean this is fantastic");
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(button);
    });
    expect(putSpy).toHaveBeenCalledWith(
      "http://localhost:8080/books/1/reviews/1",
      {content: "I mean this is fantastic"}
    );
  });
});
