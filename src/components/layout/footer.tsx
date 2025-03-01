import React from "react";
import styles from "./footer.module.css";
import { ScreenContainer } from "./screen-container";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo192.png";

const Footer: React.FC = () => {
  return (
    <ScreenContainer
      id="footer"
      className={styles.footerScreenContainer}
      useMinHeight={false}
      style={{ paddingBottom: 0 }}>
      <div className={styles.topFooterContainer}>
        <div className={styles.routesContainer}>
          <NavLink
            to="/"
            end
            className={styles.logoNavLink}>
            <div className={styles.logoContainer}>
              <img src={logo} className={styles.logoImg} alt="" />
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
          <NavLink
            to="/contact"
            end
          >
            Contact
          </NavLink>
          <NavLink
            to="/terms_of_use"
            end>
            Terms of Use
          </NavLink>
        </div>
        <div className={styles.routesContainer}>
          <p>Copyright © AxmBro | All rights reserved</p>
        </div>
      </div>
    </ScreenContainer>
  );
}

export { Footer };
