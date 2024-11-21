import React from "react";
import "./Contact.css";
import "./Screen.css";
import { ScreenSectionList } from "../components/ScreenSection.tsx";

function Contact() {
  return (
    <div className="contact screenContainer">
      <div className="screenContent">
        <ScreenSectionList
          title="Contact"
          items={[
            { name: "Email", value: "axmbro@gmail.com" },
            { name: "Discord", value: "AxmBro" },
            { name: "Discord Server", value: "discord.gg/wJhH86c2wb" },
            { name: "YouTube", value: "@axmbro" },
          ]}
        ></ScreenSectionList>
      </div>
    </div>
  );
}

export default Contact;
