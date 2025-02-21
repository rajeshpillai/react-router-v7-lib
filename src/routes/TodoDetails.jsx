// src/routes/TodoDetails.jsx

import { useLoaderData, useNavigation } from 'react-router';
import { fetchTodos } from '../utils/api';


// Loader for Todo Details
export const clientLoader = async ({ params }) => {
  const { todoId } = params;
  const todo = await fetchTodos(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
  console.log("tld: ", todo);
  return todo; // Assuming the response is an array
};

export default function TodoDetails() {
  const todo = useLoaderData(); // Load todo details from the loader
  const navigation = useNavigation(); // Get navigation state

  // If the route is loading (data is being fetched)
  console.log(navigation);
  if (navigation.state === 'loading') {
    return <div>Loading...</div>; // Show a loading message
  }
  return (
    <div className="todo-details">
      <h2>{todo.title}</h2>
      <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
      <div>
        <h3>Subtasks</h3>
        {/* Handle subtasks, if any */}
      </div>
    </div>
  );
};

