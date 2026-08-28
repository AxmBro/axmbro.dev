import { InlineMdLinks } from "./inline-md-links";
import styles from "./project-description.module.scss";

interface ProjectDescriptionProps {
  text: string;
}

export function ProjectDescription({ text }: ProjectDescriptionProps) {
  if (!text) return null;

  const paragraphs = text.split(/\r?\n\r?\n/);

  return (
    <div className={styles.wrapper}>
      {paragraphs.map((para, idx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;
        return (
          <p key={idx} className={styles.paragraph}>
            <InlineMdLinks text={trimmed} />
          </p>
        );
      })}
    </div>
  );
}
