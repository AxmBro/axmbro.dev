export const PROJECTS_ACTIVE_TAB_KEY = "projectsActiveTab";
export const PROJECTS_TAG_FILTER_KEY = "projectsTagFilter";

export type ProjectsBoardTab = "all" | "featured" | "personal" | "commissions";

export const PROJECTS_BOARD_TABS: ProjectsBoardTab[] = [
  "all",
  "featured",
  "personal",
  "commissions",
];

export const PROJECTS_BOARD_TAB_LABELS: Record<ProjectsBoardTab, string> = {
  all: "All",
  featured: "Featured",
  personal: "Personal",
  commissions: "Client Work",
};

export const isProjectsBoardTab = (value: string): value is ProjectsBoardTab =>
  (PROJECTS_BOARD_TABS as readonly string[]).includes(value);

export const primeProjectsBoard = (options: {
  tab?: ProjectsBoardTab;
  tag?: string;
}) => {
  try {
    if (options.tag !== undefined) {
      sessionStorage.setItem(PROJECTS_TAG_FILTER_KEY, options.tag);
    }
    if (options.tab !== undefined) {
      sessionStorage.setItem(PROJECTS_ACTIVE_TAB_KEY, options.tab);
    }
  } catch {}
};

export const consumeProjectsTagFilter = (): string | null => {
  try {
    const tag = sessionStorage.getItem(PROJECTS_TAG_FILTER_KEY);
    if (tag) {
      sessionStorage.removeItem(PROJECTS_TAG_FILTER_KEY);
    }
    return tag;
  } catch {
    return null;
  }
};

export const getSavedProjectsTab = (): ProjectsBoardTab | null => {
  try {
    const saved = sessionStorage.getItem(PROJECTS_ACTIVE_TAB_KEY);
    if (saved && isProjectsBoardTab(saved)) {
      return saved;
    }
  } catch {}
  return null;
};

export const saveProjectsTab = (tab: ProjectsBoardTab) => {
  try {
    sessionStorage.setItem(PROJECTS_ACTIVE_TAB_KEY, tab);
  } catch {}
};
