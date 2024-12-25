import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home.tsx";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header.tsx";
import { Projects } from "./pages/Projects.tsx";
import Footer from "./components/Footer.tsx";
import ProjectsItems from "./pages/ProjectsSubpage.tsx";


function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectsItems />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
