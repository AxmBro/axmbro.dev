import { FC } from "react";
import { Home } from "./pages/home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/layout/header";
import { Projects } from "./pages/projects/projects";
import { Footer } from "./components/layout/footer";
import { ProjectsSubPage } from "./pages/projects/projects_subpage";
import { Info } from "./pages/info/info";
import { TermsOfUse } from "./pages/termsOfUse/termsOfUse";
import { NavigateToContactProvider } from "./components/contexts/NavigateToContactContext";

import "./App.css";
import { NotFound } from "./pages/notFound/notFound";

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