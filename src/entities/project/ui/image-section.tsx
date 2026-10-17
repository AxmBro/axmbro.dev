import Image from "next/image";
import { BREAKPOINT_MD_PX } from "@/shared/constants/breakpoints";
import { PROJECT_PAGE_TEXTS } from "@/shared/constants/data";
import { ScreenSection } from "@/shared/ui/screen-section";
import { getProjectImageSrc } from "../lib/get-project-thumbnail";
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
  id?: string;
}

export const ImageSection = ({ title, sectionDescription, items, rowStyle, projectId, id }: ImageSectionProps) => {
  return (
    <ScreenSection
      id={id}
      eyebrow={PROJECT_PAGE_TEXTS.showcaseEyebrow}
      title={title}
      titleDescription={sectionDescription}
      withChildrenPadding={Boolean(rowStyle)}
      variant="default"
    >
      <ul className={rowStyle ? styles.gridList : styles.stackList}>
        {items.map((item, index) => (
          <li key={index} className={styles.item} data-image-section-item>
            {item.imageSrc && (
              <div className={styles.imgWrapper}>
                <Image
                  src={getProjectImageSrc(projectId, item.imageSrc)}
                  alt={item.title}
                  className={styles.img}
                  width={1280}
                  height={720}
                  sizes={
                    rowStyle
                      ? `(max-width: ${BREAKPOINT_MD_PX}px) 100vw, 480px`
                      : "(max-width: 1024px) 100vw, 1024px"
                  }
                />
              </div>
            )}
            <div className={styles.textContent}>
              <h3 className={styles.itemTitle}>{`${index + 1}. ${item.title}`}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </ScreenSection>
  );
};
