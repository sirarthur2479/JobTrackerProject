import { render, screen, fireEvent } from "@testing-library/react";
import JobTable from "../components/JobTable";

describe("JobTable", () => {
  const applications = [
    {
      id: 1,
      companyName: "Test Corp",
      position: "Developer",
      status: "Applied",
      dateApplied: new Date().toISOString(),
    },
  ];

  const noop = () => {};

  test("renders job application row", () => {
    render(
      <JobTable
        applications={applications}
        onEdit={noop}
        onDelete={noop}
        currentPage={1}
        setCurrentPage={noop}
      />
    );

    expect(screen.getByText("Test Corp")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Applied")).toBeInTheDocument();
  });

  test("renders edit and delete buttons", () => {
    render(
      <JobTable
        applications={applications}
        onEdit={noop}
        onDelete={noop}
        currentPage={1}
        setCurrentPage={noop}
      />
    );

    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
  });
});

describe("JobTable interactions", () => {
  const applications = Array.from({ length: 6 }).map((_, idx) => ({
    id: idx + 1,
    companyName: `Company ${idx + 1}`,
    position: `Position ${idx + 1}`,
    status: "Applied",
    dateApplied: new Date().toISOString(),
  }));

  const mockEdit = jest.fn();
  const mockDelete = jest.fn();
  const mockSetPage = jest.fn();

  test("pagination shows only 5 rows per page", () => {
    render(
      <JobTable
        applications={applications}
        onEdit={mockEdit}
        onDelete={mockDelete}
        currentPage={1}
        setCurrentPage={mockSetPage}
      />
    );

    const rows = screen.getAllByRole("row");
    // +1 for the header row
    expect(rows.length).toBe(6); // 1 header + 5 data rows
  });

  test("clicking next triggers setCurrentPage", () => {
    render(
      <JobTable
        applications={applications}
        onEdit={mockEdit}
        onDelete={mockDelete}
        currentPage={1}
        setCurrentPage={mockSetPage}
      />
    );

    fireEvent.click(screen.getByText(/Next/i));
    expect(mockSetPage).toHaveBeenCalled();
  });

  test("clicking edit puts row into edit mode", () => {
    render(
      <JobTable
        applications={[applications[0]]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        currentPage={1}
        setCurrentPage={mockSetPage}
      />
    );

    fireEvent.click(screen.getByText(/Edit/i));
    expect(screen.getByDisplayValue("Company 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Position 1")).toBeInTheDocument();
  });

  test("clicking delete calls onDelete with correct id", () => {
    render(
      <JobTable
        applications={[applications[0]]}
        onEdit={mockEdit}
        onDelete={mockDelete}
        currentPage={1}
        setCurrentPage={mockSetPage}
      />
    );

    fireEvent.click(screen.getByText(/Delete/i));
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
