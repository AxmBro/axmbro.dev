import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/header";
import { Projects } from "./pages/projects/projects";
import { Footer } from "./components/layout/footer";
import { ProjectsSubPage } from "./pages/projects/projects-subpage";
import { TermsOfUse } from "./pages/terms-of-use/terms-of-use";
import { Home } from "./pages/home/home";
import { Contact } from "./pages/contact/contact";

import "./app.css";
import { NotFound } from "./pages/not-found/not-found";

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