import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hero text", () => {
  render(<App />);
  const heroText = screen.getByText(/hi, i'm sakariye abdikariin/i);
  expect(heroText).toBeInTheDocument();
});
