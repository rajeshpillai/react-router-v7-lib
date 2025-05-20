import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import './index.css'
import App, { clientLoader as postsLoader } from './routes/app';
import TodoView from './components/todoview';
import TodoApp, {clientLoader as todosLoader, todosAction} from './routes/todo-app';
import Todoer, {todosLoader as todosLoader1} from './routes/todoer';
import TodoDetails, {clientLoader as todoDetailsLoader} from "./routes/todo-details";
import Layout from './components/layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // All routes go through Layout
    children: [
      {
        index: true,
        element: <App />,
        loader: postsLoader,
      },
      {
        path: "todos",
        element: <TodoApp />,
        loader: todosLoader,
        action: todosAction,
      },
      {
        path: "todos/:todoId",
        element: <TodoView />,
        loader: async ({ params }) => {
          const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.todoId}`);
          return response.json();
        },
      },
      {
        path: "todoer",
        element: <Todoer />,
        loader: todosLoader1,
        children: [
          {
            path: ":todoId",
            element: <TodoDetails />,
            loader: todoDetailsLoader,
          },
        ],
      },
      {
        path: "todoer/:todoId",
        element: <TodoDetails />,
        loader: todoDetailsLoader,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
