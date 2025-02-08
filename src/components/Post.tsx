import { NavLink } from "react-router";

export function Posts({data}: any) {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div>
        <h2>ALL POSTS</h2>
        {
          data.map((p: any) => {
            return (
              <div key={p.id} className="p-6 border-2 rounded m-2">
                <h3>{p.title}</h3>

                <NavLink to={`/posts/${p.id}`}>Show</NavLink>
              </div>
            )
          })
        }
      </div>
    </main>
  );
}

