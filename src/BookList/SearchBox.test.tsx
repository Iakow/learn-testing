import { SearchBox } from "./SearchBox";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  it("renders input", async () => {
    const props = {
      term: "",
      onSearch: jest.fn(),
    };

    render(<SearchBox {...props} />);
    const input = screen.getByRole("textbox");
    await act(async () => {
      userEvent.type(input, "domain");
    });
    expect(props.onSearch).toHaveBeenCalled();
  });

  it("trim empty strings", async () => {
    const props = {
      term: "",
      onSearch: jest.fn(),
    };
    render(<SearchBox {...props} />);
    const input = screen.getByRole("textbox");
    await act(async () => {
      userEvent.type(input, " ");
    });
    expect(props.onSearch).not.toHaveBeenCalled();
  });
});
