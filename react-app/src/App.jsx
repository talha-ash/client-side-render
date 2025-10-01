import { useState, lazy, Suspense } from "react";
import "./App.css";
import { Loading } from "./components/Loading";
const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/Home.jsx"));
const About = lazy(() =>
  import(/* webpackChunkName: 'about' */ "./pages/About")
);
const Contact = lazy(() =>
  import(/* webpackChunkName: 'contact' */ "./pages/Contact")
);

function App() {
  const [page, setPage] = useState("Home");

  return (
    <div className="App">
      <ul>
        Links
        <li onClick={() => setPage("Home")}>
          Home {page == "Home" ? "!!" : ""}
        </li>
        <li onClick={() => setPage("About")}>
          About {page == "About" ? "!!" : ""}
        </li>
        <li onClick={() => setPage("Contact")}>
          Contact {page == "Contact" ? "!!" : ""}
        </li>
      </ul>
      <h1>Rspack + React</h1>
      <div className="card">
        <Suspense fallback={<Loading />}>
          {page == "Home" ? <Home /> : null}
          {page == "About" ? <About /> : null}
          {page == "Contact" ? <Contact /> : null}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
