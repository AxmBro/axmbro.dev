"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { PROJECTS } from "@/shared/constants/data";
import { ProjectCard, formatProjectDate, parseProjectDateTimestamp } from "@/entities/project";
import { Reveal } from "@/shared/ui/motion";
import { JoinedTabs } from "@/shared/ui/joined-tabs";
import {
  isProjectsBoardTab,
  saveProjectsSearch,
  saveProjectsSort,
  saveProjectsTab,
  PROJECTS_BOARD_TABS,
  PROJECTS_BOARD_TAB_LABELS,
  type ProjectsBoardSort,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";
import { restoreSavedBoardState } from "./lib/restore-saved-board-state";
import styles from "./projects-board.module.scss";

type SortOption = "" | ProjectsBoardSort;

const SORT_OPTIONS: { value: ProjectsBoardSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "alphabetical", label: "Alphabetical (A-Z)" },
];

export const ProjectsBoard = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<ProjectsBoardTab>("all");
  const [sortOption, setSortOption] = useState<SortOption>("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const restoredRef = useRef(false);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;

    const saved = restoreSavedBoardState();
    setSearch(saved.search);
    setActiveTab(saved.activeTab);
    setSortOption(saved.sortOption);
    if (saved.scrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleTabChange = (tab: ProjectsBoardTab) => {
    setActiveTab(tab);
    saveProjectsTab(tab);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    saveProjectsSearch(value);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    saveProjectsSort(option);
    setIsSortOpen(false);
  };

  const filtered = PROJECTS.filter((item) => {
    if (activeTab === "featured" && !item.star) {
      return false;
    }
    if (activeTab !== "all" && activeTab !== "featured" && item.type !== activeTab) {
      return false;
    }
    const q = search.toLowerCase();
    const formattedDate = formatProjectDate(item).toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags?.join(" ").toLowerCase().includes(q) ||
      formattedDate.includes(q)
    );
  });

  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sortOption === "newest") {
      const timeA = parseProjectDateTimestamp(a.date);
      const timeB = parseProjectDateTimestamp(b.date);
      return timeB - timeA;
    }
    if (sortOption === "oldest") {
      const timeA = parseProjectDateTimestamp(a.date);
      const timeB = parseProjectDateTimestamp(b.date);
      return timeA - timeB;
    }
    if (sortOption === "alphabetical") {
      return a.title.localeCompare(b.title);
    }

    if (a.star && !b.star) return -1;
    if (!a.star && b.star) return 1;
    return 0;
  });

  return (
    <>
      <div className={styles.controlsRow}>
        <div className={styles.searchBar}>
          <input
            type="search"
            className={`${styles.searchInput} ${search ? styles.hasValue : ""}`}
            placeholder="Search..."
            aria-label="Search projects"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => handleSearchChange("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.sortWrapper} ref={sortRef}>
          <button
            type="button"
            className={`${styles.sortButton} ${isSortOpen ? styles.isOpen : ""}`}
            onClick={() => setIsSortOpen((prev) => !prev)}
            aria-label="Sort projects"
            aria-expanded={isSortOpen}
            aria-haspopup="listbox"
          >
            <span className={styles.sortButtonText}>
              {sortOption
                ? SORT_OPTIONS.find((o) => o.value === sortOption)?.label
                : "Sort by..."}
            </span>
            <FaChevronDown
              className={`${styles.chevronIcon} ${isSortOpen ? styles.chevronOpen : ""}`}
              size={12}
            />
          </button>

          {isSortOpen && (
            <ul className={styles.sortDropdownMenu} role="listbox">
              {sortOption && (
                <>
                  <li
                    role="option"
                    tabIndex={0}
                    aria-selected={false}
                    className={styles.clearSortItem}
                    onClick={() => handleSortChange("")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSortChange("");
                      }
                    }}
                  >
                    ✕ Clear sort
                  </li>
                  <li className={styles.dropdownDivider} role="separator" />
                </>
              )}
              {SORT_OPTIONS.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  tabIndex={0}
                  aria-selected={sortOption === option.value}
                  className={`${styles.sortDropdownItem} ${
                    sortOption === option.value ? styles.selectedItem : ""
                  }`}
                  onClick={() => handleSortChange(option.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSortChange(option.value);
                    }
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
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
          {sortedAndFiltered.map((project, index) => (
            <Reveal
              key={project.title}
              className={styles.gridItem}
              delay={Math.min(index * 0.04, 0.36)}
            >
              <ProjectCard project={project} />
            </Reveal>
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
                  onClick={() => handleSearchChange("")}
                >
                  Clear search
                </button>
                {" or switch to "}
                <button
                  type="button"
                  className={styles.emptyAction}
                  onClick={() => {
                    handleSearchChange("");
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
