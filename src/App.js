import React from "react";
import "./App.css";
import Home from "./pages/Home.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header.tsx";
import { Projects } from "./pages/Projects.tsx";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import ProjectsItems from "./components/ProjectsItems.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectsItems />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
