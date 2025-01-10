import React, { ReactNode } from "react";
import { ScreenSection } from "../layout/screen_section";

interface ImageSectionItemsProps {
  title: string;
  description: string;
  imageSrc?: string;
}

interface ImageSectionProps {
  title: string;
  rowStyle?: boolean;
  sectionDescription: string;
  items: ImageSectionItemsProps[];
  children?: ReactNode;
  style?: React.CSSProperties;

}

const ImageSection: React.FC<ImageSectionProps> = ({ title, sectionDescription, items, rowStyle }) => {
  return (
    <ScreenSection
      style={{ padding: rowStyle ? "2rem 0 2rem 0" : "2rem 0 1rem 0" }}
      ignoreChildrenPadding={true}
      title={title}
      description1={sectionDescription}>
      <ul style={{ padding: rowStyle ? "1rem 0 0 0" : 0, margin: 0 }} className={rowStyle ? "image-section-row" : ""}>
        {items.map((item, index) => {
          const images = import.meta.glob('../../assets/*.png', { eager: true });

          const imageSrc = item.imageSrc
            ? (images[`../../assets/${item.imageSrc}.png`] as { default: string }).default
            : "";

          return <li key={`li${index}`} className="image-section" style={{ paddingTop: rowStyle ? 0 : "1rem", paddingBottom: rowStyle ? 0 : "1rem" }}>
            {!rowStyle &&
              <div>
                <h1 className="image-section-title">{`${index + 1}. ${item.title}`}</h1>
                <h2 className="image-section-description">{item.description}</h2>
              </div>}
            {item.imageSrc && <div className="image-section-img-container" style={{ paddingBottom: rowStyle ? "1rem" : 0, paddingTop: rowStyle ? 0 : "1rem" }}>
              <img src={imageSrc} alt="" className="image-section-img" />
            </div>}
            {rowStyle &&
              <div>
                <h1 className="image-section-title">{`${index + 1}. ${item.title}`}</h1>
                <h2 className="image-section-description">{item.description}</h2>
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