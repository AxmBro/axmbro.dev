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
    >
      <ul className={rowStyle ? styles.gridList : styles.stackList}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item.imageSrc && (
              <div className={styles.imgWrapper}>
                <Image
                  src={`/images/projects/${projectId}/${item.imageSrc}.png`}
                  alt={item.title}
                  className={styles.img}
                  width={1280}
                  height={720}
                />
              </div>
            )}
            <div className={styles.textContent}>
              <h2 className={styles.itemTitle}>{`${index + 1}. ${item.title}`}</h2>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </ScreenSection>
  );
};
