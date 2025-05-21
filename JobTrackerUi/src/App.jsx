import React, { useEffect, useState } from "react";
import JobForm from "./components/JobForm";
import JobTable from "./components/JobTable";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "./services/api";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // move pagination state

  // Fetch data on first render
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchApplications();
      setApplications(data);
      setCurrentPage(1); // Page 1 on load
    };
    loadData();
  }, []);

  // Fetch applications from the backend
  const fetchApplications = async () => {
    try {
      const res = await getApplications();
      return res.data;
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      return [];
    }
  };

  // Add function with simple error handling
  const handleAdd = async (newApp) => {
    try {
      await createApplication(newApp);
      const data = await fetchApplications();
      setApplications(data);

      const total = data.length;
      const rowsPerPage = 5;
      const lastPage = Math.ceil(total / rowsPerPage);
      setCurrentPage(lastPage); // ✅ Jump to last page

      return null;
    } catch (err) {
      if (err.response?.data?.errors) {
        const first = Object.values(err.response.data.errors)[0][0];
        return first;
      }
      return "Failed to add application.";
    }
  };

  // Edit functions
  // Note: The edit function is simplified for demonstration purposes.
  // In a real-world scenario, you might want to fetch the existing data first.
  // Then, update only the fields that have changed.
  const handleEdit = async (id, updatedApp) => {
    try {
      await updateApplication(id, updatedApp);
      const data = await fetchApplications();
      setApplications(data); // Don't change page
      return null;
    } catch (err) {
      if (err.response?.data?.errors) {
        const first = Object.values(err.response.data.errors)[0][0];
        return first;
      }
      return "Failed to update application.";
    }
  };

  // Delete function
  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      const data = await fetchApplications();
      setApplications(data); // Don't change page
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Render the main application
  return (
    <div className="container">
      <h1>Job Application Tracker</h1>
      <JobForm onAdd={handleAdd} />
      <hr />
      <JobTable
        applications={applications}
        onEdit={handleEdit}
        onDelete={handleDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
// Note: Ensure to run the backend server on port 5005 or adjust the API_BASE accordingly.
// Note: This code assumes you have a backend server running that handles the API requests.
