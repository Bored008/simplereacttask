const todoKey = "reactTodo";

export const getLocalStorageData = () => {
  const rawTodos = localStorage.getItem(todoKey);
  if (!rawTodos) return [];
  return JSON.parse(rawTodos);
};

export const setLocalStorageData = (mainTask) => {
  return localStorage.setItem(todoKey, JSON.stringify(mainTask));
};
