import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import './index.css'
import App, { clientLoader as postsLoader } from './routes/App';
import TodoView from './components/TodoView';
import TodoApp, {clientLoader as todosLoader, todosAction} from './routes/TodoApp';
import Todoer, {todosLoader as todosLoader1} from './routes/Todoer';
import TodoDetails, {clientLoader as todoDetailsLoader} from "./routes/TodoDetails";

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
  },
  {
    path: "/todoer",
    element: <Todoer />,
    loader: todosLoader1,
    children: [{
      path: ":todoId",  
      element: <TodoDetails />,
      loader: todoDetailsLoader,
    }],
  },
  {
    path: "/todoer/:todoId",  // Dynamic route for Todo details
    element: (
        <TodoDetails />
    ),
    loader: todoDetailsLoader,  // The loader to fetch Todo details based on ID
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
