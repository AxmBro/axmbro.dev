import React, { FC } from "react";
import { Home } from "./pages/home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/header";
import { Projects } from "./pages/projects/projects";
import { Footer } from "./components/layout/footer";
import { ProjectsSubPage } from "./pages/projects/projects_subpage";
import { Info } from "./pages/info/info";
import { NavigateToContactProvider } from "./components/contexts/NavigateToContactContext";

import "./index.css";

const App: FC = () => {
  return (
    <NavigateToContactProvider>
      <Router>
        <main className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectsSubPage />} />
            <Route path="/info" element={<Info />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </NavigateToContactProvider>
  );
}

export { App }