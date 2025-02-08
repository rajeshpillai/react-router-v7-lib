import { useLoaderData } from "react-router";
import './App.css'
import { Posts } from "../components/Post";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts"

export async function clientLoader({params}: {params: any}) {
  console.log(params);
  const res = await fetch(`${BASE_URL}`);
  const posts = await res.json();
  return posts;
}


export default function App() {
  const posts = useLoaderData();

  console.log("POSTS: ", posts);
  return <Posts data ={posts} />;
}

