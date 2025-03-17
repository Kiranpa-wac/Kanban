import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ column, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const style = {
    backgroundColor: isOver ? "#e0e0e0" : "#f8f9fa",
    width: "20rem",
  };

  return (
    <div
      ref={setNodeRef}
      className="d-flex flex-column rounded p-4"
      style={style}
    >
      <h2 className="mb-4 fw-semibold text-dark">{column.title}</h2>
      <div className="d-flex flex-column gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
