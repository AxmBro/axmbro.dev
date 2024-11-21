import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
      <div className="header">
        <div className="headerContainer">
          <div className="firstSection">
            <NavLink className="logo" to="/">
              Axmbro
            </NavLink>
          </div>
          <div className="secondSection">
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
        </div>
      </div>
    </div>
  );
}

export default Header;
