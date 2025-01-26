import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import styles from "./Header.module.css";
import logo from "../../assets/logo192.png";

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
                <img src={logo} className={styles.logoImg} alt="" />
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
              <NavLink
                to="/contact"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.headerLinkActive}` : `${styles.headerLink}`
                }
              >
                Contact
              </NavLink>
            </div>
            <div className={styles.mobileButtons}>
              <div
                onClick={toggleMenu}
                style={{ display: menuOpen ? "none" : "inline-block" }}
              >
                <h2 className={styles.headerLinkMobile}>Menu</h2>
              </div>
              <div
                className={styles.menu}
                style={{ display: menuOpen ? "block" : "none" }}
              >
                <div className={styles.menuContainer}>
                  <div onClick={toggleMenu}>
                    <NavLink
                      to="/"
                      end
                      style={{ width: "100%" }}
                    >
                      <Button text="Home" style={{ width: "100%", boxSizing: "border-box" }}>

                      </Button>
                    </NavLink>
                  </div>
                  <div onClick={toggleMenu}>
                    <NavLink
                      to="/projects"
                      end
                      style={{ width: "100%" }}
                    >
                      <Button text="Projects" style={{ width: "100%", boxSizing: "border-box" }}></Button>
                    </NavLink>
                  </div>
                  <div onClick={toggleMenu}>
                    <NavLink
                      to="/contact"
                      end
                      style={{ width: "100%" }}
                    >
                      <Button text="Contact" style={{ width: "100%", boxSizing: "border-box" }}></Button>
                    </NavLink>
                  </div>
                </div>
                <div className={styles.overlay} onClick={closeMenu}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { Header };
