import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, ButtonColor } from "../button/Button";
import styles from "./Header.module.css";
import logo from "../../assets/logo192.png";
import { Link as RouterLink } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavigation = (to: string) => {
    navigate(to);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      handleNavigation("/");
    }
  }

  const NAV_LINKS = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/projects",
      text: "Projects",
    },
    {
      to: "/contact",
      text: "Contact",
    },
    {
      to: "/info",
      text: "Info",
    },
  ]

  return (
    <div className={styles.headerScreen}>
      <div className={styles.header} id="header">
        <div className={styles.headerContainer}>

          <div className={styles.firstSection}>
            <NavLink
              onClick={handleLogoClick}
              to="/"
              end
              style={{ textDecoration: 0 }}
            >
              <div className={styles.logoContainer}>
                <img src={logo} className={styles.logoImg} alt="Axmbro Logo" />
              </div>
            </NavLink>
            <div className={styles.desktopButtons}>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.headerLinkActive}`
                      : `${styles.headerLink}`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          </div>

          <div className={styles.secondSection}>
            <div className={styles.secondSectionContactButton}>
              <RouterLink
                to="/contact" >
                <Button
                  buttonColor={ButtonColor.blue}
                  text="Contact" />
              </RouterLink>
            </div>


            <div className={styles.mobileButtons}>
              <div
                onClick={toggleMenu}
                style={{ display: menuOpen ? "none" : "inline-block" }}
                aria-label="Open menu"
              >
                <h2 className={styles.headerLinkMobile}>Menu</h2>
              </div>
              <div
                className={styles.menu}
                style={{ display: menuOpen ? "block" : "none" }}
              >
                <div className={styles.menuContainer}>
                  {NAV_LINKS.map((link) => (
                    <div key={link.to} onClick={toggleMenu}>
                      <NavLink to={link.to} end style={{ width: "100%" }}>
                        <Button
                          text={link.text}
                          style={{ width: "100%", boxSizing: "border-box" }}
                        ></Button>
                      </NavLink>
                    </div>
                  ))}
                </div>
                <div className={styles.overlay} onClick={closeMenu}></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export { Header };
