import React,{useState} from "react";
import useLocalStorage from "./useLocalStorage";
const useDND = ({INITIAL_TASKS}) => {
  const [tasks, setTasks] = useLocalStorage("tasks", INITIAL_TASKS);
  const [activeTaskId, setActiveTaskId] = useState(null);

  const handleDragStart = (event) => {
    setActiveTaskId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over) {
      const updatedStatus = over.id;
      setTasks((prevTasks) => {
        const draggedTask = prevTasks.find((task) => task.id === active.id);
        if (!draggedTask) return prevTasks;
        const remainingTasks = prevTasks.filter(
          (task) => task.id !== active.id
        );
        const updatedTask = { ...draggedTask, status: updatedStatus };
        return [...remainingTasks, updatedTask];
      });
    }
    setActiveTaskId(null);
  };

  return { tasks, setTasks, handleDragEnd, handleDragStart, activeTaskId, setActiveTaskId };
};

export default useDND;
