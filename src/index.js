import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Home } from "./pages/home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        <Footer
          openHomeRouteByContactButton={openHomeRouteByContactButton}
          setOpenHomeRouteByContactButton={setOpenHomeRouteByContactButton}
        />
      </div>
    </Router>
  );
}
