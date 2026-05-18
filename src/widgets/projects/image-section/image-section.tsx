import Image from "next/image";
import { ScreenSection } from "@/shared/ui/screen-section";
import styles from "./image-section.module.scss";

interface ImageSectionItem {
  title: string;
  description: string;
  imageSrc?: string;
}

interface ImageSectionProps {
  title: string;
  sectionDescription: string;
  items: ImageSectionItem[];
  rowStyle?: boolean;
  projectId: string;
}

export const ImageSection = ({ title, sectionDescription, items, rowStyle, projectId }: ImageSectionProps) => {
  return (
    <ScreenSection 
      title={title} 
      titleDescription={sectionDescription}
      withChildrenPadding={rowStyle ? true : false}
      headingTag="h2"
    >
      <ul className={rowStyle ? styles.gridList : styles.stackList}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item.imageSrc && (
              <div className={styles.imgWrapper} style={{ position: "relative" }}>
                <Image
                  src={`/images/projects/${projectId}/${item.imageSrc}.png`}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className={styles.img}
                  loading="lazy"
                  unoptimized
                />
              </div>
            )}
            <h2 className={styles.itemTitle}>{`${index + 1}. ${item.title}`}</h2>
            <p className={styles.itemDesc}>{item.description}</p>
          </li>
        ))}
      </ul>
    </ScreenSection>
  );
};
