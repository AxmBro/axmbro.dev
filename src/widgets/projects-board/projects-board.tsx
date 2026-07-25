"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
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

type SortOption = "" | "newest" | "oldest" | "alphabetical";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "alphabetical", label: "Alphabetical (A-Z)" },
];

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const parseProjectDateTimestamp = (dateStr?: string): number => {
  if (!dateStr) return 0;
  if (/present/i.test(dateStr)) return Date.now();

  const match = dateStr.match(
    /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(\d{4})\b/i,
  );
  if (!match) return 0;

  const month = MONTHS.indexOf(match[1].toLowerCase().slice(0, 3));
  if (month < 0) return 0;

  return Date.UTC(Number(match[2]), month, 1);
};

export const ProjectsBoard = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<ProjectsBoardTab>("all");
  const [sortOption, setSortOption] = useState<SortOption>("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialized = useRef(false);
  const sortRef = useRef<HTMLDivElement>(null);

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
                    className={styles.clearSortItem}
                    onClick={() => {
                      setSortOption("");
                      setIsSortOpen(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSortOption("");
                        setIsSortOpen(false);
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
                  onClick={() => {
                    setSortOption(option.value);
                    setIsSortOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSortOption(option.value);
                      setIsSortOpen(false);
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
