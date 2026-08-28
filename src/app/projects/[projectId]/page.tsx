import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, CTA_LABELS } from "@/shared/constants/data";
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
  const description = pageData?.content?.trim() || pageData?.description?.trim() || project.description;
  const buttonsToRender = buildProjectActions(project, pageData);
  const title = pageData?.title || project.title;
  const heroSrc = getProjectHeroSrc(project);
  const [heroAction, ...sectionButtons] = buttonsToRender;
  const { overviewId, creditsId, videoIds, galleryIds, tocItems } =
    buildProjectPageSections(pageData);

  return (
    <>
      <JsonLd
        data={buildProjectJsonLd({
          title,
          description: project.description,
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
        action={heroAction}
      />
      <ScreenContainer withGridBackdrop={false}>
        <ScreenSection
          id={overviewId}
          eyebrow="Project"
          title={
            <div className={styles.overviewTitleRow}>
              <div>Overview</div>
              {project.date && <div className={styles.overviewDate}>{formatProjectDate(project)}</div>}
            </div>
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

        <ProjectToc items={tocItems} />

        {pageData?.credits && pageData.credits.length > 0 && creditsId && (
          <ScreenSection
            id={creditsId}
            eyebrow="Credits"
            title="Credits"
            titleDescription={
              pageData.creditsDescription ?? "People involved in creating this project."
            }
            tightChildrenGap
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
        )}

        {pageData?.videos?.map((video, i) => (
          <ScreenSection
            key={`video-${i}`}
            id={videoIds[i]}
            eyebrow="Media"
            title={video.title}
            titleDescription={video.description}
            variant="default"
          >
            <YoutubeEmbed youtubeId={video.youtubeId} title={video.title} />
          </ScreenSection>
        ))}

        {pageData?.imageSections?.map((section, i) => (
          <ImageSection
            key={`section-${i}`}
            id={galleryIds[i]}
            title={section.title}
            sectionDescription={section.description}
            items={section.items}
            rowStyle={section.rowStyle}
            projectId={projectId}
          />
        ))}

        {!pageData && (
          <ScreenSection eyebrow="Status" titleDescription="Full project showcase coming soon." variant="default" />
        )}
      </ScreenContainer>
    </>
  );
}
