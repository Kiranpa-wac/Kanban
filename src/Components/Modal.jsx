import React, { useState } from "react";

const Modal = ({ onAdd, columns }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setTitle("");
    setDescription("");
    setStatus("TODO");
    setIsOpen(false);
  };

  const handleAdd = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please provide both a title and description");
      return;
    }
    onAdd({ title, description, status });
    closeModal();
  };

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        Add Task
      </button>
      {isOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="taskTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="taskDescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="taskStatus" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="taskStatus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {columns.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAdd}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
    