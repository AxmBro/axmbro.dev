import React, { ReactNode } from "react";
import "./ScreenSection.css";

interface ScreenSectionProp {
  singleParagraph?: Boolean;
  ignoreChildrenPadding?: boolean;
  childrenTopDivider?: boolean;
  children?: ReactNode;
  title?: string;
  description1?: string;
  description2?: string;
  style?: React.CSSProperties;
  id?: string;
}

const ScreenSection: React.FC<ScreenSectionProp> = ({
  singleParagraph = false,
  ignoreChildrenPadding = false,
  childrenTopDivider = false,
  children,
  title,
  description1,
  description2,
  style,
  id
}) => {
  return (
    <div className="ScreenSection" style={{ padding: singleParagraph ? "1rem 0 2rem 0" : "", border: singleParagraph ? 0 : "", ...style }} id={id}>
      {title ? <h1>{title}</h1> : null}
      {description1 ? <p style={{ paddingBottom: description2 ? "1rem" : 0 }}>{description1}</p> : null}
      {description2 ? <p>{description2}</p> : null}
      <div
        style={{
          paddingTop: (ignoreChildrenPadding ? 0 : ((children && (title || description1 || description2)) ? "1rem" : 0)),
          marginTop: childrenTopDivider ? "1rem" : "",
          borderTop: childrenTopDivider ? "1px var(--line-break-color) solid" : "",
        }}>
        {children}
      </div>
    </div>
  );
}

interface ScreenSectionListProps {
  title?: string;
  items: { name: string, value?: string }[];
  style?: React.CSSProperties;
}

const ScreenSectionList: React.FC<ScreenSectionListProps> = ({
  title,
  items,
  style
}) => {
  return (
    <div className="ScreenSectionList" style={style}>
      {title ? <h1>{title}</h1> : null}
      <ul>
        {items.map((item, index) => {
          return (
            <li key={`li${index}`}>
              {item.name}{item.value && (<span>: </span>)}<span className="highlight" key={`span${index}`}>{item.value}</span>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export { ScreenSection, ScreenSectionList };