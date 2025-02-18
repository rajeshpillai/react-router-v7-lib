import { useLoaderData, Link } from "react-router";

function TodoView() {
  const todo = useLoaderData();
  return (
    <div>
      <h1>Todo Details</h1>
      <p><strong>Title:</strong> {todo.title}</p>
      <p><strong>Completed:</strong> {todo.completed ? "Yes" : "No"}</p>
      <Link to="/todos">Back to List</Link>
    </div>
  );
}
export default TodoView;