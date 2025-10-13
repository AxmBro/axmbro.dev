import { useNavigate } from "react-router-dom";
import { ProjectItem } from "../projects";
import styles from "../projects.module.css";
import starImage from "../../../assets/star.png";
import { Button } from "../../../components/button/button";
import { RouterLink } from "../../../components/router-link/rouer-link";

interface ProjectGridItemProps {
  items: ProjectItem[];
  hideTags?: boolean;
  showOnlyPinned?: boolean;
}

export const ProjectGridItem = ({ items, hideTags, showOnlyPinned }: ProjectGridItemProps) => {
  const navigate = useNavigate();

  const handleProjectClick = (project: ProjectItem) => {
    if (!project.url) {
      return;
    }
    navigate(`/projects/${project.url}`);
  };

  return (
    <div className={styles.ProjectGrid}>
      {items.map((item) => {
        const images = import.meta.glob('../../../assets/*.png', { eager: true });

        const imageSrc = item.imgSrc
          ? (images[`../../../assets/${item.imgSrc}.png`] as { default: string }).default
          : "";

        const logoImageSrc = item.logoSrc
          ? (images[`../../../assets/${item.logoSrc}.png`] as { default: string }).default
          : "";

        const imageAlt = item.imgSrc || "";

        return (showOnlyPinned && !item.star) ? null : (
          <div
            key={`item${item.title}`}
            className={styles.ProjectGridItem}
          >
            {item.star && (
              <div className={styles.StarContainer}>
                <img className={styles.Star} src={starImage} alt="starImg" />
              </div>
            )}
            <div onClick={() => handleProjectClick(item)} className={styles.ImageWrapperUrl}>
              {item.imgSrc && <img src={imageSrc} alt={imageAlt} className={styles.Image} />}
            </div>
            <div className={styles.Container}>
              <div>
                <div className={styles.TitleAndLogoContainer}>
                  {item.logoSrc && (
                    <div>
                      <img src={logoImageSrc} alt={item.logoSrc} />
                    </div>
                  )}
                  <div>
                    <h2
                      onClick={() => handleProjectClick(item)}
                      className={item.url ? `${styles.TitleUrl}` : ""}
                      style={{ cursor: item.url ? "pointer" : "" }}
                    >
                      {item.title}
                    </h2>
                  </div>
                </div>
                <p className={styles.Description}>{item.description}</p>
                {item.tags && !hideTags && (
                  <div className={styles.TagsContainer}>
                    {item.tags.map((tag) => (
                      <p key={`TagKey${tag}`} className={styles.Tag}>
                        {tag}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.navButtonsContainer}>
                {item.url && (
                  <RouterLink to={item.url}>
                    <Button buttonColor={"blue"} text="Showcase" />
                  </RouterLink>
                )}
                {item.downloadLink && (
                  <RouterLink to={item.downloadLink} target="_blank" rel="noopener noreferrer">
                    <Button buttonColor={"default"} text="Download" />
                  </RouterLink>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};