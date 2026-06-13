"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PROJECTS, type ProjectType } from "@/shared/constants/data";
import { ProjectCard } from "@/entities/project";
import { JoinedTabs } from "@/shared/ui/joined-tabs";
import {
  consumeProjectsTagFilter,
  getSavedProjectsTab,
  saveProjectsTab,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";
import styles from "./projects-board.module.scss";

type TabType = ProjectsBoardTab | ProjectType;
const TABS: TabType[] = ["all", "featured", "personal", "commissions"];

export const ProjectsBoard = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    const tagFromStorage = consumeProjectsTagFilter();

    if (tagFromStorage) {
      setSearch(tagFromStorage);
      setActiveTab("all");
      saveProjectsTab("all");
      window.scrollTo({ top: 0, behavior: "smooth" });
      initialized.current = true;
      return;
    }

    if (tagParam) {
      setSearch(tagParam);
      setActiveTab("all");
      saveProjectsTab("all");
      window.scrollTo({ top: 0, behavior: "smooth" });
      router.replace(pathname, { scroll: false });
    } else if (!initialized.current) {
      const savedTab = getSavedProjectsTab();
      if (savedTab) {
        setActiveTab(savedTab);
      }
    }

    initialized.current = true;
  }, [searchParams, pathname, router]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    saveProjectsTab(tab);
  };

  const filtered = PROJECTS.filter((item) => {
    if (activeTab === "featured" && !item.star) {
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

  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (a.star && !b.star) return -1;
    if (!a.star && b.star) return 1;
    return 0;
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

      {sortedAndFiltered.length > 0 ? (
        <div className={styles.grid}>
          {sortedAndFiltered.map((project) => (
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
