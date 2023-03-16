import React from "react";
import { render, screen } from "@testing-library/react";
import SimpleCalculator from "./App";

test("renders learn react link", () => {
  render(<SimpleCalculator />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
