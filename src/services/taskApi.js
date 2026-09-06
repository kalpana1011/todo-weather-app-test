const TASKS_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/tasks";

const checkResponse = async (response, errorMessage) => {
  if (!response.ok) {
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const getTasks = async () => {
  const response = await fetch(TASKS_URL);
  return checkResponse(response, "Det gick inte att hämta uppgifterna.");
};

export const createTask = async (title) => {
  const response = await fetch(TASKS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      completed: false,
    }),
  });

  return checkResponse(response, "Det gick inte att skapa uppgiften.");
};

export const updateTask = async (id, changes) => {
  const response = await fetch(`${TASKS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changes),
  });

  return checkResponse(response, "Det gick inte att uppdatera uppgiften.");
};

export const deleteTask = async (id) => {
  const response = await fetch(`${TASKS_URL}/${id}`, {
    method: "DELETE",
  });

  return checkResponse(response, "Det gick inte att ta bort uppgiften.");
};
