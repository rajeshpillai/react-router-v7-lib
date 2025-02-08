import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router'
import './index.css'
import App, { clientLoader as postsLoader } from './routes/App';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: postsLoader
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
