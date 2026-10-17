import { Children, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import {
  COMMISSIONS_PAGE_TEXTS,
  CTA_LABELS,
  HOME_PAGE_TEXTS,
  NAV_LINKS,
  PROJECTS,
  SITEMAP_PAGE_TEXTS,
  getFeaturedProjects,
  getProjectTypeLabel,
} from "@/shared/constants/data";
import { PRIVACY_POLICY_PAGE, TERMS_OF_USE_PAGE } from "@/shared/constants/legal";
import {
  commissionFaqItemHref,
  commissionSectionHref,
  contactFormHref,
  contactSectionHref,
  homeSectionHref,
  SECTION_IDS,
} from "@/shared/constants/anchors";
import { projectDetailPath, ROUTES } from "@/shared/constants/routes";
import { PROJECTS_BOARD_TABS } from "@/shared/lib/projects-board-state";
import { HashLink } from "@/shared/ui/hash-link";
import { NavRouteLink } from "@/shared/ui/nav-route-link";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import styles from "./sitemap-grid.module.scss";

const { columns } = SITEMAP_PAGE_TEXTS;

const HOME_SECTION_LINKS = [
  { id: SECTION_IDS.profile, label: HOME_PAGE_TEXTS.hero.eyebrow },
  { id: SECTION_IDS.selectedWork, label: HOME_PAGE_TEXTS.selectedWork.title },
  { id: SECTION_IDS.trackRecord, label: HOME_PAGE_TEXTS.trackRecord.title },
  { id: SECTION_IDS.experience, label: HOME_PAGE_TEXTS.experience.title },
  { id: SECTION_IDS.skills, label: HOME_PAGE_TEXTS.skills.title },
  { id: SECTION_IDS.workWithMe, label: HOME_PAGE_TEXTS.workWithMe.title },
];

const COMMISSION_SECTION_LINKS = [
  { id: SECTION_IDS.commissionClients, label: SITEMAP_PAGE_TEXTS.selectedClients },
  { id: SECTION_IDS.commissionServices, label: COMMISSIONS_PAGE_TEXTS.servicesTitle },
  { id: SECTION_IDS.commissionRequirements, label: COMMISSIONS_PAGE_TEXTS.requirementsTitle },
  { id: SECTION_IDS.commissionProcess, label: COMMISSIONS_PAGE_TEXTS.processTitle },
  { id: SECTION_IDS.commissionDelivery, label: COMMISSIONS_PAGE_TEXTS.deliveryTitle },
  { id: SECTION_IDS.commissionFaq, label: COMMISSIONS_PAGE_TEXTS.faqTitle },
];

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
    <SitemapColumn title={columns.mainPages}>
      {NAV_LINKS.map((link) => (
        <NavRouteLink key={link.href} href={link.href}>
          {link.text}
        </NavRouteLink>
      ))}
      <Link href={ROUTES.sitemap}>{SITEMAP_PAGE_TEXTS.title}</Link>
    </SitemapColumn>

    <SitemapColumn title={columns.homeSections}>
      {HOME_SECTION_LINKS.map((link) => (
        <HashLink key={link.id} href={homeSectionHref(link.id)}>
          {link.label}
        </HashLink>
      ))}
    </SitemapColumn>

    <SitemapColumn title={columns.projectViews}>
      {PROJECTS_BOARD_TABS.map((tab) => (
        <ProjectsBoardLink key={tab} tab={tab}>
          {SITEMAP_PAGE_TEXTS.projectViews[tab]}
        </ProjectsBoardLink>
      ))}
    </SitemapColumn>

    <SitemapColumn title={columns.featuredProjects}>
      {getFeaturedProjects().map((project) =>
        project.url ? (
          <Link key={project.url} href={projectDetailPath(project.url)}>
            {project.title}
          </Link>
        ) : null
      )}
    </SitemapColumn>

    <SitemapColumn title={columns.commissionGuide}>
      <Link href={ROUTES.commissions}>{CTA_LABELS.commissions}</Link>
      {COMMISSION_SECTION_LINKS.map((link) => (
        <HashLink key={link.id} href={commissionSectionHref(link.id)}>
          {link.label}
        </HashLink>
      ))}
      {SITEMAP_PAGE_TEXTS.commissionFaqLinks.map((link) => (
        <HashLink key={link.slug} href={commissionFaqItemHref(link.slug)}>
          {link.label}
        </HashLink>
      ))}
    </SitemapColumn>

    <SitemapColumn title={columns.contactLegal}>
      <Link href={contactFormHref()}>{CTA_LABELS.contactForm}</Link>
      <HashLink href={contactSectionHref(SECTION_IDS.contactOptions)}>
        {CTA_LABELS.contactOptions}
      </HashLink>
      <HashLink href={contactSectionHref(SECTION_IDS.quickQuestions)}>
        {HOME_PAGE_TEXTS.contactPage.quickQuestionsTitle}
      </HashLink>
      <Link href={ROUTES.privacyPolicy}>{PRIVACY_POLICY_PAGE.title}</Link>
      <Link href={ROUTES.termsOfUse}>{TERMS_OF_USE_PAGE.title}</Link>
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
