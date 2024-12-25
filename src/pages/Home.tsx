import React from "react";
import "./Home.css";
import {
  ScreenSection,
  ScreenSectionList,
} from "../components/ScreenSection";
import { Link as RouterLink } from "react-router-dom";
import "../components/Button.css";
import { Card } from "../components/Card";
import { Button, ButtonColor } from "../components/Button";
import { scrollToElement } from "../utils/utils";
import { Link } from "../components/Link";

function Home() {
  return (
    <div className="home screenContainer">
      <div className="screenContent">
        <ScreenSection
          style={{ padding: "1rem 0 2rem 0"}}
          title="About Me"
          description1="Hey! I'm Axmbro because Ambro was taken everywhere... I'm a guy from Poland who loves creating fancy and cool things on the computer!"
          description2="I play a lot of Minecraft Bedrock, and in this game, I started creating random stuff related to user interface (UI). Later, I moved on to entity models, animations, and general entity logic. By combining all these elements, Better Bedrock was born!"
          children={
            <div style={{ display: "flex", gap: "1rem" }}>
              <RouterLink
                to="/projects" >
                <Button buttonColor={ButtonColor.blue} text="My Projects" />
              </RouterLink>
              <div onClick={() => {
                scrollToElement("contact");
              }}><Button buttonColor={ButtonColor.default} text="Contact" /></div>
            </div>
          }
        ></ScreenSection>
        <ScreenSection
          title="Skills"
          description1="Here is a list of my skills, rated out of 10 based on my own knowledge and experience."
          children={
            <div className="SkillsSection">
              <Card
                title="Programming"
                children={
                  <ScreenSectionList
                    style={{ padding: 0, border: 0 }}
                    items={[
                      { name: "HTML", value: "7/10" },
                      { name: "CSS", value: "6/10" },
                      { name: "JAVASCRIPT", value: "6/10" },
                    ]}
                  ></ScreenSectionList>
                }
              ></Card>
              <Card
                title="Version Control"
                children={
                  <ScreenSectionList
                    style={{ padding: 0, border: 0 }}
                    items={[{ name: "Github", value: "6/10" }]}
                  ></ScreenSectionList>
                }
              ></Card>
              <Card
                title="Tools"
                children={
                  <ScreenSectionList
                    style={{ padding: 0, border: 0 }}
                    items={[{ name: "Visual Studio Code", value: "7/10" }]}
                  ></ScreenSectionList>
                }
              ></Card>
              <Card
                title="Other"
                children={
                  <ScreenSectionList
                    style={{ padding: 0, border: 0 }}
                    items={[
                      { name: "Minecraft Bedrock JsonUI", value: "10/10" },
                    ]}
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
                      { name: "Python", value: "4/10" },
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
          description1="I am learning web technologies with plans to become a web developer. I also create custom UIs for Minecraft Bedrock Edition, from sleek HUDs to wild forms that are available in projects page!"
          // children={<h2>TODO - something like linkedin experience tree</h2>}
        ></ScreenSection>
        <div id="contact">
          <ScreenSection
            title="Contact"
            description1="Whether you have a project in mind or just want to reach out, I would love to hear from you! Let us make something amazing together!"
            children={<ContactSection />}
          ></ScreenSection>
        </div>
      </div>
    </div>
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
            {", "}
            <Link href="https://discord.gg/ZGK5WYXnEY" text="discord.gg/wJhH86c2wb" ></Link>
          </li>
          <li key={`4`}>
            YouTube Channels:{" "}
            <Link href="https://www.youtube.com/@axmbro" text="@axmbro" ></Link>
            {", "}
            <Link href="https://www.youtube.com/@axmbro2" text="@axmbro2" ></Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
