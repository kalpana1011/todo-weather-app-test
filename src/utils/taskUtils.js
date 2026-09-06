export const validateTitle = (title) => {
  if (!title.trim()) {
    return "Skriv en uppgift innan du fortsätter.";
  }

  if (title.trim().length < 2) {
    return "Uppgiften måste innehålla minst två tecken.";
  }

  return "";
};

export const filterTasks = (tasks, selectedFilter) => {
  if (selectedFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }

  if (selectedFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
};

export const countActiveTasks = (tasks) => {
  return tasks.filter((task) => !task.completed).length;
};

export const countCompletedTasks = (tasks) => {
  return tasks.filter((task) => task.completed).length;
};
