import React from "react";
import styles from "./footer.module.css";
import { ScreenContainer } from "./screen_container";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { scrollToElement } from "../../utils/scroll";

interface FooterProps {
  openHomeRouteByContactButton: boolean;
  setOpenHomeRouteByContactButton: React.Dispatch<React.SetStateAction<boolean>>;
}

function Footer({ openHomeRouteByContactButton, setOpenHomeRouteByContactButton }: FooterProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (to: string) => {
    navigate(to);
  };


  return (
    <ScreenContainer
      id="footer"
      className={styles.footerScreenContainer}
      useMinHeight={false}
      style={{ backgroundColor: "var(--website-background-color2)", borderTop: "1px solid var(--line-break-color)" }}>
      <div className={styles.footer}>
        <div className={styles.routesContainer}>
          <NavLink
            to="/"
            end
          >
            <div className={styles.logoContainer}>
              <img src={require("../../assets/logo192.png")} className={styles.logoImg} alt="" />
            </div>
          </NavLink>
          <NavLink
            to="/"
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            end
          >
            Projects
          </NavLink>
          <h2
            onClick={() => {
              if (location.pathname === "/") {
                scrollToElement("contact");
              } else {
                handleNavigation("/");
                setOpenHomeRouteByContactButton(true);
              }
            }}
          >
            Contact
          </h2>

        </div>
        <h2>Copyright © AxmBro | All rights reserved</h2>
      </div>
    </ScreenContainer>
  );
}

export { Footer };
