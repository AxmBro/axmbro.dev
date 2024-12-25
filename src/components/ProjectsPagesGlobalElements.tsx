import React, { ReactNode } from "react";
import "./ScreenSection.css";
import { ScreenSection } from "./ScreenSection";

interface ImageSectionItemsProps {
  title: string;
  description: string;
  imageSrc?: string;
}

interface ImageSectionProps {
  title: string;
  sectionDescription: string;
  items: ImageSectionItemsProps[];
  children?: ReactNode;
  style?: React.CSSProperties;

}

const ImageSection: React.FC<ImageSectionProps> = ({ title, sectionDescription, items }) => {
  return (
    <ScreenSection
      ignoreChildrenPadding={true}
      title={title}
      description1={sectionDescription}>
      <ul style={{ padding: 0, margin: 0 }}>
        {items.map((item, index) => {
          return <li key={`li${index}`} className="image-section">
            <h1 className="image-section-title">{item.title}</h1>
            <h2 className="image-section-description">{item.description}</h2>
            {item.imageSrc && <div className="image-section-img-container">
              <img src={require(`../assets/${item.imageSrc}.png`)} alt="" className="image-section-img" />
            </div>}
          </li>
        })}
      </ul>
    </ScreenSection>
  );
}

// interface ScreenSectionProp {
//   ignoreChildrenPadding?: boolean;
//   children?: ReactNode;
//   title?: string
//   description1?: string
//   description2?: string
//   style?: React.CSSProperties;
// }

// const ScreenSection: React.FC<ScreenSectionProp> = ({
//   ignoreChildrenPadding = false,
//   children,
//   title,
//   description1,
//   description2,
//   style
// }) => {
//   return (
//     <div className="ScreenSection" style={style}>
//       {title ? <h1>{title}</h1> : null}
//       {description1 ? <h2 style={{ paddingBottom: description2 ? "1rem" : 0 }}>{description1}</h2> : null}
//       {description2 ? <h2>{description2}</h2> : null}
//       <div
//         style={{
//           paddingTop: (ignoreChildrenPadding ? 0 : ((children && (title || description1 || description2)) ? "1rem" : 0))
//         }}>
//         {children}
//       </div>
//     </div>
//   )
// }

// interface ScreenSectionListProps {
//   title?: string
//   items: { name: string, value: string }[]
//   style?: React.CSSProperties;
// }

// const ScreenSectionList: React.FC<ScreenSectionListProps> = ({
//   title,
//   items,
//   style
// }) => {
//   return (
//     <div className="ScreenSectionList" style={style}>
//       {title ? <h1>{title}</h1> : null}
//       <ul>
//         {items.map((item, index) => {
//           return <li key={`li${index}`}>{item.name}: <span key={`span${index}`}>{item.value}</span></li>
//         })}
//       </ul>
//     </div>
//   )
// }

export { ImageSection };