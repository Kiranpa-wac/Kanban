// components/Dnd.jsx
import React, { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import useDND from "../Hooks/useDND";
import Column from "./Column";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial plans",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create design system for the project",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Integrate APIs with the project",
    status: "IN_PROGRESS",
  },
];

const Dnd = () => {
  const {
    tasks,
    setTasks,
    activeTaskId,
    handleDragEnd,
    handleDragStart,
  } = useDND({ INITIAL_TASKS });
  const handleAddTask = ({ title, description, status }) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="p-4">
        <Modal onAdd={handleAddTask} columns={COLUMNS} />
        <Link to="/calendar" className="btn btn-primary ms-3">Calendar</Link>
        <div className="d-flex gap-4">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeTaskId && (
          <div className="rounded bg-secondary p-4 shadow-sm">
            {(() => {
              const task = tasks.find((t) => t.id === activeTaskId);
              if (task) {
                return (
                  <>
                    <h3 className="fw-bold text-light">{task.title}</h3>
                    <p className="mt-2 fs-6 text-muted">{task.description}</p>
                  </>
                );
              }
              return null;
            })()}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Dnd;
