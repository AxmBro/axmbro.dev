import {
  consumeProjectsTagFilter,
  getSavedProjectsSearch,
  getSavedProjectsSort,
  getSavedProjectsTab,
  saveProjectsSearch,
  saveProjectsTab,
  type ProjectsBoardSort,
  type ProjectsBoardTab,
} from "@/shared/lib/projects-board-state";

type RestoredBoardState = {
  search: string;
  activeTab: ProjectsBoardTab;
  sortOption: ProjectsBoardSort | "";
  scrollTop: boolean;
};

export const restoreSavedBoardState = (): RestoredBoardState => {
  const tag = consumeProjectsTagFilter();
  if (tag) {
    saveProjectsSearch(tag);
    saveProjectsTab("all");
    return {
      search: tag,
      activeTab: "all",
      sortOption: getSavedProjectsSort() ?? "",
      scrollTop: true,
    };
  }

  return {
    search: getSavedProjectsSearch() ?? "",
    activeTab: getSavedProjectsTab() ?? "all",
    sortOption: getSavedProjectsSort() ?? "",
    scrollTop: false,
  };
};
