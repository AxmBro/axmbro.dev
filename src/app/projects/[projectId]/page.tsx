import { notFound } from "next/navigation";
import { PROJECTS } from "@/shared/constants/data";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection, ScreenSectionList } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { ImageSection } from "@/entities/project";
import { getProjectData } from "@/shared/lib/markdown";
import styles from "./page.module.scss";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const pageData = await getProjectData(projectId);
  const project = PROJECTS.find(p => p.url === projectId);
  return {
    title: pageData?.title || project?.title || projectId.replace(/_/g, " "),
    description: pageData?.description || project?.description
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
  buttonsToRender.push({
    text: "Contact",
    href: "/contact",
    isLink: true,
  });

  return (
    <ScreenContainer>
      <ScreenSection
        title={pageData?.title || project.title}
        headingLevel="h1"
        titleDescription={renderDescription(description)}
      >
        <div className={styles.buttons}>
          {buttonsToRender.map((btn, i) => {
            const variant = i === 0 ? "primary" : "secondary";
            return (
              <Button 
                key={`btn-${i}`} 
                text={btn.text} 
                variant={variant} 
                href={btn.href} 
                external={btn.external} 
              />
            );
          })}
        </div>
      </ScreenSection>

      {pageData?.credits && pageData.credits.length > 0 && (
        <ScreenSection
          title="Information"
          titleDescription={pageData.creditsDescription ?? "People involved in creating this project."}
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
        <ScreenSection key={`video-${i}`} title={video.title} titleDescription={video.description}>
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
        <ScreenSection titleDescription="Full project showcase coming soon." />
      )}
    </ScreenContainer>
  );
}

