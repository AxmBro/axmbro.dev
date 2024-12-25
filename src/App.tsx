import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Projects } from "./pages/Projects";
import Footer from "./components/Footer";
import ProjectsItems from "./pages/ProjectsSubpage";


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
