import React, { useEffect, useState } from "react";
import { ScreenSection } from "../../components/layout/screen_section";
import { Button, ButtonColor } from "../../components/buttons/button";
import { useNavigate } from "react-router-dom";
import styles from "./projects.module.css"
import { ScreenContainer } from "../../components/layout/screen_container";

interface ProjectItem {
  title: string;
  description: string;
  tags?: string[];
  imgSrc?: string;
  logoSrc?: string;
  star?: boolean;
  downloadLink?: string;
  url?: string;
}

function Projects() {
  const [search, setSearch] = useState("");
  const [hideTags, setHideTags] = useState(() => {
    try {
      const savedLocalValue = localStorage.getItem("hideTags");
      return savedLocalValue ? JSON.parse(savedLocalValue) : false;
    } catch (error) {
      console.log(error)
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("hideTags", JSON.stringify(hideTags));
  }, [hideTags]);

  let items: ProjectItem[] = [
    {
      title: "Better Bedrock",
      description: "The Better Bedrock is project of Texture Pack for MCBE Edition, Website and Mobile App available only for Android. The Main goal is to improve the default Minecraft gameplay to a whole new level with many new features!",
      tags: ["MCBE JsonUI", "React", "Flutter", "Supabase", "Windows API", "Android API"],
      imgSrc: "bbReleaseThumbnail",
      logoSrc: "bbLogo",
      star: true,
      downloadLink: "https://betterbedrock.com/#/downloads",
      url: "better_bedrock"
    },
    {
      title: "Murder Detector",
      description: "Simple let us say... shhhh... CHEAT by just TEXTURE PACK. Models system provided by MCBE allows to check what item player is holding, or with additional info, held. Using this user is able to see which person is murderer or sheriff by icon above head or optionally by extra xray!",
      tags: ["MCBE JsonUI", "MCBE Models"],
      imgSrc: "murderDetector1",
      logoSrc: "mdLogo",
      star: true,
      downloadLink: "https://betterbedrock.com/#/downloads",
      url: "murder_detector"
    },
    {
      title: "One Block Slime Block Adventure",
      description: "I was part of creating custom HUD elements with custom server from! This was the most advanced project I've worked on, it was a great experience to work with other developers and create something that big and complex!",
      tags: ["MCBE JsonUI", "MCBE Server Form"],
      imgSrc: "obsba",
      star: true,
      downloadLink: "https://www.mushco.games/games",
      url: "one_block_slime_block_adventure_page"
    },
    {
      title: "Shop UI",
      description: "CUSTOM SERVER FORM UI created for personal use, but also to test custom tabs in vanilla style, many texts in each button and search feature! General appearance and in-game UI was fully created by me.",
      tags: ["MCBE JsonUI", "MCBE Server Form"],
      imgSrc: "shop_form1",
      url: "shop_ui"
    },
    {
      title: "Hometree UI",
      description: "CUSTOM SERVER FORM UI created for customer. It's pretty colorful and simple grid UI used in gamemodes selector and extra information form! General appearance was designed by customer and slightly by me. In-game UI is fully created by me.",
      tags: ["MCBE JsonUI", "MCBE Server Form"],
      imgSrc: "hometree1",
      url: "hometree_ui"
    },
    {
      title: "Simple UI",
      description: "CUSTOM SERVER FORM UI created for personal use, but also to test custom buttons layout! General appearance and in-game UI was fully created by me.",
      tags: ["MCBE JsonUI", "MCBE Server Form"],
      imgSrc: "simple_server_form1",
      url: "simple_ui"
    },
    {
      title: "This Website",
      description: "Currently created by mainly using JS, TS and React. Simple website with needed info separated by routes. General style is minimalistic and it's in portfolio theme. Previously this website was created using only HTML, JS, CSS - it was pain when implementing routes manually...",
      tags: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
      imgSrc: "thisweb"
    },
  ]

  const projectsLength = items.length;

  items = items.filter(item => {
    return item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      (item.tags && item.tags.join(" ").toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <ScreenContainer>
      <ScreenSection
        style={{ padding: "1rem 0 2rem 0", borderBottom: items.length > 0 ? "1px solid var(--line-break-color)" : 0 }}
        title={`Projects: ${projectsLength}`}
        description1="Here is a list of all the projects I've been involved in! Most of them include videos and screenshots for a closer look at my work. Each project shows the skills and techniques I've learned over time.">
        <>
          <SearchbarGrid search={search} setSearch={setSearch} />
          <div className={styles.searchbarButtonsContainer}>
            <Button
              onClick={() => setHideTags(!hideTags)}
              text={hideTags ? "Show Tags" : "Hide Tags"}
              buttonColor={ButtonColor.blue} />
          </div>
        </>
      </ScreenSection>
      {(items.length > 0) &&
        <ScreenSection
          style={{ borderBottom: 0 }}>
          <ProjectsGrid
            hideTags={!hideTags}
            items={items} />
        </ScreenSection>}
    </ScreenContainer>
  );
}

interface ProjectsGridProps {
  items: ProjectItem[];
  hideTags?: boolean;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ items, hideTags }) => {
  const navigate = useNavigate();

  const handleProjectClick = (project: ProjectItem) => {
    if (!project.url) {
      return;
    }
    navigate(`/projects/${project.url}`);
  };

  return (
    <div className={styles.ProjectsGrid}>
      {items.map((item) => {
        const imageSrc = item.imgSrc ? require(`../../assets/${item.imgSrc}.png`) : null;
        const logoImageSrc = item.logoSrc ? require(`../../assets/${item.logoSrc}.png`) : null;
        const imageAlt = item.imgSrc || "";

        return (
          <div
            key={`item${item.title}`}
            className={styles.ProjectsGridItem}
          >
            {item.star && (
              <div className={styles.StarContainer}>
                <img className={styles.Star} src={require("../../assets/star.png")} alt="starImg" />
              </div>
            )}
            {item.imgSrc && (
              <div className={styles.ImageWrapper}>
                <img src={imageSrc} alt={imageAlt} className={styles.Image} />
              </div>
            )}
            <div className={styles.Container}>
              <div className={styles.Texts}>
                <div className={styles.TitleContainer}>
                  <div className={styles.TitleAndLogoContainer}>
                    {item.logoSrc && (
                      <img
                        src={logoImageSrc}
                        alt={item.logoSrc}
                      />
                    )}
                    <h1
                      onClick={() => handleProjectClick(item)}
                      className={item.url ? `${styles.TitleUrl}` : `${styles.Title}`}
                      style={{ cursor: item.url ? "pointer" : undefined }}
                    >
                      {item.title}
                    </h1>
                  </div>
                  {item.downloadLink && (
                    <div className={styles.DownloadContainer}>
                      <a
                        href={item.downloadLink}
                        className={`${styles.Button} ${styles.DownloadButton}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Button buttonColor={ButtonColor.default} text="Download" />
                      </a>
                    </div>
                  )}
                </div>
                <h2 className={styles.Description}>{item.description}</h2>
              </div>
              {(item.tags && hideTags) && (
                <div className={styles.TagsContainer}>
                  {item.tags.map((tag) => (
                    <h2 key={`TagKey${tag}`} className={styles.Tag}>
                      {tag}
                    </h2>
                  ))}
                </div>
              )}
            </div>
            {item.downloadLink && (
              <div className={styles.DownloadButtonMobile} style={{ marginTop: "1rem" }}>
                <a
                  href={item.downloadLink}
                  className={`${styles.Button} ${styles.DownloadButton}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button buttonColor={ButtonColor.default} text="Download" />
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface SearchbarGridProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchbarGrid: React.FC<SearchbarGridProps> = ({ search, setSearch }) => {
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("title");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setSearch(target.value);
  }

  const texts = ["Title", "Description", "Tags"];

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setAnimatedPlaceholder(texts[currentIndex]);
      currentIndex = (currentIndex + 1) % texts.length;
    }, 5000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.searchBarWrapper}>
      <input type="text" className={styles.searchBar} placeholder={`Search by: ${animatedPlaceholder}`} value={search} onChange={handleChangeInput} />
      {search && (<div onClick={() => setSearch("")}>
        <Button style={{ width: "3rem", minWidth: "0" }} text="X" buttonColor={ButtonColor.defaultEmpty2}></Button>
      </div>)}
    </div>
  )
}

export { Projects };
