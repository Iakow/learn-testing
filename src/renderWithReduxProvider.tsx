import { Provider } from "react-redux";
import store from "./store";
import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

export const customRender = (component: JSX.Element) => {
  return {
    ...render(
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    ),
  };
};
