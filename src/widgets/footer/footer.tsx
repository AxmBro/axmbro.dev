import Link from "next/link";
import Image from "next/image";
import { PROJECTS, SOCIAL_LINKS, PORTFOLIO_TEXTS } from "@/shared/constants/data";
import styles from "./footer.module.scss";

export const Footer = () => {
  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 4);
  const github = SOCIAL_LINKS.find(s => s.icon === "github");
  const discord = SOCIAL_LINKS.find(s => s.icon === "discord" && s.text === "axmbro");
  const email = SOCIAL_LINKS.find(s => s.icon === "mail");

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerScreenContainer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <Link className={styles.logoInfo} href="/">
              <Image
                src="/images/ui/logo192.png"
                alt="AxmBro Logo"
                width={32}
                height={32}
                className={styles.footerLogo}
              />
              <span className={styles.brandName}>AxmBro</span>
            </Link>
            <p className={styles.brandDesc}>
              {PORTFOLIO_TEXTS.footer.description}
            </p>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Navigation</h4>
            <nav className={styles.columnLinks}>
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-use">Terms of Use</Link>
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Featured</h4>
            <nav className={styles.columnLinks}>
              {featuredProjects.map((p) => (
                <Link key={p.slug || p.title} href={p.slug ? `/projects/${p.slug}` : "/projects"}>
                  {p.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Contact</h4>
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
