import { render, screen, fireEvent } from "@testing-library/react";
import JobForm from "../components/JobForm";

test("renders inputs and submit button", () => {
  render(<JobForm onAdd={jest.fn()} />);
  expect(screen.getByPlaceholderText(/Company Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Position/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Application/i)).toBeInTheDocument();
});

test("shows error if fields are empty", async () => {
  const mockAdd = jest
    .fn()
    .mockResolvedValue("Company name and position are required.");
  render(<JobForm onAdd={mockAdd} />);
  fireEvent.click(screen.getByText(/Add Application/i));
  expect(await screen.findByText(/required/)).toBeInTheDocument();
});
