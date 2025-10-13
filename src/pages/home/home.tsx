import styles from "./home.module.css";
import { ScreenSection, ScreenSectionList } from "../../components/layout/screen-section";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/card/card";
import { Button } from "../../components/button/button";
import { ScreenContainer } from "../../components/layout/screen-container";
import { ExperienceTree, ExperienceTreeContainer } from "../../components/layout/experience-tree";
import { EXPERIENCE_TREE, SKILLS_CARDS } from "../../constants";

import global_styles from "../../components/global/global-styles.module.css";
import { RouterLink } from "../../components/router-link/rouer-link";

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
        title="About"
        titleClassName={global_styles.h1HeroText}>
        <p>I'm 19 year old self taught <b>Programmer</b> from <b>Poland</b>. I have been learning general programming for over 3 years, and I still continue it by experimenting with code, working on projects, and studying in college. I am also open for commissions in Minecraft Bedrock Edition - every user interface modifications.</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", paddingTop: "1.5rem" }}>
          <RouterLink
            to="/contact"  >
            <Button text="Contact" buttonColor={"blue"}></Button>
          </RouterLink>
          <RouterLink
            to="/projects" >
            <Button text="Projects" buttonColor={"default"}></Button>
          </RouterLink>
        </div>
      </ScreenSection>

      <ScreenSection
        id="skills"
        title="Skills"
        noChildrenPadding={true}>
        <>
          <p><b>Rated on</b> my own knowledge and experience achieved by contributing projects.</p>
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
          <p style={{ marginBottom: "1.5rem" }}>I'm currently learning computer science at college and plan to become, well some serious dev guy lol. I am also creating custom UIs as commissions in Minecraft Bedrock Edition, in which I feel like almost an <b>Expert</b>. If you have any plans to create custom UIs in this game, <b>feel free to contact me and check out my work in</b> <RouterLink to="/projects" underline> <b>projects page!</b> </RouterLink></p>
          <ExperienceTreeContainer>
            <ExperienceTree
              index={2}
              role={EXPERIENCE_TREE[0].role}
              date={EXPERIENCE_TREE[0].date}
              company={EXPERIENCE_TREE[0].company}
              items={EXPERIENCE_TREE[0].items}>
              <div style={{ paddingTop: "1.5rem", width: "fit-content" }}>
                <Button buttonColor={"blue"} text="Example JsonUI Projects" onClick={handleExampleProjectsClick} />
              </div>
            </ExperienceTree>
            <ExperienceTree
              index={1}
              role={EXPERIENCE_TREE[1].role}
              date={EXPERIENCE_TREE[1].date}
              company={EXPERIENCE_TREE[1].company}
              items={EXPERIENCE_TREE[1].items}>
              <p style={{ paddingTop: "1rem" }}>
                <RouterLink
                  underline
                  className={styles.heroTextBBRouter}
                  to="/projects/better_bedrock" ><span className={`${styles.heroText} ${global_styles.h1HeroText}`}>Better Bedrock - the project I'm most proud of!</span>
                </RouterLink> Started from nothing by just me, then evoled to the most advanced Texture Pack in MCBE! - I started to play Minecraft Bedrock Edition when I was young and in this game, I began to create random stuff related to user interface - UI. Later, I moved on to entity models, animations, and general entity logic. By combining all these elements I created this project!</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ paddingTop: "1.5rem", width: "fit-content" }}>
                  <RouterLink
                    to="/projects/better_bedrock" >
                    <Button buttonColor={"blue"} text="Better Bedrock Showcase" />
                  </RouterLink>
                </div>
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
          <p style={{ marginBottom: "1.5rem" }}>Whether you have a project in mind or just want to reach out, <b>I would love to hear from you!</b> Let us combine our ideas and <b>make something absolutely amazing together!</b></p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <RouterLink
              to="/contact">
              <Button text="Contact" buttonColor={"blue"}></Button>
            </RouterLink>
            <RouterLink
              to="/projects">
              <Button text="Projects" buttonColor={"default"}></Button>
            </RouterLink>
          </div>
        </>
      </ScreenSection>

    </ScreenContainer>
  );
}

export { Home };
