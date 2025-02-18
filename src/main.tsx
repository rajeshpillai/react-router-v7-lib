import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import './index.css'
import App, { clientLoader as postsLoader } from './routes/App';
import TodoApp, {clientLoader as todosLoader, todosAction} from './routes/TodoApp';
import TodoView from './components/TodoView';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: postsLoader
  },
  {
    path: "/todos",
    element: <TodoApp />,
    loader: todosLoader,
    action: todosAction,
  },
  {
    path: "/todos/:todoId",
    element: <TodoView />,
    loader: async ({ params }) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.todoId}`);
      return response.json();
    },
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
