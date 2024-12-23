import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Button.css";
import { Button } from "./Button.tsx";
import { scrollToElement } from "../utils/utils.tsx";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openHomeRoute, setOpenHomeRoute] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && openHomeRoute) {
      setTimeout(() => {
        scrollToElement("contact");
      }, 100)
      setOpenHomeRoute(!openHomeRoute);
    }
  }, [location.pathname, openHomeRoute]);

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
    <div className="headerScreen">
      <div className="header" id="header">
        <div className="headerContainer">
          <div className="firstSection">
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
              className={({ isActive }) =>
                isActive ? "logo" : "headerLink logo"
              }
            >
              Axmbro
            </NavLink>
            {/* <h1
              // className="logo"
              // className={({ isActive }) =>
              //   isActive ? "headerLinkActive logo" : "headerLink logo"
              // }
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
            >
              Axmbro
            </h1> */}
          </div>

          <div className="secondSection">
            <div className="desktopButtons">
              <NavLink
                to="/projects"
                end
                className={({ isActive }) =>
                  isActive ? "headerLinkActive" : "headerLink"
                }
              >
                Projects
              </NavLink>
              <h2
                className="headerLink"
                onClick={() => {
                  if (location.pathname === "/") {
                    scrollToElement("contact");
                    runContactAnimation();
                  } else {
                    handleNavigation("/");
                    setOpenHomeRoute(true);
                    runContactAnimation();
                  }
                }}
              >
                Contact
              </h2>
            </div>
            <div className="mobileButtons">
              <div
                onClick={toggleMenu}
                style={{ display: menuOpen ? "none" : "inline-block" }}
              >
                <Button text="Menu"></Button>
              </div>
              <div
                className="menu"
                style={{ display: menuOpen ? "block" : "none" }}
              >
                <div className="overlay" onClick={closeMenu}></div>
                <div className="menuContainer">
                  <div onClick={toggleMenu}>
                    <NavLink
                      to="/projects"
                      end
                    >
                      <Button text="Projects"></Button>
                    </NavLink>
                  </div>
                  <div onClick={() => {
                    toggleMenu();
                    if (location.pathname === "/") {
                      scrollToElement("contact");
                      runContactAnimation();
                    } else {
                      handleNavigation("/");
                      setOpenHomeRoute(true);
                      runContactAnimation();
                    }
                  }}>

                    <Button text="Contact"></Button>
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

function runContactAnimation() {
  setTimeout(() => {
    const element = document.getElementById("contact");

    if (element) {
      element.style.animation = 'none';

      setTimeout(() => {
        element.style.animation = 'fadeInOut 0.5s ease-in-out forwards';
      }, 200);
    }
  }, 10)
};

export { Header, runContactAnimation };
