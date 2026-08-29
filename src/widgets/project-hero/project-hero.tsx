import Image from "next/image";
import type { ProjectAction } from "@/entities/project";
import {
  ProjectAccentTitle,
  ProjectContentReveal,
} from "@/entities/project";
import {
  PROJECT_CONTENT_DELAY,
  projectAccentDelayHeroTitle,
  RevealHeroMedia,
} from "@/shared/ui/motion";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import styles from "./project-hero.module.scss";

interface ProjectHeroProps {
  title: string;
  description: string;
  imageSrc: string | null;
  accentColor?: string;
  action?: ProjectAction;
}

export function ProjectHero({
  title,
  description,
  imageSrc,
  accentColor,
  action,
}: ProjectHeroProps) {
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
      <ProjectContentReveal className={styles.inner} trigger="mount" delay={PROJECT_CONTENT_DELAY}>
        {accentColor ? (
          <ProjectAccentTitle
            as="h1"
            accentColor={accentColor}
            className={styles.title}
            startWhen="delay"
            delay={projectAccentDelayHeroTitle()}
          >
            {title}
          </ProjectAccentTitle>
        ) : (
          <h1 className={styles.title}>{title}</h1>
        )}
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
      </ProjectContentReveal>
    </header>
  );
}
