import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaDiscord, FaYoutube, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { SiNextdotjs } from "react-icons/si";
import { SOCIAL_LINK_BUTTONS, HOME_PAGE_TEXTS, NAV_LINKS } from "@/shared/constants/data";
import { LocalTime } from "./local-time";
import { BackToTop } from "./back-to-top";
import styles from "./footer.module.scss";

type FooterSocial = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number; "aria-hidden"?: boolean }> | null;
  textMatcher?: string;
};

const FOOTER_SOCIALS: FooterSocial[] = [
  { id: "github", icon: FaGithub, label: "GitHub" },
  { id: "mail", icon: FaEnvelope, label: "Email" },
  { id: "discord", textMatcher: "Discord (DM)", icon: FaDiscord, label: "Discord" },
  { id: "youtube", textMatcher: "YouTube", icon: FaYoutube, label: "YouTube" },
  { id: "betterbedrock", icon: null, label: "Better Bedrock Profile" },
  { id: "instagram", icon: FaInstagram, label: "Instagram" },
];

const CONTACT_SOCIAL_IDS = ["github", "discord", "mail"];

const CATEGORY_LINKS = [
  { href: "/projects", label: "View All Projects", isViewAll: true },
  { href: "/projects?tag=JsonUI", label: "JsonUI & HUDs" },
  { href: "/projects?tag=Server+Form", label: "Server Forms" },
  { href: "/projects?tag=Web", label: "Web Development" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

const getSocialLink = (social: FooterSocial) =>
  SOCIAL_LINK_BUTTONS.find(
    (s) => s.iconId === social.id && (!social.textMatcher || s.text === social.textMatcher)
  );

const externalLinkProps = (isMail: boolean) =>
  isMail ? {} : { target: "_blank" as const, rel: "noopener noreferrer" as const };

export const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerScreenContainer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <Link className={styles.logoInfo} href="/">
              <Image
                src="/icon192.png"
                alt="AxmBro Logo"
                width={32}
                height={32}
                className={styles.footerLogo}
              />
              <span className={styles.brandName}>AxmBro</span>
            </Link>
            <p className={styles.brandDesc}>
              {HOME_PAGE_TEXTS.footer.description}
            </p>
            <LocalTime />
            <div className={styles.socialIconsRow}>
              {FOOTER_SOCIALS.map((social) => {
                const linkData = getSocialLink(social);
                if (!linkData) return null;

                if (social.id === "betterbedrock") {
                  return (
                    <a
                      key={social.id}
                      href={linkData.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <span className={styles.betterBedrockIcon} />
                    </a>
                  );
                }

                const Icon = social.icon!;
                return (
                  <a
                    key={social.id}
                    href={linkData.href}
                    aria-label={social.label}
                    {...externalLinkProps(social.id === "mail")}
                  >
                    <Icon size={22} aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h2 className={styles.columnTitle}>Navigation</h2>
            <nav className={styles.columnLinks}>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>{link.text}</Link>
              ))}
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <h2 className={styles.columnTitle}>Categories</h2>
            <nav className={styles.columnLinks}>
              {CATEGORY_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={link.isViewAll ? styles.viewAllLink : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <h2 className={styles.columnTitle}>Contact</h2>
            <nav className={`${styles.columnLinks} ${styles.contactLinks}`}>
              <Link href="/contact">Contact Form</Link>
              {FOOTER_SOCIALS.filter((s) => CONTACT_SOCIAL_IDS.includes(s.id)).map((social) => {
                const linkData = getSocialLink(social);
                if (!linkData) return null;

                return (
                  <a
                    key={social.id}
                    href={linkData.href}
                    {...externalLinkProps(social.id === "mail")}
                  >
                    {social.id === "mail" ? linkData.text : social.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomBarContent}>
            <div className={styles.legalRow}>
              <Link href="/" className={styles.copyrightLink}>
                <Image
                  src="/icon192.png"
                  alt="AxmBro Logo"
                  width={14}
                  height={14}
                  style={{ borderRadius: "2px" }}
                  className={styles.footerLogoIcon}
                />
                <span>© {new Date().getFullYear()} AxmBro | All rights reserved</span>
              </Link>
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
