import styles from "./Home.module.css";
import {
  ScreenSection,
  ScreenSectionList,
} from "../../components/layout/ScreenSection";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/card/Card";
import { Button, ButtonColor } from "../../components/button/Button";
import { scrollToElement } from "../../utils/scroll";
import { Link } from "../../components/link/Link";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { ExperienceTree, ExperienceTreeContainer } from "../../components/layout/ExperienceTree";
import { EXPERIENCE_TREE, SKILLS_CARDS } from "../../components/global/constants";
import { RouteLink } from "../../components/link/RouteLink";

const Home = () => {
  document.title = "AxmBro | Home"
  const navigate = useNavigate();
  const ScreenSectionListStyle = {
    padding: 0,
    border: 0
  };

  const handleExampleProjectsClick = () => {
    navigate("/projects", { state: { search: "mcbe jsonui" } });
  };


  return (
    <ScreenContainer>

      <ScreenSection
        id="aboutme"
        style={{ padding: "1rem 0 2rem 0" }}
        ignoreChildrenPadding={true}
        title="About Me">
        <h2 style={{ paddingBottom: "1rem" }}>Hey I'm <span className={styles.heroText}>Axmbro</span>! I like creating fancy and cool things on the computer, experiment with code, develop small programs and in the process learn how these amazing machines work!</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <RouterLink
            to="/projects" >
            <Button
              buttonColor={ButtonColor.blue}
              text="Projects" />
          </RouterLink>
          <Button
            buttonColor={ButtonColor.default}
            text="Contact" onClick={() => scrollToElement("contact")} />
        </div>
      </ScreenSection>

      <ScreenSection
        id="skills"
        title="Skills"
        description1="Here is a list of my skills, rated out of 10 based on my own knowledge and experience.">
        <div className={styles.SkillsSection}>
          {SKILLS_CARDS.map((_, index) => {
            return (
              <Card
                key={index}
                title={SKILLS_CARDS[index].title}>
                <ScreenSectionList
                  style={ScreenSectionListStyle}
                  items={SKILLS_CARDS[index].items}
                />
              </Card>
            )
          })}
        </div>
      </ScreenSection>

      <ScreenSection
        id="experience"
        title="Experience"
        description1="I'm currently learning web technologies with plans to become a web developer. I also create custom UIs for Minecraft Bedrock Edition, from sleek HUDs to wild forms that are available in projects page!">
        <ExperienceTreeContainer>
          <ExperienceTree
            role={EXPERIENCE_TREE[0].role}
            date={EXPERIENCE_TREE[0].date}
            company={EXPERIENCE_TREE[0].company}
            items={EXPERIENCE_TREE[0].items}>
            <div style={{ paddingTop: "1rem" }}>
              <Button buttonColor={ButtonColor.blue} text="Example JsonUI Projects" onClick={handleExampleProjectsClick} />
            </div>
          </ExperienceTree>
          <ExperienceTree
            role={EXPERIENCE_TREE[1].role}
            date={EXPERIENCE_TREE[1].date}
            company={EXPERIENCE_TREE[1].company}
            items={EXPERIENCE_TREE[1].items}>
            <h2 style={{ padding: "1rem 0" }}>
              <RouterLink
                className={styles.heroTextBBRouter}
                to="/projects/better_bedrock" ><span className={`${styles.heroText} ${styles.heroTextBB}`}>Better Bedrock - the project I'm most proud of!</span>
              </RouterLink> Started from nothing by just me, that evoled to the most advanced let's say addon in MCBE! - I started to play Minecraft Bedrock Edition when I was young and in this game, I began to create random stuff related to user interface - UI. Later, I moved on to entity models, animations, and general entity logic. By combining all these elements I created this project!</h2>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <RouterLink
                to="/projects/better_bedrock" >
                <Button buttonColor={ButtonColor.blue} text="Better Bedrock Showcase" />
              </RouterLink>
            </div>
          </ExperienceTree>
        </ExperienceTreeContainer>
      </ScreenSection>

      <ScreenSection
        style={{ borderBottom: 0 }}
        id="contact"
        title="Contact"
        description1="Whether you have a project in mind or just want to reach out, I would love to hear from you! Let us make something amazing together!" >
        <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
          <ul>
            <li key={`1`}> Github:{" "} <Link href="https://github.com/AxmBro" text="AxmBro" ></Link> </li>
            <li key={`2`}> Email:{" "}  <Link href="mailto:axmbro@gmail.com?subject=Contact%20Request" text="axmbro@gmail.com" ></Link> </li>
            <li key={`3`}> Discord:{" "} <Link href="https://discord.com/users/679603350236299266" text="AxmBro" ></Link> {" | "} <Link href="https://discord.gg/wJhH86c2wb" text="discord.gg/wJhH86c2wb" ></Link> {" | "} <Link href="https://discord.gg/ZGK5WYXnEY" text="discord.gg/ZGK5WYXnEY" ></Link> </li>
            <li key={`4`}> YouTube Channels:{" "} <Link href="https://www.youtube.com/@axmbro" text="@axmbro" ></Link> {" | "} <Link href="https://www.youtube.com/@axmbro2" text="@axmbro2" ></Link> </li>
            <li key={`5`}>
              All:{" "}<RouteLink
                to="/info"
                text="/info" />
            </li>
          </ul>
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
}

export { Home };
