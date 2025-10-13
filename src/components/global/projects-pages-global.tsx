import { ReactNode } from "react";
import { ScreenSection } from "../layout/screen-section";

interface ImageSectionItemsProps {
  title: string;
  description: string;
  imageSrc?: string;
}

interface ImageSectionProps {
  title: string;
  childrenTopDividerInside?: boolean;
  rowStyle?: boolean;
  sectionDescription: string;
  items: ImageSectionItemsProps[];
  children?: ReactNode;
  style?: React.CSSProperties;
  noBorder?: boolean;
}

const ImageSection = ({ title, sectionDescription, items, rowStyle, noBorder = false}: ImageSectionProps) => {
  return (
    <ScreenSection
      style={{ padding: rowStyle ? "3rem 0 3rem 0" : "3rem 0 2rem 0" }}
      noChildrenPadding={true}
      title={title}
      noBorder={noBorder}
      description1={sectionDescription}>
      <ul style={{ padding: rowStyle ? "1rem 0 0 0" : 0, margin: 0, marginTop: "1rem" }} className={rowStyle ? "image-section-row" : ""}>
        {items.map((item, index) => {
          const images = import.meta.glob('../../assets/*.png', { eager: true });

          const imageSrc = item.imageSrc
            ? (images[`../../assets/${item.imageSrc}.png`] as { default: string }).default
            : "";

          return <li key={`li${index}`} className="image-section" style={{ paddingTop: rowStyle ? 0 : "1rem", paddingBottom: rowStyle ? 0 : "2rem" }}>
            {!rowStyle &&
              <div>
                <h2 className="image-section-title">{`${index + 1}. ${item.title}`}</h2>
                <p>{item.description}</p>
              </div>}
            {item.imageSrc && <div className="image-section-img-container" style={{ paddingBottom: rowStyle ? "1rem" : 0, paddingTop: rowStyle ? 0 : "1rem" }}>
              <img src={imageSrc} alt="" className="image-section-img" />
            </div>}
            {rowStyle &&
              <div>
                <h1 className="image-section-title">{`${index + 1}. ${item.title}`}</h1>
                <p>{item.description}</p>
              </div>}
          </li>
        })}
      </ul>
    </ScreenSection>
  );
}

export { ImageSection };