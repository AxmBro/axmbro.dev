import React from "react";
import { ScreenSection } from "../../components/layout/screen_section";
import { ScreenContainer } from "../../components/layout/screen_container";
import styles from "./info.module.css";
import { CustomButton } from "../../components/button/custom_button";
import { RouteLink } from "../../components/link/route_link";
import { Link } from "../../components/link/custom_link";

const Info = () => {
  const height = "3.5rem";
  const width = "100%";
  return (
    <ScreenContainer>

      <ScreenSection
        id="info"
        style={{ padding: "1rem 0 2rem 0" }}
        title="Info"
        description1="This is quick info website, where you can directly access my all other social media platforms or just contact me!">
        <div className={styles.buttonsContainer}>
          <RouteLink
            useChildrenInsteadOfText={true}
            to="/">
            <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 200, b: 0 }} text="Portfolio Website" textContant="/home" />
          </RouteLink>
          <RouteLink
            useChildrenInsteadOfText={true}
            to="/projects">
            <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 200, b: 0 }} text="Portfolio Website" textContant="/projects" />
          </RouteLink>
          <Link
            href="https://github.com/AxmBro"
            openInNewTab={true}
            useChildrenInsteadOfText={true}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 99, g: 129, b: 175 }} text="Github" textContant="AxmBro" />
          </Link>
          <Link
            href="https://discord.com/users/679603350236299266"
            openInNewTab={true}
            useChildrenInsteadOfText={true}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 86, g: 98, b: 246 }} text="Discord Nick" textContant="AxmBro" />
          </Link>
          <Link
            href="https://discord.gg/wJhH86c2wb"
            openInNewTab={true}
            useChildrenInsteadOfText={true}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 86, g: 98, b: 246 }} text="Personal Discord Server" textContant="discord.gg/wJhH86c2wb" />
          </Link>
          <Link
            href="https://discord.gg/ZGK5WYXnEY"
            openInNewTab={true}
            useChildrenInsteadOfText={true}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 86, g: 98, b: 246 }} text="Featured Discord Server" textContant="discord.gg/ZGK5WYXnEY" />
          </Link>
          <Link
            href="https://www.youtube.com/@axmbro"
            openInNewTab={true}
            useChildrenInsteadOfText={true}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 1, b: 51 }} text="Main YouTube Channel" textContant="@axmbro" />
          </Link>
          <Link
            href="https://www.youtube.com/@axmbro2"
            openInNewTab={true}
            useChildrenInsteadOfText={true}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 1, b: 51 }} text="Second YouTube Channel" textContant="@axmbro2" />
          </Link>
          <Link
            href="mailto:axmbro@gmail.com?subject=Contact%20Request"
            openInNewTab={true}
            useChildrenInsteadOfText={true}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 234, g: 67, b: 53 }} text="Email" textContant="axmbro@gmail.com" />
          </Link>
          <Link
            href="https://twitter.com/AxmBro"
            openInNewTab={true}
            useChildrenInsteadOfText={true}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 36, g: 158, b: 240 }} text="Twitter" textContant="@AxmBro" />
          </Link>
          <Link
            href="https://www.instagram.com/axmbro_"
            openInNewTab={true}
            useChildrenInsteadOfText={true}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 221, g: 42, b: 123 }} text="Instagram" textContant="axmbro_" />
          </Link>
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { Info };