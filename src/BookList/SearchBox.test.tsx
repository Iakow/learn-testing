import { SearchBox } from "./SearchBox";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import bookListReducer, { setTerm } from "./bookListSlice";

describe("SearchBox", () => {
  it("renders input", async () => {
    const mockStore = configureStore({
      reducer: {
        list: bookListReducer,
      },
    });

    render(
      <Provider store={mockStore}>
        <SearchBox />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    await act(async () => {
      userEvent.type(input, "domain");
    });
    expect(input).toBeInTheDocument();
  });

  // Невалидный после переноса логики в редакс

  // it("trim empty strings", async () => {
  //   render(<SearchBox />);
  //   const input = screen.getByRole("textbox");
  //   await act(async () => {
  //     userEvent.type(input, " ");
  //   });
  //   // expect(props.onSearch).not.toHaveBeenCalled();
  // });
});

describe("bookListReducer", () => {
  const initialState = {
    term: "",
    books: [],
    loading: false,
    error: false,
  };

  it("should handle setTerm action", () => {
    const action = setTerm("Refactoring");
    const newState = bookListReducer(initialState, action);
    expect(newState.term).toEqual("Refactoring");
  });
});
