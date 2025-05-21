import React, { useState } from "react";

function JobForm({ onAdd }) {
  // onAdd is a prop function to handle adding a new job application
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState(""); // for error message display

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Client-side validation
    if (!companyName.trim() || !position.trim()) {
      setError("Company name and position are required.");
      return;
    }

    const err = await onAdd({ companyName, position });
    if (err) {
      setError(err);
    } else {
      setCompanyName("");
      setPosition("");
    }
  };

  return (
    // Form to add a new job application
    // Note: The form does not include a status field as it defaults to "Applied"
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <button type="submit">Add Application</button>
    </form>
  );
}

export default JobForm;
