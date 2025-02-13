import React, { ReactNode } from "react";
import "./ScreenSection.css";
import styles from "./ScreenSection.module.css";

interface ScreenSectionProp {
  noBorder?: Boolean;
  noChildrenPadding?: boolean;
  childrenTopDivider?: boolean;
  children?: ReactNode;
  title?: string;
  titleDescription?: string;
  titleClassName?: string;
  description1?: string;
  description2?: string;
  style?: React.CSSProperties;
  id?: string;
}

const ScreenSection: React.FC<ScreenSectionProp> = ({
  noBorder = false,
  noChildrenPadding = false,
  childrenTopDivider = false,
  children,
  title,
  titleDescription,
  titleClassName,
  description1,
  description2,
  style,
  id
}) => {
  return (
    <div className="ScreenSection" style={{ border: noBorder ? 0 : "", ...style }} id={id}>
      {title ? <h1 className={titleClassName}>{title}</h1> : null}
      {titleDescription ? <p className={styles.titleDescription}>{titleDescription}</p> : null}
      {description1 ? <p style={{ paddingBottom: description2 ? "1rem" : 0 }}>{description1}</p> : null}
      {description2 ? <p>{description2}</p> : null}
      <div
        style={{
          paddingTop: (noChildrenPadding ? 0 : ((children && (title || description1 || description2)) ? "2rem" : 0)),
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