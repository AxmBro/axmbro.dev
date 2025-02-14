import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button, ButtonColor } from "../button/Button";
import styles from "./Header.module.css";
import logo from "../../assets/logo192.png";
import { Link as RouterLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

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
  }
]

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const minWidth = useMediaQuery({ query: "(max-width: 250px)" });
  const isResponsive = useMediaQuery({ query: "(max-width: 650px)" });

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

  return (
    <>
      <div className={styles.headerRoot}>
        <div className={styles.header} id="header">
          <div className={styles.headerContainer}>

            <div className={styles.section1}>
              <NavLink
                onClick={handleLogoClick}
                to="/"
                end
                style={{ textDecoration: 0 }}>
                <div className={styles.logoContainer}>
                  <img src={logo} className={styles.logoImg} alt="Axmbro Logo" />
                </div>
              </NavLink>
              {!minWidth && (
                <div className={styles.logoTextContainer}>
                  <p>AxmBro</p>
                  <p style={{ color: "var(--text-color-4)" }}>Junior Developer</p>
                </div>
              )}
            </div>

            <div className={styles.section3}>
              {!isResponsive && (
                <div className={styles.desktopButtons}>
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end
                      className={({ isActive }) => isActive ? `${styles.headerLinkActive}` : `${styles.headerLink}`}>
                      {link.text}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.section2}>
              {!isResponsive && (
                <RouterLink
                  to="/contact" >
                  <Button
                    buttonColor={ButtonColor.blue}
                    text="Contact me!" />
                </RouterLink>
              )}
              {(isResponsive) && (
                <div
                  onClick={toggleMenu}>
                  <p className={`${styles.headerLink} ${styles.noSelect}`} style={{ color: "var(--text-color-1)" }}>{menuOpen ? "Close" : "Menu"}</p>
                </div>
              )}
            </div>
          </div>


          {(isResponsive && menuOpen) && (
            <div className={styles.mobileMenu} >
              {NAV_LINKS.map((link) => (
                <div key={link.to} onClick={toggleMenu}>
                  <NavLink to={link.to} end style={{ width: "100%" }}>
                    <Button
                      buttonColor={ButtonColor.defaultEmpty2}
                      text={link.text}
                      style={{ width: "100%", boxSizing: "border-box" }}
                    ></Button>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {(isResponsive && menuOpen) && (<div className={styles.overlay} onClick={closeMenu}></div>)}
    </>
  );
};
export { Header };
