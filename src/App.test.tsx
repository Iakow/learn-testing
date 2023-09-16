import { screen } from "@testing-library/react";
import React from "react";
import { customRender } from "./renderWithReduxProvider";
import App from "./App";

describe("BookList", () => {
  it("renders bookish", () => {
    customRender(<App />);
    const heading = screen.getByText(/Bookish/i);
    expect(heading).toBeInTheDocument();
  });
});
