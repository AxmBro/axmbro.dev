import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/common/layout/header";
import { Projects } from "./components/pages/projects/projects";
import { Footer } from "./components/common/layout/footer";
import { ProjectsSubPage } from "./components/pages/projects/projects-subpage";
import { TermsOfUse } from "./components/pages/terms-of-use/terms-of-use";
import { Home } from "./components/pages/home/home";
import { Contact } from "./components/pages/contact/contact";

import "./app.css";
import { NotFound } from "./components/pages/not-found/not-found";

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