import React from "react";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded bg-secondary p-4 shadow-sm task-card-hover"
    >
      <h3 className="fw-bold text-light mb-0">{task.title}</h3>
      <p className="mt-2 fs-6 text-muted">{task.description}</p>
    </div>
  );
};

export default TaskCard;
