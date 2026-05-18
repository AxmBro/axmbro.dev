"use client";

import { useState } from "react";
import { PROJECTS, type ProjectType } from "@/shared/constants/data";
import { ProjectCard } from "@/widgets/projects/project-card";
import { JoinedTabs } from "@/shared/ui/joined-tabs";
import styles from "./page.module.scss";

type TabType = "all" | "featured" | ProjectType;
const TABS: TabType[] = ["all", "featured", "personal", "commissions"];

export const ProjectsPageClient = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (typeof window !== "undefined") {
      const savedTab = sessionStorage.getItem("projectsActiveTab") as TabType | null;
      if (savedTab && TABS.includes(savedTab)) {
        return savedTab;
      }
    }
    return "all";
  });

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    sessionStorage.setItem("projectsActiveTab", tab);
  };

  const filtered = PROJECTS.filter((item) => {
    if (activeTab === "featured" && !item.featured) {
      return false;
    }
    if (activeTab !== "all" && activeTab !== "featured" && item.type !== activeTab) {
      return false;
    }
    const q = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags?.join(" ").toLowerCase().includes(q)
    );
  });


  return (
    <>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className={styles.clearButton}
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className={styles.tabsWrapper}>
        <JoinedTabs
          options={TABS.map((tab) => ({
            id: tab,
            label: tab.charAt(0).toUpperCase() + tab.slice(1),
          }))}
          activeId={activeTab}
          onChange={(id) => handleTabChange(id as TabType)}
          size="medium"
        />
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((project) => (
            <div key={project.title} className={styles.gridItem}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No results for: <strong>{search}</strong></p>
      )}
    </>
  );
};
