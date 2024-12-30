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

function Home() {
  return (
    <ScreenContainer>
      <ScreenSection
        style={{ padding: "1rem 0 2rem 0" }}
        ignoreChildrenPadding={true}
        title="About Me"
        children={
          <>
            <h2 style={{ paddingBottom: "1rem" }}>Hey I'm <span className={styles.heroText}>Axmbro</span>! I like creating fancy and cool things on the computer! I'm currently learning web technologies with plans to become a web developer. I also create custom UIs in Minecraft Bedrock Edition that are available in projects page!</h2>
            <h2>I started to play Minecraft Bedrock Edition when I was young and in this game, I started to create random stuff related to user interface (UI). Later, I moved on to entity models, animations, and general entity logic. By combining all these elements I created...</h2>
            <h2 style={{ paddingBottom: "1rem" }}>
              <RouterLink
                className={styles.heroTextBBRouter}
                to="/projects/better_bedrock" ><span className={`${styles.heroText} ${styles.heroTextBB}`}>Better Bedrock - the project I'm most proud of!</span>
              </RouterLink> Started from nothing by just me, that evoled to the most advanced let's say addon in MCBE!</h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <RouterLink
                to="/projects" >
                <Button buttonColor={ButtonColor.blue} text="Projects" />
              </RouterLink>
              <div onClick={() => {
                scrollToElement("contact");
              }}><Button buttonColor={ButtonColor.default} text="Contact" /></div>
              <RouterLink
                to="/projects/better_bedrock" >
                <Button buttonColor={ButtonColor.defaultEmpty} text="Better Bedrock" />
              </RouterLink>
            </div>
          </>
        }
      ></ScreenSection>
      <ScreenSection
        title="Skills"
        description1="Here is a list of my skills, rated out of 10 based on my own knowledge and experience."
        children={
          <div className={styles.SkillsSection}>
            <Card
              title="Programming"
              children={
                <ScreenSectionList
                  style={{ padding: 0, border: 0 }}
                  items={[
                    { name: "HTML", value: "7/10" },
                    { name: "CSS", value: "6/10" },
                    { name: "JAVASCRIPT", value: "7/10" },
                    { name: "TYPESCRIPT", value: "5/10" },
                    { name: "Minecraft Bedrock JsonUI", value: "10/10" },
                  ]}
                ></ScreenSectionList>
              }
            ></Card>
            <Card
              title="Tools"
              children={
                <ScreenSectionList
                  style={{ padding: 0, border: 0 }}
                  items={[{ name: "Github (Version Control)", value: "6/10" }, { name: "Visual Studio Code", value: "7/10" }]}
                ></ScreenSectionList>
              }
            ></Card>
            <Card
              title="Learning"
              children={
                <ScreenSectionList
                  style={{ padding: 0, border: 0 }}
                  items={[
                    { name: "React", value: "4/10" },
                    { name: "Python", value: "3/10" },
                  ]}
                ></ScreenSectionList>
              }
            ></Card>
            <Card
              title="Languages"
              children={
                <ScreenSectionList
                  style={{ padding: 0, border: 0 }}
                  items={[
                    { name: "Polish", value: "Native" },
                    { name: "English", value: "B2, Learning" },
                  ]}
                ></ScreenSectionList>
              }
            ></Card>
          </div>
        }
      ></ScreenSection>
      <ScreenSection
        title="Experience"
        description1="I'm currently learning web technologies with plans to become a web developer. I also create custom UIs for Minecraft Bedrock Edition, from sleek HUDs to wild forms that are available in projects page!"
      // children={<h2>TODO - something like linkedin experience tree</h2>}
      ></ScreenSection>
      <div id="contact">
        <ScreenSection
          title="Contact"
          description1="Whether you have a project in mind or just want to reach out, I would love to hear from you! Let us make something amazing together!"
          children={<ContactSection />}
        ></ScreenSection>
      </div>
    </ScreenContainer>
  );
}

function ContactSection() {
  return (
    <div>
      <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
        <ul>
          <li key={`1`}>
            Github:{" "}
            <Link href="https://github.com/AxmBro" text="AxmBro" ></Link>
          </li>
          <li key={`2`}>
            Email:{" "}
            <Link href="mailto:axmbro@gmail.com?subject=Contact%20Request" text="axmbro@gmail.com" ></Link>
          </li>
          <li key={`3`}>
            Discord:{" "}
            <Link href="https://discord.com/users/679603350236299266" text="AxmBro" ></Link>
            {" | "}
            <Link href="https://discord.gg/ZGK5WYXnEY" text="discord.gg/wJhH86c2wb" ></Link>
          </li>
          <li key={`4`}>
            YouTube Channels:{" "}
            <Link href="https://www.youtube.com/@axmbro" text="@axmbro" ></Link>
            {" | "}
            <Link href="https://www.youtube.com/@axmbro2" text="@axmbro2" ></Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
