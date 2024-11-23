import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import "./Button.css";
import Button from "./Button.tsx";

// zrobic dropdowna
function Header() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleMenu = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const closeMenu = () => {
    setSideBarOpen(false)
  }

  return (
    <div className="headerScreen">
      <div className="header">
        <div className="headerContainer">
          <div className="firstSection">
            <NavLink className="logo" to="/">
              Axmbro
            </NavLink>
          </div>

          <div className="secondSection">
            <div className="desktopButtons">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? "headerLinkActive" : "headerLink"
                }
              >
                Projects
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "headerLinkActive" : "headerLink"
                }
              >
                Contact
              </NavLink>
            </div>
            <div className="mobileButtons">
              <div
                className="Button"
                onClick={toggleMenu}
                style={{ display: sideBarOpen ? "none" : "inline-block" }}
              >
                Menu
              </div>
              <div
                className="menu"
                style={{ display: sideBarOpen ? "block" : "none" }}
              >
                <div className="overlay" onClick={closeMenu}>
                  
                </div>
                <div className="menuContainer">
                  <div onClick={toggleMenu}>
                    <Button
                      children={
                        <NavLink
                          to="/projects"
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
                        <NavLink
                          to="/contact"
                          className={({ isActive }) =>
                            isActive ? "headerLinkActive" : "headerLink"
                          }
                        >
                          Contact
                        </NavLink>
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
