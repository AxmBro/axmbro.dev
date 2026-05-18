import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/shared/constants/data";
import { ScreenContainer } from "@/shared/ui/screen-container";
import { ScreenSection, ScreenSectionList } from "@/shared/ui/screen-section";
import { Button } from "@/shared/ui/button";
import { ImageSection } from "@/widgets/projects/image-section";
import { getProjectData } from "@/shared/lib/markdown";
import styles from "./page.module.scss";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const pageData = await getProjectData(projectId);
  const project = PROJECTS.find(p => p.slug === projectId);
  const title = pageData?.title || project?.title || projectId.replace(/_/g, " ");
  const description = pageData?.description || project?.description || "";
  const projectFolder = project?.slug || "thisweb";
  const imagePath = project?.image
    ? `/images/projects/${projectFolder}/${project.image}.png`
    : "/images/ui/logo192.png";

  return {
    title,
    description,
    openGraph: {
      title: `AxmBro | ${title}`,
      description,
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 675,
          alt: `${title} - Project Showcase`,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `AxmBro | ${title}`,
      description,
      images: [imagePath],
    }
  };
}

export function generateStaticParams() {
  return PROJECTS.filter(p => p.slug).map(p => ({ projectId: p.slug! }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = PROJECTS.find(p => p.slug === projectId);
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
          titleDescription={pageData.creditsDescription ?? "Key contributors and development credits for this project."}
          headingTag="h2"
        >
          <ScreenSectionList
            items={pageData.credits.map(c => {
              if (!c.href) return { name: c.role, value: c.name };
              const isExternal = c.href.startsWith("http");
              return {
                name: c.role,
                value: isExternal ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className={styles.creditLink}>{c.name}</a>
                ) : (
                  <Link href={c.href} className={styles.creditLink}>{c.name}</Link>
                )
              };
            })}
          />
        </ScreenSection>
      )}

      {pageData?.videos?.map((video, i) => (
        <ScreenSection key={`video-${i}`} title={video.title} titleDescription={video.description} headingTag="h2">
          <div className={styles.iframeContainer}>
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
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

