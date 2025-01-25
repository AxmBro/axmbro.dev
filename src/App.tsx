import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/Header.tsx";
import { Projects } from "./pages/projects/Projects.tsx";
import { Footer } from "./components/layout/Footer.tsx";
import { ProjectsSubPage } from "./pages/projects/ProjectsSubpage";
import { Info } from "./pages/info/Info";
import { TermsOfUse } from "./pages/terms-of-use/TermsOfUse";
import { NavigateToContactProvider } from "./components/contexts/NavigateToContactContext";
import { Home } from "./pages/home/Home";

import "./App.css";
import { NotFound } from "./pages/not-found/NotFound";

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
            <Route path="/terms_of_use" element={<TermsOfUse />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </NavigateToContactProvider>
  );
}

export { App }