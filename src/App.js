import React from "react";
import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import { Projects } from "./screens/Projects.tsx";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
