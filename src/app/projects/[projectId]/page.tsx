import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, CTA_LABELS } from "@/shared/constants/data";
import { getProjectThumbnailSrc, ImageSection, ProjectTags, formatProjectDate } from "@/entities/project";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection, ScreenSectionList } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import { getProjectData } from "@/shared/lib/markdown";
import { renderInlineMdLinks } from "@/shared/lib/render-inline-md-links";
import { slugifySectionId } from "@/shared/lib/slugify-section-id";
import { contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { projectDetailPath } from "@/shared/constants/routes";
import { createPageMetadata } from "@/shared/lib/page-metadata";
import { ProjectToc, type ProjectTocItem } from "@/widgets/project-toc";
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
  return PROJECTS.filter(p => p.url).map(p => ({ projectId: p.url! }));
}

function uniqueSectionId(base: string, used: Set<string>): string {
  let id = base || "section";
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = PROJECTS.find(p => p.url === projectId);
  if (!project) notFound();

  const pageData = await getProjectData(projectId);
  const description = pageData?.content?.trim() || pageData?.description?.trim() || project.description;

  const renderDescription = (text: string) => {
    if (!text) return null;
    const paragraphs = text.split(/\r?\n\r?\n/);
    return (
      <div className={styles.descriptionWrapper}>
        {paragraphs.map((para, idx) => {
          const trimmed = para.trim();
          if (!trimmed) return null;
          return (
            <p key={idx} className={styles.descriptionParagraph}>
              {renderInlineMdLinks(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  const buttonsToRender = [];
  if (project.downloadLink) {
    buttonsToRender.push({
      text: "Download",
      href: project.downloadLink,
      external: true,
    });
  }
  if (pageData?.extraButtons) {
    pageData.extraButtons.forEach((btn) => {
      buttonsToRender.push({
        text: btn.text,
        href: btn.href,
        external: btn.external,
      });
    });
  }
  const showCommissionCta =
    project.type === "commissions" ||
    project.tags?.some((tag) => tag === "JsonUI" || tag === "Server Form");

  buttonsToRender.push({
    text: showCommissionCta ? "Request Similar Work" : "Start a Project",
    href: contactSectionHref(SECTION_IDS.startProject),
  });

  const usedIds = new Set<string>();
  const tocItems: ProjectTocItem[] = [];

  const overviewId = uniqueSectionId(SECTION_IDS.projectOverview, usedIds);
  tocItems.push({
    id: overviewId,
    label: "Overview",
  });

  const creditsId = pageData?.credits?.length
    ? uniqueSectionId(SECTION_IDS.projectCredits, usedIds)
    : null;
  if (creditsId) {
    tocItems.push({ id: creditsId, label: "Credits" });
  }

  const videoIds =
    pageData?.videos?.map((video, i) =>
      uniqueSectionId(
        i === 0 ? SECTION_IDS.projectShowcase : slugifySectionId(video.title),
        usedIds,
      ),
    ) ?? [];

  if (videoIds.length > 0) {
    tocItems.push({
      id: videoIds[0],
      label: "Videos",
      watchIds: videoIds,
    });
  }

  const galleryIds =
    pageData?.imageSections?.map((section, i) => {
      const id = uniqueSectionId(slugifySectionId(section.title), usedIds);
      tocItems.push({
        id,
        label: section.title.trim() || `Section ${i + 1}`,
      });
      return id;
    }) ?? [];

  return (
    <ScreenContainer>
      <ScreenSection
        id={overviewId}
        eyebrow="Project"
        title={
          <div className={styles.overviewTitleRow}>
            <div>{pageData?.title || project.title}</div>
            {project.date && <div className={styles.overviewDate}>{formatProjectDate(project)}</div>}
          </div>
        }
        headingLevel="h1"
        titleDescription={
          <div>
            <ProjectTags project={project} className={styles.overviewTags} />
            {renderDescription(description)}
          </div>
        }
      >
        <ButtonGroup>
          {buttonsToRender.map((btn, i) => (
              <Button
                key={`btn-${i}`}
                text={btn.text}
                variant={buttonVariantForIndex(i)}
                href={btn.href}
                external={btn.external}
              />
            ))}
        </ButtonGroup>
      </ScreenSection>

      <ProjectToc items={tocItems} />

      {pageData?.credits && pageData.credits.length > 0 && creditsId && (
        <ScreenSection
          id={creditsId}
          eyebrow="Credits"
          title="Information"
          titleDescription={
            pageData.creditsDescription ?? "People involved in creating this project."
          }
          tightChildrenGap
        >
          <ScreenSectionList
            items={pageData.credits.map(c => ({
              name: c.role,
              value: c.href
                ? <a href={c.href} target="_blank" rel="noopener noreferrer" className={styles.creditLink}>{c.name}</a>
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
        >
          <div className={styles.iframeContainer}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
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
        <ScreenSection eyebrow="Status" titleDescription="Full project showcase coming soon." />
      )}
    </ScreenContainer>
  );
}
