import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Header } from "./components/layout/header";
import { Projects } from "./pages/projects/projects";
import { Footer } from "./components/layout/footer";
import { ProjectsSubPage } from "./pages/projects/projects-subpage";
import { TermsOfUse } from "./pages/terms-of-use/terms-of-use";
import { Home } from "./pages/home/home";
import { Contact } from "./pages/contact/contact";
import { NotFound } from "./pages/not-found/not-found";
import { ScrollToTop } from "./components/scroll-to-top/scroll-to-top";
import { AsciiOverlay } from "./components/ascii-overlay/ascii-overlay";
import "./app.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ScrollToTop>
        <div className="App">
          <AsciiOverlay />
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
        </div>
      </ScrollToTop>
    </Router>
  </StrictMode>,
)