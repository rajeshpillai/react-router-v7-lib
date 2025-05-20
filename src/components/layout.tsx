// Layout.tsx
import { Outlet, NavLink } from 'react-router';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center">
      <div className="w-full max-w-screen-md">
        <nav className="bg-white shadow p-4 flex justify-center gap-6 rounded mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'
              }`
            }
          >
            Todos 0
          </NavLink>
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'
              }`
            }
          >
            Todos 1
          </NavLink>
          <NavLink
            to="/todoer"
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-500'
              }`
            }
          >
            Todos 2
          </NavLink>
        </nav>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}