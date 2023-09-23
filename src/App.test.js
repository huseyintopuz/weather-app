import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("Header renders correctly", () => {
  render(<App />);

  const headerEl = screen.getByRole("heading", { name: /Hava Durumu/i });
  expect(headerEl).toBeInTheDocument();
});

// Check if the input is rendered
test("renders an input", () => {
  render(<App />);

  // Check if the input is rendered
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();

  // Check if the input has the correct placeholder
  expect(inputElement).toHaveAttribute("placeholder", "Search");

  // Simulate a user typing into the input
  fireEvent.change(inputElement, { target: { value: "Hello" } });
  expect(inputElement).toHaveValue("Hello");
});
