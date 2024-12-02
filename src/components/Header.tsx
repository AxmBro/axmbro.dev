import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Button.css";
import Button from "./Button.tsx";
import { scrollToElement } from "../utils/utils.tsx";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navigate = useNavigate();
  const handleNavigation = (to: string) => {
    navigate(to);
  };

  const location = useLocation();
  const [openHomeRoute, setOpenHomeRoute] = useState(false);
  useEffect(() => {
    if (location.pathname === "/" && openHomeRoute) {
      setTimeout(() => {
        scrollToElement("contact");
      }, 100)
      setOpenHomeRoute(!openHomeRoute);
    }
  }, [location.pathname, openHomeRoute]);


  const runContactAnimation = () => {
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

  return (
    <div className="headerScreen">
      <div className="header" id="header">
        <div className="headerContainer">
          <div className="firstSection">
            <h1
              className="logo"
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
            </h1>
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
                className="Button"
                onClick={toggleMenu}
                style={{ display: menuOpen ? "none" : "inline-block" }}
              >
                Menu
              </div>
              <div
                className="menu"
                style={{ display: menuOpen ? "block" : "none" }}
              >
                <div className="overlay" onClick={closeMenu}></div>
                <div className="menuContainer">
                  <div onClick={toggleMenu}>
                    <Button
                      children={
                        <NavLink
                          to="/projects"
                          end
                          className={({ isActive }) =>
                            isActive ? "headerLinkActive" : "headerLink"
                          }
                        >
                          Projects
                        </NavLink>
                      }
                    ></Button>
                  </div>
                  <div onClick={toggleMenu}>
                    <Button
                      children={
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
                      }
                    ></Button>
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

export default Header;
