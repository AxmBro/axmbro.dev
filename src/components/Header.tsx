import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Button.css";
import { Button } from "./Button";
import { scrollToElement } from "../utils/utils";

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
          </div>

          <div className="secondSection">
            <div className="desktopButtons">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "headerLinkActive" : "headerLink"
                }
              >
                Home
              </NavLink>
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
                  } else {
                    handleNavigation("/");
                    setOpenHomeRouteByContactButton(true);
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
