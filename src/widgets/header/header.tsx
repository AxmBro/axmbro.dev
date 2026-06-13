"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HomeLink } from "@/shared/ui/home-link";
import { HashLink } from "@/shared/ui/hash-link";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";
import { NAV_LINKS } from "@/shared/constants/data";
import styles from "./header.module.scss";

const navPath = (href: string) => href.split("#")[0] || "/";
const hasHash = (href: string) => href.includes("#");

const MOBILE_NAV_ID = "header-mobile-nav";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mqResponsive = window.matchMedia("(max-width: 768px)");
    const handleResponsive = (e: MediaQueryListEvent | MediaQueryList) => setIsResponsive(e.matches);

    handleResponsive(mqResponsive);
    mqResponsive.addEventListener("change", handleResponsive);

    return () => mqResponsive.removeEventListener("change", handleResponsive);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handlePlainNavClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (pathname !== href) return;

    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinkClass = (href: string) =>
    pathname === navPath(href) ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem;

  const renderNavLink = (link: (typeof NAV_LINKS)[number], className: string) => {
    if (hasHash(link.href)) {
      return (
        <HashLink key={link.href} href={link.href} className={className} onClick={closeMenu}>
          {link.text}
        </HashLink>
      );
    }

    if (link.href === "/projects") {
      return (
        <ProjectsBoardLink key={link.href} tab="all" className={className} onClick={closeMenu}>
          {link.text}
        </ProjectsBoardLink>
      );
    }

    return (
      <Link key={link.href} href={link.href} className={className} onClick={handlePlainNavClick(link.href)}>
        {link.text}
      </Link>
    );
  };

  return (
    <>
      <header className={styles.headerRoot}>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <HomeLink className={styles.logoSection} onClick={closeMenu}>
              <Image
                src="/icon192.png"
                className={styles.logoImg}
                alt="Axmbro Logo"
                width={32}
                height={32}
              />
              <span className={styles.logoText}>AxmBro</span>
            </HomeLink>

            <nav className={styles.desktopNav}>
              {NAV_LINKS.map((link) => renderNavLink(link, navLinkClass(link.href)))}
            </nav>

            {isResponsive && (
              <button
                type="button"
                onClick={toggleMenu}
                className={styles.menuToggle}
                aria-expanded={menuOpen}
                aria-controls={MOBILE_NAV_ID}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                <span className={styles.toggleText}>{menuOpen ? "Close" : "Menu"}</span>
              </button>
            )}
          </div>

          {isResponsive && menuOpen && (
            <nav id={MOBILE_NAV_ID} className={styles.mobileMenu} aria-label="Mobile">
              {NAV_LINKS.map((link) => renderNavLink(link, styles.mobileNavItem))}
            </nav>
          )}
        </div>
      </header>
      {isResponsive && menuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </>
  );
};
