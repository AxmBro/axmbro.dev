import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { HomeLink } from "@/shared/ui/home-link";
import { HashLink } from "@/shared/ui/hash-link";
import { NavRouteLink } from "@/shared/ui/nav-route-link";
import { ProjectsTagLink, ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import { GridBackdrop } from "@/shared/ui/grid-backdrop";
import { CookieSettingsButton } from "@/shared/ui/cookie-consent";
import {
  CTA_LABELS,
  FOOTER_TEXTS,
  NAV_LINKS,
  SITE_BRAND,
  SITEMAP_PAGE_TEXTS,
  SOCIAL_LINK_BUTTONS,
  getFooterSocialLinks,
} from "@/shared/constants/data";
import { PRIVACY_POLICY_PAGE, TERMS_OF_USE_PAGE } from "@/shared/constants/legal";
import { contactFormHref, contactSectionHref, SECTION_IDS } from "@/shared/constants/anchors";
import { ROUTES } from "@/shared/constants/routes";
import { FooterSocialRow } from "./footer-social-row";
import { LocalTime } from "./local-time";
import { BackToTop } from "./back-to-top";
import styles from "./footer.module.scss";

const MAIL_LINK = SOCIAL_LINK_BUTTONS.find((link) => link.iconId === "mail");

const LEGAL_LINKS = [
  { href: ROUTES.sitemap, label: SITEMAP_PAGE_TEXTS.title },
  { href: ROUTES.privacyPolicy, label: PRIVACY_POLICY_PAGE.title },
  { href: ROUTES.termsOfUse, label: TERMS_OF_USE_PAGE.title },
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
                <span className={styles.brandName}>{SITE_BRAND.name}</span>
              </HomeLink>
              <p className={styles.brandDesc}>{FOOTER_TEXTS.description}</p>
              <LocalTime />
            </div>
            <FooterSocialRow links={footerSocialLinks} />
          </div>

          <div className={styles.footerColumn}>
            <p id="footer-navigation" className={styles.columnTitle}>
              {FOOTER_TEXTS.columns.navigation}
            </p>
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
            <p id="footer-categories" className={styles.columnTitle}>
              {FOOTER_TEXTS.columns.categories}
            </p>
            <nav className={styles.columnLinks} aria-labelledby="footer-categories">
              <ul className={styles.linkList}>
                {FOOTER_TEXTS.categoryLinks.map((link) => (
                  <li key={link.label}>
                    {"tag" in link ? (
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
            <p id="footer-contact" className={styles.columnTitle}>
              {FOOTER_TEXTS.columns.contact}
            </p>
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
                <span>{FOOTER_TEXTS.copyright(new Date().getFullYear())}</span>
              </HomeLink>
              <span className={styles.separator}>•</span>
              <a
                href={FOOTER_TEXTS.sourceCode.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceLink}
              >
                <FaGithub size={14} aria-hidden />
                <span>{FOOTER_TEXTS.sourceCode.label}</span>
              </a>
              <span className={styles.separator}>•</span>
              <CookieSettingsButton className={`${styles.sourceLink} ${styles.cookieSettings}`} />
            </div>

            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
};
