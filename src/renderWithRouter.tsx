import { MemoryRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

export const renderWithRouter = (component: JSX.Element) => {
  return {
    ...render(<Router>{component}</Router>),
  };
};
