import React from 'react';
import { useLoaderData, Outlet, useParams} from 'react-router';
import { fetchTodos } from '../utils/api';
import Sidebar from '../components/sidebar';
import Dashboard from '../components/dashboard';
import "./todoer.css";

// Loader to fetch todos
export const todosLoader = async () => {
  const todos = await fetchTodos('https://jsonplaceholder.typicode.com/todos?_limit=10');
  return todos;
};

export default function Todoer() {
  const todos = useLoaderData(); // Load todos with loader
  let {todoId} = useParams();

  console.log("Params: ", todoId);
  return (
    <div className="todo-app">
      <Sidebar todos={todos} />
      <div className="content">
        {!todoId ? <Dashboard /> : ""} 
        <Outlet/>
      </div>
    </div>
  );
}

