import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos").then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
