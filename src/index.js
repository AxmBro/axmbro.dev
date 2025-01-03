import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Home } from "./pages/home/home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/layout/header";
import { Projects } from "./pages/projects/projects";
import Footer from "./components/layout/footer";
import { ProjectsSubPage } from "./pages/projects/projects_subpage";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

function App() {
  const [openHomeRouteByContactButton, setOpenHomeRouteByContactButton] =
    useState(false);

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Header
          openHomeRouteByContactButton={openHomeRouteByContactButton}
          setOpenHomeRouteByContactButton={setOpenHomeRouteByContactButton}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/projects/:projectId"
            element={
              <ProjectsSubPage
                openHomeRouteByContactButton={openHomeRouteByContactButton}
                setOpenHomeRouteByContactButton={
                  setOpenHomeRouteByContactButton
                }
              />
            }
          />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [location]);

  return null;
}
