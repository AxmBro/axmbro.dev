import Link from "next/link";
import Image from "next/image";
import { PROJECTS, SOCIAL_LINK_BUTTONS, HOME_PAGE_TEXTS } from "@/shared/constants/data";
import styles from "./footer.module.scss";

export const Footer = () => {
  const featuredProjects = PROJECTS.filter(p => p.star).slice(0, 4);
  const github = SOCIAL_LINK_BUTTONS.find(s => s.iconId === "github");
  const discord = SOCIAL_LINK_BUTTONS.find(s => s.iconId === "discord" && s.text === "axmbro");
  const email = SOCIAL_LINK_BUTTONS.find(s => s.iconId === "mail");

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
          </div>

          <div className={styles.footerColumn}>
            <h2 className={styles.columnTitle}>Navigation</h2>
            <nav className={styles.columnLinks}>
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-use">Terms of Use</Link>
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <h2 className={styles.columnTitle}>Featured</h2>
            <nav className={styles.columnLinks}>
              {featuredProjects.map((p) => (
                <Link key={p.url || p.title} href={p.url ? `/projects/${p.url}` : "/projects"}>
                  {p.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <h2 className={styles.columnTitle}>Contact</h2>
            <nav className={styles.columnLinks}>
              <Link href="/contact">Contact Form</Link>
              {github && <a href={github.href} target="_blank" rel="noopener noreferrer">GitHub</a>}
              {discord && <a href={discord.href} target="_blank" rel="noopener noreferrer">Discord</a>}
              {email && <a href={email.href}>axmbro@gmail.com</a>}
            </nav>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.legalRow}>
            <span>© {new Date().getFullYear()} AxmBro | All rights reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
