import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/shared/constants/data";
import { getProjectThumbnailSrc } from "@/entities/project";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection, ScreenSectionList } from "@/shared/ui/screen-section";
import { Button, buttonVariantForIndex } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { ImageSection } from "@/entities/project";
import { getProjectData } from "@/shared/lib/markdown";
import { contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import styles from "./page.module.scss";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const pageData = await getProjectData(projectId);
  const project = PROJECTS.find((p) => p.url === projectId);
  const title = pageData?.title || project?.title || projectId.replace(/_/g, " ");
  const description = pageData?.description || project?.description;
  const thumbnail = project ? getProjectThumbnailSrc(project) : null;

  return {
    title,
    description,
    openGraph: {
      title: `AxmBro.dev | ${title}`,
      description,
      images: thumbnail
        ? [{ url: thumbnail, width: 1280, height: 720, alt: title }]
        : ["/images/ui/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `AxmBro.dev | ${title}`,
      description,
      images: thumbnail ? [thumbnail] : ["/images/ui/og-image.png"],
    },
  };
}

export function generateStaticParams() {
  return PROJECTS.filter(p => p.url).map(p => ({ projectId: p.url! }));
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
              {trimmed}
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

  return (
    <ScreenContainer>
      <ScreenSection
        eyebrow="Project"
        title={pageData?.title || project.title}
        headingLevel="h1"
        titleDescription={renderDescription(description)}
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

      {pageData?.credits && pageData.credits.length > 0 && (
        <ScreenSection
          eyebrow="Credits"
          title="Information"
          titleDescription={pageData.creditsDescription ?? "People involved in creating this project."}
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
        </ScreenSection>
      )}

      {pageData?.videos?.map((video, i) => (
        <ScreenSection
          key={`video-${i}`}
          eyebrow="Media"
          title={video.title}
          titleDescription={video.description}
        >
          <div className={styles.iframeContainer}>
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </ScreenSection>
      ))}

      {pageData?.imageSections?.map((section, i) => (
        <ImageSection
          key={`section-${i}`}
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

