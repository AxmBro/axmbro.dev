import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Projects } from "./pages/projects/Projects";
import { Footer } from "./components/layout/Footer";
import { ProjectsSubPage } from "./pages/projects/ProjectsSubpage";
import { TermsOfUse } from "./pages/terms-of-use/TermsOfUse";
import { Home } from "./pages/home/Home";
import { Contact } from "./pages/contact/Contact";

import "./App.css";
import { NotFound } from "./pages/not-found/NotFound";

const App: FC = () => {
  return (
    <Router>
      <main className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectsSubPage />} />
          <Route path="/terms_of_use" element={<TermsOfUse />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export { App }