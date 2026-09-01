import { Children, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import { getFeaturedProjects, getProjectTypeLabel, PROJECTS, CTA_LABELS } from "@/shared/constants/data";
import {
  commissionFaqItemHref,
  commissionSectionHref,
  contactFormHref,
  contactSectionHref,
  homeSectionHref,
  SECTION_IDS,
} from "@/shared/constants/anchors";
import { projectDetailPath, ROUTES } from "@/shared/constants/routes";
import { HashLink } from "@/shared/ui/hash-link";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import styles from "./sitemap-grid.module.scss";

const SitemapColumn = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className={styles.column}>
    <h2 className={styles.title}>{title}</h2>
    <nav className={styles.linksNav} aria-label={title}>
      <ul className={styles.links}>
        {Children.toArray(children).map((child) => (
          <li key={(child as ReactElement).key ?? String(child)}>{child}</li>
        ))}
      </ul>
    </nav>
  </div>
);

export const SitemapGrid = () => (
  <div className={styles.grid}>
    <SitemapColumn title="Main Pages">
      <Link href={ROUTES.home}>Home</Link>
      <ProjectsBoardLink tab="all">Projects</ProjectsBoardLink>
      <Link href={ROUTES.commissions}>Commissions</Link>
      <Link href={ROUTES.contact}>Contact</Link>
      <Link href={ROUTES.sitemap}>Sitemap</Link>
    </SitemapColumn>

    <SitemapColumn title="Homepage Sections">
      <HashLink href={homeSectionHref(SECTION_IDS.profile)}>About</HashLink>
      <HashLink href={homeSectionHref(SECTION_IDS.trackRecord)}>Track Record</HashLink>
      <HashLink href={homeSectionHref(SECTION_IDS.selectedWork)}>Selected Projects</HashLink>
      <HashLink href={homeSectionHref(SECTION_IDS.experience)}>Experience</HashLink>
      <HashLink href={homeSectionHref(SECTION_IDS.skills)}>Skills</HashLink>
      <HashLink href={homeSectionHref(SECTION_IDS.workWithMe)}>Work With Me</HashLink>
    </SitemapColumn>

    <SitemapColumn title="Project Views">
      <ProjectsBoardLink tab="all">All Projects</ProjectsBoardLink>
      <ProjectsBoardLink tab="featured">Featured Projects</ProjectsBoardLink>
      <ProjectsBoardLink tab="personal">Personal Projects</ProjectsBoardLink>
      <ProjectsBoardLink tab="commissions">Client Work</ProjectsBoardLink>
    </SitemapColumn>

    <SitemapColumn title="Featured Projects">
      {getFeaturedProjects().map((project) =>
        project.url ? (
          <Link key={project.url} href={projectDetailPath(project.url)}>
            {project.title}
          </Link>
        ) : null
      )}
    </SitemapColumn>

    <SitemapColumn title="Commission Guide">
      <Link href={ROUTES.commissions}>Commissions</Link>
      <HashLink href={commissionSectionHref(SECTION_IDS.commissionClients)}>
        Selected Clients
      </HashLink>
      <HashLink href={commissionSectionHref(SECTION_IDS.commissionServices)}>
        What I Build
      </HashLink>
      <HashLink href={commissionSectionHref(SECTION_IDS.commissionRequirements)}>
        What I Need From You
      </HashLink>
      <HashLink href={commissionSectionHref(SECTION_IDS.commissionProcess)}>
        Commission Process
      </HashLink>
      <HashLink href={commissionSectionHref(SECTION_IDS.commissionDelivery)}>
        Delivery & Support
      </HashLink>
      <HashLink href={commissionSectionHref(SECTION_IDS.commissionFaq)}>
        Commission FAQ
      </HashLink>
      <HashLink href={commissionFaqItemHref("pricing")}>Pricing FAQ</HashLink>
      <HashLink href={commissionFaqItemHref("revisions")}>Revisions FAQ</HashLink>
      <HashLink href={commissionFaqItemHref("payments")}>Payments FAQ</HashLink>
      <HashLink href={commissionFaqItemHref("nda")}>NDA FAQ</HashLink>
      <HashLink href={commissionFaqItemHref("turnaround")}>Turnaround FAQ</HashLink>
      <HashLink href={commissionFaqItemHref("support")}>Support FAQ</HashLink>
      <HashLink href={commissionFaqItemHref("availability")}>Availability FAQ</HashLink>
    </SitemapColumn>

    <SitemapColumn title="Contact & Legal">
      <Link href={contactFormHref()}>{CTA_LABELS.contactForm}</Link>
      <HashLink href={contactSectionHref(SECTION_IDS.contactOptions)}>
        {CTA_LABELS.contactOptions}
      </HashLink>
      <HashLink href={contactSectionHref(SECTION_IDS.quickQuestions)}>Quick Questions</HashLink>
      <Link href={ROUTES.privacyPolicy}>Privacy Policy</Link>
      <Link href={ROUTES.termsOfUse}>Terms of Use</Link>
    </SitemapColumn>
  </div>
);

export const SitemapProjectList = () => (
  <ul className={styles.projectList}>
    {PROJECTS.map((project) => {
      const projectType = getProjectTypeLabel(project);
      const href = project.url
        ? projectDetailPath(project.url)
        : ROUTES.home;

      return (
        <li key={project.url ?? project.title}>
          <Link href={href} className={styles.projectItem}>
            <span className={styles.projectName}>{project.title}</span>
            <span className={styles.projectType}>{projectType}</span>
          </Link>
        </li>
      );
    })}
  </ul>
);
