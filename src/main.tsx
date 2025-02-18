import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import './index.css'
import App, { clientLoader as postsLoader } from './routes/App';
import TodoApp, {clientLoader as todosLoader, todosAction} from './routes/TodoApp';


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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
