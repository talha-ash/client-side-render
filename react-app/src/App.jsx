import { lazy } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import pages from "./pages.js";

const Home = lazy(() =>
  import(/* webpackChunkName: 'home' */ "./screens/Home.jsx")
);
const About = lazy(() =>
  import(/* webpackChunkName: 'about' */ "./screens/About.jsx")
);
const Contact = lazy(() =>
  import(/* webpackChunkName: 'contact' */ "./screens/Contact.jsx")
);

const pageComponents = [Home, About, Contact];
const routes = Object.values(pages).map(({ path }, ind) => {
  const Element = pageComponents[ind];

  return <Route key={path} path={path} element={<Element />} />;
});

function App() {
  return (
    <div className="App">
      <ul>
        Links
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </ul>
      <h1>Rspack + React</h1>

      <Routes>
        {routes}

        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
