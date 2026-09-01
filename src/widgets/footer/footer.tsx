import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { SiNextdotjs } from "react-icons/si";
import { HomeLink } from "@/shared/ui/home-link";
import { HashLink } from "@/shared/ui/hash-link";
import { NavRouteLink } from "@/shared/ui/nav-route-link";
import { ProjectsTagLink, ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import { GridBackdrop } from "@/shared/ui/grid-backdrop";
import { getFooterSocialLinks, HOME_PAGE_TEXTS, NAV_LINKS, SOCIAL_LINK_BUTTONS, CTA_LABELS } from "@/shared/constants/data";
import { contactFormHref, contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { FooterSocialRow } from "./footer-social-row";
import { LocalTime } from "./local-time";
import { BackToTop } from "./back-to-top";
import styles from "./footer.module.scss";

const CATEGORY_LINKS: { label: string; tag?: string }[] = [
  { label: CTA_LABELS.browseAllProjects },
  { tag: "JsonUI", label: "JsonUI" },
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
    <footer className={styles.footerWrapper} data-site-footer>
      <GridBackdrop variant="footer" />
      <div className={styles.footerScreenContainer} data-grid-column>
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
            <p id="footer-navigation" className={styles.columnTitle}>Navigation</p>
            <nav className={styles.columnLinks} aria-labelledby="footer-navigation">
              <ul className={styles.linkList}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <NavRouteLink href={link.href}>{link.text}</NavRouteLink>
                  </li>
                ))}
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <p id="footer-categories" className={styles.columnTitle}>Categories</p>
            <nav className={styles.columnLinks} aria-labelledby="footer-categories">
              <ul className={styles.linkList}>
                {CATEGORY_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.tag ? (
                      <ProjectsTagLink tag={link.tag}>{link.label}</ProjectsTagLink>
                    ) : (
                      <ProjectsBoardLink tab="all">{link.label}</ProjectsBoardLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <p id="footer-contact" className={styles.columnTitle}>Contact</p>
            <nav className={`${styles.columnLinks} ${styles.contactLinks}`} aria-labelledby="footer-contact">
              <ul className={styles.linkList}>
                <li>
                  <Link href={contactFormHref()}>{CTA_LABELS.contactForm}</Link>
                </li>
                <li>
                  <HashLink href={contactSectionHref(SECTION_IDS.contactOptions)}>
                    {CTA_LABELS.contactOptions}
                  </HashLink>
                </li>
                {MAIL_LINK ? (
                  <li>
                    <a href={MAIL_LINK.href}>{MAIL_LINK.text}</a>
                  </li>
                ) : null}
              </ul>
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
