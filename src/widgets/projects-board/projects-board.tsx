"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { PROJECTS, PROJECTS_BOARD_TEXTS } from "@/shared/constants/data";
import {
  ProjectCard,
  compareFeaturedFirst,
  formatProjectDate,
  parseProjectDateTimestamp,
} from "@/entities/project";
import {
  PROJECT_CONTENT_DELAY,
  PROJECT_FEATURED_CARD_STEP,
} from "@/shared/ui/motion";
import { JoinedTabs } from "@/shared/ui/joined-tabs";
import { getScrollBehavior } from "@/shared/lib/motion";
import {
  isProjectsBoardTab,
  saveProjectsSearch,
  saveProjectsSort,
  saveProjectsTab,
  PROJECTS_BOARD_SORTS,
  PROJECTS_BOARD_TABS,
  type ProjectsBoardSort,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";
import { restoreSavedBoardState } from "./lib/restore-saved-board-state";
import styles from "./projects-board.module.scss";

type SortOption = "" | ProjectsBoardSort;

// A query equal to a tag name (footer tag presets, or typed) filters by tag, not by description text.
const ALL_TAGS = new Set(
  PROJECTS.flatMap((item) => item.tags ?? []).map((tag) => tag.toLowerCase()),
);

const TAB_OPTIONS = PROJECTS_BOARD_TABS.map((tab) => ({
  id: tab,
  label: PROJECTS_BOARD_TEXTS.tabs[tab],
}));

export const ProjectsBoard = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<ProjectsBoardTab>("all");
  const [sortOption, setSortOption] = useState<SortOption>("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  const restoredRef = useRef(false);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;

    const saved = restoreSavedBoardState();
    setSearch(saved.search);
    setActiveTab(saved.activeTab);
    setSortOption(saved.sortOption);
    if (saved.scrollTop) {
      window.scrollTo({ top: 0, behavior: getScrollBehavior() });
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
    // The focused option unmounts with the list - keep keyboard focus on the trigger.
    sortButtonRef.current?.focus();
  };

  const query = search.trim().toLowerCase();
  const isTagQuery = ALL_TAGS.has(query);
  const sortedAndFiltered = PROJECTS.filter((item) => {
    if (activeTab === "featured" && !item.star) {
      return false;
    }
    if (activeTab !== "all" && activeTab !== "featured" && item.type !== activeTab) {
      return false;
    }
    if (isTagQuery) {
      return item.tags?.some((tag) => tag.toLowerCase() === query) ?? false;
    }
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags?.join(" ").toLowerCase().includes(query) ||
      formatProjectDate(item).toLowerCase().includes(query)
    );
  }).sort((a, b) => {
    if (sortOption === "newest") {
      return parseProjectDateTimestamp(b.date) - parseProjectDateTimestamp(a.date);
    }
    if (sortOption === "oldest") {
      return parseProjectDateTimestamp(a.date) - parseProjectDateTimestamp(b.date);
    }
    if (sortOption === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return compareFeaturedFirst(a, b);
  });

  return (
    <>
      <div className={styles.controlsRow}>
        <div className={styles.searchBar}>
          <input
            type="search"
            className={`${styles.searchInput} ${search ? styles.hasValue : ""}`}
            placeholder={PROJECTS_BOARD_TEXTS.searchPlaceholder}
            aria-label={PROJECTS_BOARD_TEXTS.searchAria}
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => handleSearchChange("")}
              aria-label={PROJECTS_BOARD_TEXTS.clearSearch}
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.sortWrapper} ref={sortRef}>
          <button
            ref={sortButtonRef}
            type="button"
            className={`${styles.sortButton} ${isSortOpen ? styles.isOpen : ""}`}
            onClick={() => setIsSortOpen((prev) => !prev)}
            aria-label={PROJECTS_BOARD_TEXTS.sortAria}
            aria-expanded={isSortOpen}
            aria-haspopup="listbox"
          >
            <span className={styles.sortButtonText}>
              {sortOption
                ? PROJECTS_BOARD_TEXTS.sortOptions[sortOption]
                : PROJECTS_BOARD_TEXTS.sortPlaceholder}
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
                    {PROJECTS_BOARD_TEXTS.clearSort}
                  </li>
                  <li className={styles.dropdownDivider} role="separator" />
                </>
              )}
              {PROJECTS_BOARD_SORTS.map((option) => (
                <li
                  key={option}
                  role="option"
                  tabIndex={0}
                  aria-selected={sortOption === option}
                  className={`${styles.sortDropdownItem} ${
                    sortOption === option ? styles.selectedItem : ""
                  }`}
                  onClick={() => handleSortChange(option)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSortChange(option);
                    }
                  }}
                >
                  {PROJECTS_BOARD_TEXTS.sortOptions[option]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.tabsWrapper}>
        <JoinedTabs
          options={TAB_OPTIONS}
          activeId={activeTab}
          aria-label={PROJECTS_BOARD_TEXTS.tabsAria}
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
            <div key={project.title} className={styles.gridItem}>
              <ProjectCard
                project={project}
                featuredReveal
                staggerDelay={PROJECT_CONTENT_DELAY + index * PROJECT_FEATURED_CARD_STEP}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          {search ? (
            <>
              <p className={styles.noResultsMessage}>
                {PROJECTS_BOARD_TEXTS.noResultsFor} <strong>{search}</strong>.
              </p>
              <p className={styles.noResultsActions}>
                <button
                  type="button"
                  className={styles.emptyAction}
                  onClick={() => handleSearchChange("")}
                >
                  {PROJECTS_BOARD_TEXTS.clearSearch}
                </button>
                {PROJECTS_BOARD_TEXTS.orSwitchTo}
                <button
                  type="button"
                  className={styles.emptyAction}
                  onClick={() => {
                    handleSearchChange("");
                    handleTabChange("commissions");
                  }}
                >
                  {PROJECTS_BOARD_TEXTS.tabs.commissions}
                </button>
                .
              </p>
            </>
          ) : (
            <p className={styles.noResultsMessage}>
              {PROJECTS_BOARD_TEXTS.emptyFilter}{" "}
              <button
                type="button"
                className={styles.emptyAction}
                onClick={() => handleTabChange("all")}
              >
                {PROJECTS_BOARD_TEXTS.tabs.all}
              </button>
              {PROJECTS_BOARD_TEXTS.or}
              <button
                type="button"
                className={styles.emptyAction}
                onClick={() => handleTabChange("commissions")}
              >
                {PROJECTS_BOARD_TEXTS.tabs.commissions}
              </button>
              .
            </p>
          )}
        </div>
      )}
    </>
  );
};
