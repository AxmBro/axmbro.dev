import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, CTA_LABELS, PROJECT_PAGE_TEXTS } from "@/shared/constants/data";
import { projectDetailPath, ROUTES } from "@/shared/constants/routes";
import {
  buildProjectActions,
  formatProjectDate,
  getProjectHeroSrc,
  getProjectThumbnailSrc,
  ImageSection,
  ProjectDescription,
  ProjectTags,
} from "@/entities/project";
import { getProjectData } from "@/entities/project/server";
import { YoutubeEmbed } from "@/entities/youtube";
import { buildBreadcrumbJsonLd, buildProjectJsonLd, JsonLd } from "@/shared/lib/json-ld";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import { Reveal } from "@/shared/ui/motion";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection, ScreenSectionList } from "@/shared/ui/screen-section";
import { ProjectHero } from "@/widgets/project-hero";
import { ProjectToc, buildProjectPageSections } from "@/widgets/project-toc";
import styles from "./page.module.scss";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = PROJECTS.find((p) => p.url === projectId);
  if (!project) notFound();

  const pageData = await getProjectData(projectId);
  const title = pageData?.title || project.title;
  const description = pageData?.description || project.description;
  const thumbnail = getProjectThumbnailSrc(project);

  return createPageMetadata({
    title,
    description,
    path: projectDetailPath(projectId),
    openGraphType: "article",
    images: thumbnail
      ? [{ url: thumbnail, width: 1280, height: 720, alt: `${title} project preview` }]
      : undefined,
    imageAlt: `${title} project preview`,
  });
}

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.url).map((p) => ({ projectId: p.url! }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = PROJECTS.find((p) => p.url === projectId);
  if (!project) notFound();

  const pageData = await getProjectData(projectId);
  const title = pageData?.title || project.title;
  const metaDescription = pageData?.description || project.description;
  const description = pageData?.content?.trim() || pageData?.description?.trim() || project.description;
  const buttonsToRender = buildProjectActions(project, pageData);
  const heroSrc = getProjectHeroSrc(project);
  const [heroAction, ...sectionButtons] = buttonsToRender;
  const { overviewId, creditsId, videoIds, galleryIds, tocItems } =
    buildProjectPageSections(pageData);

  return (
    <>
      <JsonLd
        data={buildProjectJsonLd({
          title,
          description: metaDescription,
          path: projectDetailPath(projectId),
          image: heroSrc ?? getProjectThumbnailSrc(project),
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: ROUTES.home },
          { name: "Projects", path: ROUTES.projects },
          { name: title, path: projectDetailPath(projectId) },
        ])}
      />
      <ProjectHero
        title={title}
        description={project.description}
        imageSrc={heroSrc}
        accentColor={project.accentColor}
        action={heroAction}
      />
      <ScreenContainer withGridBackdrop={false}>
        <Reveal>
          <ScreenSection
            id={overviewId}
            eyebrow="Project"
            title="Overview"
            titleMeta={
              project.date ? (
                <span className={styles.overviewDate}>{formatProjectDate(project)}</span>
              ) : undefined
            }
            titleDescription={
              <div>
                <ProjectTags project={project} className={styles.overviewTags} />
                <ProjectDescription text={description} />
              </div>
            }
            variant="default"
          >
            {sectionButtons.length > 0 && (
              <ButtonGroup>
                {sectionButtons.map((btn, i) => (
                  <Button
                    key={`btn-${i}`}
                    text={btn.text}
                    variant={buttonVariantForIndex(i)}
                    href={btn.href}
                    external={btn.external}
                  />
                ))}
              </ButtonGroup>
            )}
          </ScreenSection>
        </Reveal>

        <ProjectToc items={tocItems} />

        {pageData?.credits && pageData.credits.length > 0 && creditsId && (
          <Reveal>
            <ScreenSection
              id={creditsId}
              eyebrow="Credits"
              title="Credits"
              titleDescription={
                pageData.creditsDescription ?? PROJECT_PAGE_TEXTS.creditsDefaultDescription
              }
              variant="default"
            >
              <ScreenSectionList
                items={pageData.credits.map((c) => ({
                  name: c.role,
                  value: c.href
                    ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.creditLink}
                      >
                        {c.name}
                      </a>
                    )
                    : c.name,
                }))}
              />
              {project.type === "commissions" && (
                <p className={styles.relatedWork}>
                  <ProjectsBoardLink tab="commissions">
                    {CTA_LABELS.browseClientWork}
                  </ProjectsBoardLink>
                  {" for more commissioned JsonUI."}
                </p>
              )}
            </ScreenSection>
          </Reveal>
        )}

        {pageData?.videos?.map((video, i) => (
          <Reveal key={`video-${i}`}>
            <ScreenSection
              id={videoIds[i]}
              eyebrow="Media"
              title={video.title}
              titleDescription={video.description}
              variant="default"
            >
              <YoutubeEmbed youtubeId={video.youtubeId} title={video.title} />
            </ScreenSection>
          </Reveal>
        ))}

        {pageData?.imageSections?.map((section, i) => (
          <Reveal key={`section-${i}`}>
            <ImageSection
              id={galleryIds[i]}
              title={section.title}
              sectionDescription={section.description}
              items={section.items}
              rowStyle={section.rowStyle}
              projectId={projectId}
            />
          </Reveal>
        ))}

        {!pageData && (
          <Reveal>
            <ScreenSection
              eyebrow={PROJECT_PAGE_TEXTS.comingSoon.eyebrow}
              title={PROJECT_PAGE_TEXTS.comingSoon.title}
              titleDescription={PROJECT_PAGE_TEXTS.comingSoon.description}
              variant="default"
            />
          </Reveal>
        )}
      </ScreenContainer>
    </>
  );
}
