import Image from "next/image";
import type { ProjectAction } from "@/entities/project";
import { RevealHeroMedia } from "@/shared/ui/motion";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectHeroContentReveal } from "./project-hero-content-reveal";
import styles from "./project-hero.module.scss";

interface ProjectHeroProps {
  title: string;
  description: string;
  imageSrc: string | null;
  action?: ProjectAction;
}

export function ProjectHero({ title, description, imageSrc, action }: ProjectHeroProps) {
  return (
    <header className={styles.hero}>
      {imageSrc && (
        <RevealHeroMedia className={styles.media}>
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
          <div className={styles.scrim} />
        </RevealHeroMedia>
      )}
      <ProjectHeroContentReveal className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        {action && (
          <ButtonGroup marginTop className={styles.cta}>
            <Button
              text={action.text}
              variant="neutral"
              href={action.href}
              external={action.external}
            />
          </ButtonGroup>
        )}
      </ProjectHeroContentReveal>
    </header>
  );
}
