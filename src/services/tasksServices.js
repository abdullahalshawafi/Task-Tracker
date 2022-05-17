export const createTask = async (task) => {
  const response = await fetch("api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const newTask = await response.json();

  return newTask;
};

export const fetchTasks = async () => {
  const response = await fetch("api/tasks");
  const data = await response.json();
  return data;
};

export const toggleTaskReminder = async (task) => {
  await fetch(`api/tasks/${task.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reminder: !task.reminder,
    }),
  });
};

export const removeTask = async (taskId) => {
  const response = await fetch(`api/tasks/${taskId}`, {
    method: "DELETE",
  });

  return response.status === 200;
};
