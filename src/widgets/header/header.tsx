"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NAV_LINKS } from "@/shared/constants/data";
import styles from "./header.module.scss";

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

  const handleLogoClick = (e: React.MouseEvent) => {
    closeMenu();
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={styles.headerRoot}>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <Link className={styles.logoSection} onClick={handleLogoClick} href="/">
              <Image
                src="/images/ui/logo192.png"
                className={styles.logoImg}
                alt="Axmbro Logo"
                width={32}
                height={32}
              />
              <span className={styles.logoText}>AxmBro</span>
            </Link>

            <nav className={styles.desktopNav}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={pathname === link.href ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
                >
                  {link.text}
                </Link>
              ))}
            </nav>

            {isResponsive && (
              <div onClick={toggleMenu} className={styles.menuToggle}>
                <span className={styles.toggleText}>{menuOpen ? "Close" : "Menu"}</span>
              </div>
            )}
          </div>

          {isResponsive && menuOpen && (
            <nav className={styles.mobileMenu}>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.mobileNavItem} onClick={closeMenu}>
                  {link.text}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      {isResponsive && menuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </>
  );
};
