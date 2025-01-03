import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../buttons/button";
import { scrollToElement } from "../../utils/scroll";
import styles from "./header.module.css";

interface HeaderProps {
  openHomeRouteByContactButton: boolean;
  setOpenHomeRouteByContactButton: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ openHomeRouteByContactButton, setOpenHomeRouteByContactButton }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && openHomeRouteByContactButton) {
      setTimeout(() => {
        scrollToElement("contact");
      }, 100)
      setOpenHomeRouteByContactButton(!openHomeRouteByContactButton);
    }
  }, [location.pathname, openHomeRouteByContactButton, setOpenHomeRouteByContactButton]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavigation = (to: string) => {
    navigate(to);
  };

  return (
    <div className={styles.headerScreen}>
      <div className={styles.header} id="header">
        <div className={styles.headerContainer}>
          <div className={styles.firstSection}>
            <NavLink
              onClick={() => {
                if (location.pathname === "/") {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                } else {
                  handleNavigation("/");
                }
              }}
              to="/"
              end
              style={{ textDecoration: 0 }}
            >
              <div className={styles.logoContainer}>
                <img src={require("../../assets/logo192.png")} className={styles.logoImg} alt="" />
                <h1 className={styles.logo}>Axmbro</h1>
              </div>
            </NavLink>
          </div>

          <div className={styles.secondSection}>
            <div className={styles.desktopButtons}>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.headerLinkActive}` : `${styles.headerLink}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/projects"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.headerLinkActive}` : `${styles.headerLink}`
                }
              >
                Projects
              </NavLink>
              <h2
                className={styles.headerLink}
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
            <div className={styles.mobileButtons}>
              <div
                onClick={toggleMenu}
                style={{ display: menuOpen ? "none" : "inline-block" }}
              >
                <Button text="Menu" style={{minWidth: 0}}></Button>
              </div>
              <div
                className={styles.menu}
                style={{ display: menuOpen ? "block" : "none" }}
              >
                <div className={styles.overlay} onClick={closeMenu}></div>
                <div className={styles.menuContainer}>
                  <div onClick={toggleMenu}>
                    <NavLink
                      to="/"
                      end
                    >
                      <Button text="Home" style={{ width: "100%", boxSizing: "border-box" }}>

                      </Button>
                    </NavLink>
                  </div>
                  <div onClick={toggleMenu}>
                    <NavLink
                      to="/projects"
                      end
                    >
                      <Button text="Projects" style={{ width: "100%", boxSizing: "border-box" }}></Button>
                    </NavLink>
                  </div>
                  <div onClick={() => {
                    toggleMenu();
                    if (location.pathname === "/") {
                      scrollToElement("contact");
                    } else {
                      handleNavigation("/");
                      setOpenHomeRouteByContactButton(true);
                    }
                  }}>

                    <Button text="Contact" style={{ width: "100%", boxSizing: "border-box" }}></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { Header };
