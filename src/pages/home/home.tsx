import React from "react";
import styles from "./home.module.css";
import {
  ScreenSection,
  ScreenSectionList,
} from "../../components/layout/screen_section";
import { Link as RouterLink } from "react-router-dom";
import { Card } from "../../components/cards/card";
import { Button, ButtonColor } from "../../components/buttons/button";
import { scrollToElement } from "../../utils/scroll";
import { Link } from "../../components/links/custom_link";
import { ScreenContainer } from "../../components/layout/screen_container";

const Home = () => {
  const ScreenSectionListStyle = {
    padding: 0,
    border: 0
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
          <Card
            title="Programming">
            <ScreenSectionList
              style={ScreenSectionListStyle}
              items={[
                { name: "HTML", value: "7/10" },
                { name: "CSS", value: "6/10" },
                { name: "JAVASCRIPT", value: "7/10" },
                { name: "TYPESCRIPT", value: "4/10" },
                { name: "Minecraft Bedrock JsonUI", value: "10/10" },
              ]}
            />
          </Card>
          <Card
            title="Tools">
            <ScreenSectionList
              style={ScreenSectionListStyle}
              items={[{ name: "Github (Version Control)", value: "6/10" }, { name: "Visual Studio Code (IDE)", value: "7/10" }]}
            />
          </Card>
          <Card
            title="Learning">
            <ScreenSectionList
              style={ScreenSectionListStyle}
              items={[
                { name: "React", value: "5/10" },
                { name: "Python", value: "3/10" },
              ]}
            />
          </Card>
          <Card
            title="Languages">
            <ScreenSectionList
              style={ScreenSectionListStyle}
              items={[
                { name: "Polish", value: "Native" },
                { name: "English", value: "B2, Learning" },
              ]}
            />
          </Card>
        </div>
      </ScreenSection>

      <ScreenSection
        id="experience"
        title="Experience"
        description1="I'm currently learning web technologies with plans to become a web developer. I also create custom UIs for Minecraft Bedrock Edition, from sleek HUDs to wild forms that are available in projects page!">
        <h2 style={{ paddingBottom: "1rem" }}>
          <RouterLink
            className={styles.heroTextBBRouter}
            to="/projects/better_bedrock" ><span className={`${styles.heroText} ${styles.heroTextBB}`}>Better Bedrock - the project I'm most proud of!</span>
          </RouterLink> Started from nothing by just me, that evoled to the most advanced let's say addon in MCBE! - I started to play Minecraft Bedrock Edition when I was young and in this game, I began to create random stuff related to user interface - UI. Later, I moved on to entity models, animations, and general entity logic. By combining all these elements I created this project!</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <RouterLink
            to="/projects" >
            <Button buttonColor={ButtonColor.blue} text="Navigate to Projects" />
          </RouterLink>
          <RouterLink
            to="/projects/better_bedrock" >
            <Button buttonColor={ButtonColor.default} text="Better Bedrock" />
          </RouterLink>
        </div>
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
            <li key={`3`}> Discord:{" "} <Link href="https://discord.com/users/679603350236299266" text="AxmBro" ></Link> {" | "} <Link href="https://discord.gg/ZGK5WYXnEY" text="discord.gg/wJhH86c2wb" ></Link> </li>
            <li key={`4`}> YouTube Channels:{" "} <Link href="https://www.youtube.com/@axmbro" text="@axmbro" ></Link> {" | "} <Link href="https://www.youtube.com/@axmbro2" text="@axmbro2" ></Link> </li>
          </ul>
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
}

export { Home };
