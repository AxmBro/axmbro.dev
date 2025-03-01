import styles from "./home.module.css";
import {
  ScreenSection,
  ScreenSectionList,
} from "../../common/layout/screen-section";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from "../../common/card/card";
import { Button, ButtonColor } from "../../common/button/button";
import { ScreenContainer } from "../../common/layout/screen-container";
import { ExperienceTree, ExperienceTreeContainer } from "../../common/layout/experience-tree";
import { EXPERIENCE_TREE, SKILLS_CARDS } from "../../common/global/constants";
import { RouteLink } from "../../common/link/route-link";

import global_styles from "../../../components/common/global/global-styles.module.css";

const Home = () => {
  const navigate = useNavigate();
  const ScreenSectionListStyle = {
    padding: 0,
    border: 0
  };

  const handleExampleProjectsClick = () => {
    navigate("/projects", { state: { search: "mcbe jsonui" } });
  };


  return (
    <ScreenContainer
      documentTitle="AxmBro | Home">

      <ScreenSection
        id="aboutme"
        noChildrenPadding={true}
        title="AxmBro"
        titleClassName={global_styles.h1HeroText}>
        <p>I'm 19 year old <b>Junior Developer</b> from <b>Poland</b>. I have been learning programming for more than 2 years. I'm still learning, experimenting with code and building simple projects!</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
          <RouteLink
            to="/contact">
            <Button text="Contact" buttonColor={ButtonColor.blue}></Button>
          </RouteLink>
          <RouteLink
            to="/projects">
            <Button text="Projects" buttonColor={ButtonColor.default}></Button>
          </RouteLink>
        </div>
      </ScreenSection>

      <ScreenSection
        id="skills"
        title="Skills"
        noChildrenPadding={true}>
        <>
          <p>Here is a list of my skills, rated out of 10 <b>based on</b> my own knowledge and experience.</p>
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
        </>
      </ScreenSection>

      <ScreenSection
        id="experience"
        title="Experience"
        noChildrenPadding={true}>
        <>
          <p style={{ marginBottom: "2rem" }}>I'm currently learning websites with plans to become a <b>Web Developer</b>. In the past I built custom UIs for Minecraft Bedrock Edition, in which I feel like almost a <b>Senior Developer</b>. If you have any plans to create custom UIs in this game, <b>feel free to contact me and check my work in projects page!</b></p>
          <ExperienceTreeContainer>
            <ExperienceTree
            index={2}
              role={EXPERIENCE_TREE[0].role}
              date={EXPERIENCE_TREE[0].date}
              company={EXPERIENCE_TREE[0].company}
              items={EXPERIENCE_TREE[0].items}>
              <div style={{ paddingTop: "1rem", width: "fit-content" }}>
                <Button buttonColor={ButtonColor.blue} text="Example JsonUI Projects" onClick={handleExampleProjectsClick} />
              </div>
            </ExperienceTree>
            <ExperienceTree
            index={1}
              role={EXPERIENCE_TREE[1].role}
              date={EXPERIENCE_TREE[1].date}
              company={EXPERIENCE_TREE[1].company}
              items={EXPERIENCE_TREE[1].items}>
              <p style={{ padding: "1rem 0" }}>
                <RouterLink
                  className={styles.heroTextBBRouter}
                  to="/projects/better_bedrock" ><span className={`${styles.heroText} ${global_styles.h1HeroText}`}>Better Bedrock - the project I'm most proud of!</span>
                </RouterLink> Started from nothing by just me, that evoled to the most advanced let's say addon in MCBE! - I started to play Minecraft Bedrock Edition when I was young and in this game, I began to create random stuff related to user interface - UI. Later, I moved on to entity models, animations, and general entity logic. By combining all these elements I created this project!</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <RouterLink
                  to="/projects/better_bedrock" >
                  <Button buttonColor={ButtonColor.blue} text="Better Bedrock Showcase" />
                </RouterLink>
              </div>
            </ExperienceTree>
          </ExperienceTreeContainer>
        </>
      </ScreenSection>

      <ScreenSection
        style={{ borderBottom: 0 }}
        id="contact"
        title="Contact"
        noChildrenPadding={true}>
        <>
          <p style={{ marginBottom: "2rem" }}>Whether you have a project in mind or just want to reach out, <b>I would love to hear from you!</b> Let us combine our ideas and <b>make something absolutely amazing together!</b></p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <RouteLink
              to="/contact">
              <Button text="Contact" buttonColor={ButtonColor.blue}></Button>
            </RouteLink>
            <RouteLink
              to="/projects">
              <Button text="Projects" buttonColor={ButtonColor.default}></Button>
            </RouteLink>
          </div>
        </>
      </ScreenSection>

    </ScreenContainer>
  );
}

export { Home };
