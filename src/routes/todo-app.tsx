import "./todos.css";
import { useLoaderData, useNavigate, useFetcher, Link } from "react-router";
import { useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const todos = [];

export async function clientLoader() {
  console.log("TODOS: loader...");
  const response = await fetch(API_URL + "?_limit=10");
  const todoJson = await response.json();
  console.log("json: ", todoJson);
  const allData = [...todos, ...todoJson];
  console.log("all: ", allData);
  return allData;
}

export async function todosAction({ request }) {
  const formData = await request.formData();
  const actionType = formData.get("action");
  
  if (actionType === "add") {
    const newTodo = { title: formData.get("title"), completed: false };
    console.log("Adding todo: ", newTodo);
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: { "Content-Type": "application/json" },
    });
    todos.push(newTodo);
    return response.json();
  }

  if (actionType === "update") {
    const id = formData.get("id");
    const updatedTodo = { title: formData.get("title"), completed: formData.get("completed") === "true" };
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: { "Content-Type": "application/json" },
    });
    return updatedTodo;
  }

  if (actionType === "delete") {
    const id = formData.get("id");
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return { id };
  }
}

export default function TodoApp() {
  const todos = useLoaderData();
  const fetcher = useFetcher();
  const [modalTodo, setModalTodo] = useState(null);

  return (
    <div>
      <h1>Todo App</h1>
      <fetcher.Form method="post">
        <input name="title" placeholder="New todo" required />
        <input type="hidden" name="action" value="add" />
        <button type="submit">Add Todo</button>
      </fetcher.Form>
      {modalTodo && (
        <div className="modal">
          <h2>Todo Details</h2>
          <p><strong>Title:</strong> {modalTodo.title}</p>
          <p><strong>Completed:</strong> {modalTodo.completed ? "Yes" : "No"}</p>
          <button onClick={() => setModalTodo(null)}>Close</button>
        </div>
      )}
      <table border="1">
        <thead>
          <tr><th>Title</th><th>Completed</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>
                <fetcher.Form method="post" style={{ display: "inline" }}>
                  <input name="id" type="hidden" value={todo.id} />
                  <input name="title" defaultValue={todo.title} required />
                  <input type="hidden" name="action" value="update" />
                  <button type="submit">Save</button>
                </fetcher.Form>
              </td>
              <td>
                <fetcher.Form method="post">
                  <input type="hidden" name="id" value={todo.id} />
                  <input type="hidden" name="completed" value={(!todo.completed).toString()} />
                  <input type="hidden" name="action" value="update" />
                  <button type="submit">{todo.completed ? "Undo" : "Complete"}</button>
                </fetcher.Form>
              </td>
              <td>
                <button onClick={() => setModalTodo(todo)}>View</button>
                <fetcher.Form method="post">
                  <input type="hidden" name="id" value={todo.id} />
                  <input type="hidden" name="action" value="delete" />
                  <button type="submit">Delete</button>
                </fetcher.Form>
                <Link to={`/todos/${todo.id}`}>View in</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}