"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PROJECTS } from "@/shared/constants/data";
import { ProjectCard } from "@/entities/project";
import { JoinedTabs } from "@/shared/ui/joined-tabs";
import {
  consumeProjectsTagFilter,
  getSavedProjectsTab,
  isProjectsBoardTab,
  saveProjectsTab,
  PROJECTS_BOARD_TABS,
  PROJECTS_BOARD_TAB_LABELS,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";
import styles from "./projects-board.module.scss";

export const ProjectsBoard = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<ProjectsBoardTab>("all");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialized = useRef(false);

  useEffect(() => {
    const animationId = window.requestAnimationFrame(() => {
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
    });

    return () => window.cancelAnimationFrame(animationId);
  }, [searchParams, pathname, router]);

  const handleTabChange = (tab: ProjectsBoardTab) => {
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
          type="search"
          className={styles.searchInput}
          placeholder="Search..."
          aria-label="Search projects"
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
          options={PROJECTS_BOARD_TABS.map((tab) => ({
            id: tab,
            label: PROJECTS_BOARD_TAB_LABELS[tab],
          }))}
          activeId={activeTab}
          aria-label="Filter projects"
          onChange={(id) => {
            if (isProjectsBoardTab(id)) {
              handleTabChange(id);
            }
          }}
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
        <div className={styles.noResults}>
          {search ? (
            <>
              <p className={styles.noResultsMessage}>
                No results for: <strong>{search}</strong>.
              </p>
              <p className={styles.noResultsActions}>
                <button
                  type="button"
                  className={styles.emptyAction}
                  onClick={() => setSearch("")}
                >
                  Clear search
                </button>
                {" or switch to "}
                <button
                  type="button"
                  className={styles.emptyAction}
                  onClick={() => {
                    setSearch("");
                    handleTabChange("commissions");
                  }}
                >
                  {PROJECTS_BOARD_TAB_LABELS.commissions}
                </button>
                .
              </p>
            </>
          ) : (
            <p className={styles.noResultsMessage}>
              No projects in this filter. Switch to{" "}
              <button
                type="button"
                className={styles.emptyAction}
                onClick={() => handleTabChange("all")}
              >
                {PROJECTS_BOARD_TAB_LABELS.all}
              </button>
              {" or "}
              <button
                type="button"
                className={styles.emptyAction}
                onClick={() => handleTabChange("commissions")}
              >
                {PROJECTS_BOARD_TAB_LABELS.commissions}
              </button>
              .
            </p>
          )}
        </div>
      )}
    </>
  );
};
