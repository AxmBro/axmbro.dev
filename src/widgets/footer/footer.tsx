import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { SiNextdotjs } from "react-icons/si";
import { HomeLink } from "@/shared/ui/home-link";
import { HashLink } from "@/shared/ui/hash-link";
import { ProjectsTagLink, ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import { getFooterSocialLinks, HOME_PAGE_TEXTS, NAV_LINKS, SOCIAL_LINK_BUTTONS } from "@/shared/constants/data";
import { contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { FooterSocialRow } from "./footer-social-row";
import { LocalTime } from "./local-time";
import { BackToTop } from "./back-to-top";
import styles from "./footer.module.scss";

const CATEGORY_LINKS: { label: string; tag?: string }[] = [
  { label: "View All Projects" },
  { tag: "JsonUI", label: "JsonUI & HUDs" },
  { tag: "Server Form", label: "Server Forms" },
  { tag: "Web", label: "Web Development" },
];

const MAIL_LINK = SOCIAL_LINK_BUTTONS.find((link) => link.iconId === "mail");

const LEGAL_LINKS = [
  { href: ROUTES.sitemap, label: "Sitemap" },
  { href: ROUTES.privacyPolicy, label: "Privacy Policy" },
  { href: ROUTES.termsOfUse, label: "Terms of Use" },
];

export const Footer = () => {
  const footerSocialLinks = getFooterSocialLinks();

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerScreenContainer}>
        <div className={styles.footerGrid}>
          <div className={`${styles.footerColumn} ${styles.brandColumn}`}>
            <div className={styles.brandBlock}>
              <HomeLink className={styles.logoInfo}>
                <Image
                  src="/icon192.png"
                  alt=""
                  width={32}
                  height={32}
                  className={styles.footerLogo}
                />
                <span className={styles.brandName}>AxmBro</span>
              </HomeLink>
              <p className={styles.brandDesc}>
                {HOME_PAGE_TEXTS.footer.description}
              </p>
              <LocalTime />
            </div>
            <FooterSocialRow links={footerSocialLinks} />
          </div>

          <div className={styles.footerColumn}>
            <h2 className={styles.columnTitle}>Navigation</h2>
            <nav className={styles.columnLinks}>
              {NAV_LINKS.map((link) =>
                link.href.includes("#") ? (
                  <HashLink key={link.href} href={link.href}>
                    {link.text}
                  </HashLink>
                ) : link.href === ROUTES.projects ? (
                  <ProjectsBoardLink key={link.href} tab="all">
                    {link.text}
                  </ProjectsBoardLink>
                ) : (
                  <Link key={link.href} href={link.href}>
                    {link.text}
                  </Link>
                )
              )}
              <span className={styles.navigationDivider} aria-hidden />
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <h2 className={styles.columnTitle}>Categories</h2>
            <nav className={styles.columnLinks}>
              {CATEGORY_LINKS.map((link) =>
                link.tag ? (
                  <ProjectsTagLink key={link.label} tag={link.tag}>
                    {link.label}
                  </ProjectsTagLink>
                ) : (
                  <ProjectsBoardLink key={link.label} tab="all">
                    {link.label}
                  </ProjectsBoardLink>
                )
              )}
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <h2 className={styles.columnTitle}>Contact</h2>
            <nav className={`${styles.columnLinks} ${styles.contactLinks}`}>
              <HashLink href={contactSectionHref(SECTION_IDS.startProject)}>Start a Project</HashLink>
              {MAIL_LINK && (
                <a href={MAIL_LINK.href}>{MAIL_LINK.text}</a>
              )}
              <HashLink href={contactSectionHref(SECTION_IDS.contactOptions)}>Contact Options</HashLink>
            </nav>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomBarContent}>
            <div className={styles.legalRow}>
              <HomeLink className={styles.copyrightLink}>
                <Image
                  src="/icon192.png"
                  alt=""
                  width={14}
                  height={14}
                  className={styles.footerLogoIcon}
                />
                <span>© {new Date().getFullYear()} AxmBro | All rights reserved</span>
              </HomeLink>
              <span className={styles.separator}>•</span>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.techStack}
              >
                <SiNextdotjs size={14} aria-hidden />
                <span>Built with Next.js</span>
              </a>
              <span className={styles.separator}>•</span>
              <a
                href="https://github.com/AxmBro/axmbro.dev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceLink}
              >
                <FaGithub size={14} aria-hidden />
                <span>Source Code</span>
              </a>
            </div>

            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
};
