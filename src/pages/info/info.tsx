import { ScreenSection } from "../../components/layout/ScreenSection";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import styles from "./Info.module.css";
import { CustomButton } from "../../components/button/CustomButton";
import { RouteLink } from "../../components/link/RouteLink";
import { Link } from "../../components/link/Link";
import { scrollToElement } from "../../utils/scroll";
import { useHomeRoute } from "../../components/contexts/NavigateToContactContext";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const { setNavigateToContact } = useHomeRoute();
  const navigate = useNavigate();

  const handleNavigation = (to: string) => {
    navigate(to);
  };

  document.title = "AxmBro | Info"
  const height = "3.5rem";
  const width = "100%";
  return (
    <ScreenContainer> 

      <ScreenSection
        id="info"
        singleParagraph={true}
        title="Info"
        description1="This is quick info website, where you can directly access my all other social media platforms or just contact me!">
        <div className={styles.buttonsContainer}>
          <RouteLink
            to="/">
            <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 200, b: 0 }} text="Portfolio Website" textContant="/home" />
          </RouteLink>
          <RouteLink
            to="/projects">
            <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 200, b: 0 }} text="Portfolio Website" textContant="/projects" />
          </RouteLink>

          <div onClick={() => {
            if (location.pathname === "/") {
              scrollToElement("contact");
            } else {
              handleNavigation("/");
              setNavigateToContact(true);
            }
          }}>
            <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 200, b: 0 }} text="Portfolio Website" textContant="/contact" />
          </div>

          <Link
            href="https://github.com/AxmBro"
            openInNewTab={true}
          >
            <CustomButton style={{ height: height, width: width }} border={{ r: 99, g: 129, b: 175 }} text="Github" textContant="AxmBro" />
          </Link>
          <Link
            href="https://discord.com/users/679603350236299266"
            openInNewTab={true}
          >
            <CustomButton style={{ height: height, width: width }} border={{ r: 86, g: 98, b: 246 }} text="Discord Nick" textContant="AxmBro" />
          </Link>
          <Link
            href="https://discord.gg/wJhH86c2wb"
            openInNewTab={true}
          >
            <CustomButton style={{ height: height, width: width }} border={{ r: 86, g: 98, b: 246 }} text="Personal Discord Server" textContant="discord.gg/wJhH86c2wb" />
          </Link>
          <Link
            href="https://discord.gg/ZGK5WYXnEY"
            openInNewTab={true}
          >
            <CustomButton style={{ height: height, width: width }} border={{ r: 86, g: 98, b: 246 }} text="Featured Discord Server" textContant="discord.gg/ZGK5WYXnEY" />
          </Link>
          <Link
            href="https://www.youtube.com/@axmbro"
            openInNewTab={true}
          >
            <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 1, b: 51 }} text="Main YouTube Channel" textContant="@axmbro" />
          </Link>
          <Link
            href="https://www.youtube.com/@axmbro2"
            openInNewTab={true}
          >
            <CustomButton style={{ height: height, width: width }} border={{ r: 255, g: 1, b: 51 }} text="Second YouTube Channel" textContant="@axmbro2" />
          </Link>
          <Link
            href="mailto:axmbro@gmail.com?subject=Contact%20Request"
            openInNewTab={true}
          >
            <CustomButton style={{ height: height, width: width }} border={{ r: 234, g: 67, b: 53 }} text="Email" textContant="axmbro@gmail.com" />
          </Link>
          <Link
            href="https://twitter.com/AxmBro"
            openInNewTab={true}
          >
            <CustomButton style={{ height: height, width: width }} border={{ r: 36, g: 158, b: 240 }} text="Twitter" textContant="@AxmBro" />
          </Link>
          <Link
            href="https://www.instagram.com/axmbro_"
            openInNewTab={true}
          >
            <CustomButton style={{ height: height, width: width }} border={{ r: 221, g: 42, b: 123 }} text="Instagram" textContant="axmbro_" />
          </Link>
        </div>
      </ScreenSection>

    </ScreenContainer>
  );
};

export { Info };