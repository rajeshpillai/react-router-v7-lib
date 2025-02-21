// src/utils/api.js
export const fetchTodos = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const createTodo = async (newTodo) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
};

export const updateTodo = async (id, updatedTodo) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedTodo),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
};

export const deleteTodo = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  });
  return id;
};
