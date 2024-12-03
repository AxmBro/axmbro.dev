import React from "react";
import "./Home.css";
import "./Screen.css";
import {
  ScreenSection,
  ScreenSectionList,
} from "../components/ScreenSection.tsx";
import { Link } from "react-router-dom";
import "../components/Button.css";
import { Card } from "../components/Card.tsx";

function Home() {
  return (
    <div className="home screenContainer">
      <div className="screenContent">
        <ScreenSection
          title="About Me"
          description1="Hey! I am Axmbro, because Ambro was taken everywhere! I am a guy from Poland who wants to create fancy and cool things in computer!"
          description2="I play a lot Minecraft Bedrock and in this game I started to create random stuff related with user interface - UI. Then moved to entity models, animations, general entity logic, and by combining all of these elements Better Bedrock was created!"
          children={
            <>
              <Link
                className="Button ButtonNoBorder"
                style={{
                  textDecoration: 0,
                  background: "var(--secondary-text-color)",
                  color: "var(--website-background-color)",
                }}
                to="/projects"
              >
                My projects
              </Link>
            </>
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
          description1="I am learning web technologies with plans to become a web developer. I also create custom UIs for Minecraft Bedrock Edition, from sleek HUDs to wild forms. Check out my projects!"
          children={<h2>TODO - something like linkedin experience tree</h2>}
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
          <li key={`contact1`}>
            Email:{" "}
            <span key={`spancontact1`}>
              axmbro@gmail.com
            </span>
          </li>
          <li key={`contact2`}>
            Discord: <span key={`spancontact2`}>AxmBro</span>
          </li>
          <li key={`contact3`}>
            Discord Server:{" "}
            <a
              href="https://discord.gg/ZGK5WYXnEY"
              key={`spancontact3`}
              className="link"
            >
              discord.gg/wJhH86c2wb
            </a>
          </li>
          <li key={`contact4`}>
            YouTube:{" "}
            <a
              href="https://www.youtube.com/@axmbro"
              key={`spancontact4`}
              className="link"
            >
              @axmbro
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
