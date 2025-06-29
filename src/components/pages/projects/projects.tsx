import { useEffect, useState } from "react";
import { ScreenSection } from "../../common/layout/screen-section";
import { useLocation } from "react-router-dom";
import { ScreenContainer } from "../../common/layout/screen-container";
import { PROJECTS } from "../../common/global/constants";
import global_styles from "../../common/global/global-styles.module.css";
import { ProjectGridItem } from "./components/grid-item";
import { ProjectsSearchbar } from "./components/search-bar";

export interface ProjectItem {
  title: string;
  description: string;
  tags?: string[];
  imgSrc?: string;
  logoSrc?: string;
  star?: boolean;
  downloadLink?: string;
  url?: string;
}

const getLocalStorageValue = (key: string) => {
  try {
    const savedLocalValue = localStorage.getItem(key);
    return savedLocalValue ? JSON.parse(savedLocalValue) : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const items: ProjectItem[] = PROJECTS

function Projects() {
  const location = useLocation();
  const [search, setSearch] = useState(location.state?.search || "");
  const [hideTags, setHideTags] = useState(getLocalStorageValue("hideTags"));
  const [showOnlyPinned, setShowOnlyPinned] = useState(getLocalStorageValue("showOnlyPinned"));

  useEffect(() => {
    localStorage.setItem("hideTags", JSON.stringify(hideTags));
  }, [hideTags]);

  useEffect(() => {
    localStorage.setItem("showOnlyPinned", JSON.stringify(showOnlyPinned));
  }, [showOnlyPinned]);

  const filteredItems = items.filter(item => {
    return item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      (item.tags && item.tags.join(" ").toLowerCase().includes(search.toLowerCase()));
  });

  const buttonsActions = [
    {
      ref: hideTags,
      text1: "Show tags",
      text2: "Hide tags",
      action: () => setHideTags(!hideTags)
    },
    {
      ref: showOnlyPinned,
      text1: "Show all",
      text2: "Show only pinned",
      action: () => setShowOnlyPinned(!showOnlyPinned)
    }
  ];

  return (
    <ScreenContainer
      documentTitle="AxmBro | Projects">
      <ScreenSection
        style={{ border: 0 }}
        title="Projects"
        titleClassName={global_styles.h1HeroText}
        noChildrenPadding={true}>
        <>
          <p style={{ marginBottom: "1.5rem" }}>Here is a list of {filteredItems.length} projects in total I've worked on! <b>Most of them include screenshots, videos, and explanations to give you a better look at my work</b>. Each project shows the skills I've learned and improved over time!</p>
          <ProjectsSearchbar search={search} setSearch={setSearch} buttonsActionsArray={buttonsActions} />
        </>
      </ScreenSection>
      {(filteredItems.length > 0) &&
        <ScreenSection
          style={{ borderBottom: 0, padding: "0.75rem 0 2rem 0" }}>
          <ProjectGridItem
            hideTags={!hideTags}
            showOnlyPinned={showOnlyPinned}
            items={filteredItems} />
        </ScreenSection>}
      {(filteredItems.length === 0) && (
        <h2 style={{ marginTop: "0.75rem" }}>{`There are no results for: ${search}`}</h2>
      )}
    </ScreenContainer>
  );
}

export { Projects };
