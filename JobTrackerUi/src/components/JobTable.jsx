import React, { useState } from "react";

function JobTable({
  applications,
  onEdit,
  onDelete,
  currentPage,
  setCurrentPage,
}) {
  // props for edit and delete functions
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});
  const [editError, setEditError] = useState(""); // for error message display

  const rowsPerPage = 5; // Number of rows to display per page

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedApps = applications.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const emptyRows = rowsPerPage - paginatedApps.length;

  const startEditing = (app) => {
    setEditRowId(app.id);
    setEditData({ ...app });
    setEditError(""); // clear any previous error
  };

  const cancelEditing = () => {
    setEditRowId(null);
    setEditData({});
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handleSave = async () => {
    setEditError("");

    // Client-side validation
    if (!editData.companyName.trim() || !editData.position.trim()) {
      setEditError("Company name and position are required.");
      return;
    }

    const err = await onEdit(editRowId, editData);
    if (err) {
      setEditError(err); // capture error from App.jsx
    } else {
      setEditError("");
      cancelEditing();
    }
  };

  return (
    // Render the table with editable rows
    <div>
      {editError && (
        <div style={{ color: "red", marginBottom: "10px" }}>{editError}</div>
      )}
      <table style={{ tableLayout: "fixed", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Company</th>
            <th style={{ width: "25%" }}>Position</th>
            <th style={{ width: "10%" }}>Status</th>
            <th style={{ width: "15%" }}>Date Applied</th>
            <th style={{ width: "25%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedApps.map((app) => (
            <tr key={app.id}>
              <td>
                {editRowId === app.id ? (
                  <input
                    type="text"
                    value={editData.companyName}
                    onChange={(e) =>
                      handleChange("companyName", e.target.value)
                    }
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      fontSize: "inherit",
                      padding: "2px",
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  app.companyName
                )}
              </td>
              <td>
                {editRowId === app.id ? (
                  <input
                    type="text"
                    value={editData.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      fontSize: "inherit",
                      padding: "2px",
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  app.position
                )}
              </td>
              <td>
                {editRowId === app.id ? (
                  <select
                    value={editData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      fontSize: "inherit",
                      padding: "2px",
                    }}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                ) : (
                  app.status
                )}
              </td>
              <td>{new Date(app.dateApplied).toLocaleDateString()}</td>
              <td>
                {editRowId === app.id ? (
                  <>
                    <button className="save" onClick={handleSave}>
                      Save
                    </button>
                    <button className="cancel" onClick={cancelEditing}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="edit" onClick={() => startEditing(app)}>
                      Edit
                    </button>
                    <button className="delete" onClick={() => onDelete(app.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {/* Add empty rows if needed */}
          {Array.from({ length: emptyRows }).map((_, idx) => (
            <tr key={`empty-${idx}`}>
              <td colSpan="5" style={{ height: "45px" }}>
                &nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 1rem" }}>
          Page {currentPage} of {Math.ceil(applications.length / rowsPerPage)}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(applications.length / rowsPerPage)
                ? prev + 1
                : prev
            )
          }
          disabled={currentPage >= Math.ceil(applications.length / rowsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default JobTable;
