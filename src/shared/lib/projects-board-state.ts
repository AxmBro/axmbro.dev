export const PROJECTS_ACTIVE_TAB_KEY = "projectsActiveTab";
export const PROJECTS_TAG_FILTER_KEY = "projectsTagFilter";

export type ProjectsBoardTab = "all" | "featured" | "personal" | "commissions";

export const PROJECTS_BOARD_TABS: ProjectsBoardTab[] = [
  "all",
  "featured",
  "personal",
  "commissions",
];

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
    const saved = sessionStorage.getItem(
      PROJECTS_ACTIVE_TAB_KEY,
    ) as ProjectsBoardTab | null;
    if (saved && PROJECTS_BOARD_TABS.includes(saved)) {
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
