import React from "react";
import { ScreenSection } from "../../components/ScreenSection";
import { Button, ButtonColor } from "../../components/Button";
import { Link } from "../../components/Link";

function ShopUIpage() {
  return (
    <div className="projects screenContainer">
      <div className="screenContent">
        <ScreenSection
          style={{ padding: "1rem 0 2rem 0" }}
          title="Shop UI"
          description1="CUSTOM SERVER FORM UI created for personal use, but also to test custom tabs in vanilla style, many texts in each button and search feature!"
        ></ScreenSection>
        <ScreenSection
          ignoreChildrenPadding={true}
          title="Creators"
          children={
            <div>
              <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
                <ul>
                  <li key={`1`}>
                    Texture Pack:{" "}
                    <Link href="https://github.com/AxmBro" text="AxmBro" ></Link>
                  </li>
                </ul>
              </div>
            </div>
          }
        ></ScreenSection>
        <ScreenSection
          ignoreChildrenPadding={true}
          title="Technology"
          children={
            <div>
              <div className="ScreenSectionList" style={{ padding: 0, border: 0 }}>
                <ul>
                  <li key={`1`}>
                    Texture Pack:{" "}
                    <Link href="https://www.json.org/json-en.html" text="JSON" ></Link>
                    {", "}
                    <Link href="https://wiki.bedrock.dev/json-ui/json-ui-documentation.html" text="Minecraft Bedrock JsonUI" ></Link>
                  </li>
                </ul>
              </div>
            </div>
          }
        ></ScreenSection>
      </div>
    </div>
  )
}

export { ShopUIpage }