"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HomeLink } from "@/shared/ui/home-link";
import { NavRouteLink } from "@/shared/ui/nav-route-link";
import { NAV_LINKS } from "@/shared/constants/data";
import { BREAKPOINT_TABLET_PX } from "@/shared/constants/breakpoints";
import { ROUTES } from "@/shared/constants/routes";
import { isNavLinkActive, normalizePathname } from "@/shared/lib/nav-active";
import { hasHash } from "@/shared/lib/has-hash";
import styles from "./header.module.scss";

const MOBILE_NAV_ID = "header-mobile-nav";

export const Header = () => {
  const headerBarRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const pathname = normalizePathname(usePathname());
  const isHome = pathname === ROUTES.home;
  const [announcementInView, setAnnouncementInView] = useState(isHome);

  useEffect(() => {
    const mqResponsive = window.matchMedia(`(max-width: ${BREAKPOINT_TABLET_PX}px)`);
    const handleResponsive = (e: MediaQueryListEvent | MediaQueryList) => setIsResponsive(e.matches);

    handleResponsive(mqResponsive);
    mqResponsive.addEventListener("change", handleResponsive);

    return () => mqResponsive.removeEventListener("change", handleResponsive);
  }, []);

  useEffect(() => {
    const bar = headerBarRef.current;
    if (!bar) return;

    const syncHeight = () => {
      // Bar row + headerRoot border-bottom (open menu must not inflate sticky offset)
      document.documentElement.style.setProperty(
        "--header-sticky-height",
        `${bar.offsetHeight + 1}px`,
      );
    };

    syncHeight();
    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(bar);
    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty("--header-sticky-height");
    };
  }, [isResponsive]);

  useEffect(() => {
    if (!isHome) return;

    const node = document.querySelector("[data-announcement-bar]");
    if (!(node instanceof HTMLElement)) return;

    const headerPx = headerBarRef.current?.offsetHeight ?? 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnnouncementInView(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: `-${headerPx}px 0px 0px 0px`,
      },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isHome, isResponsive]);

  const overAnnouncement = isHome && announcementInView;

  useEffect(() => {
    if (!menuOpen) return;

    const firstLink = mobileNavRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        menuToggleRef.current?.focus();
        return;
      }

      if (e.key !== "Tab" || !mobileNavRef.current || !menuToggleRef.current) return;

      const focusables = [
        menuToggleRef.current,
        ...Array.from(mobileNavRef.current.querySelectorAll<HTMLElement>("a")),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);
  const closeMenuRestoreFocus = () => {
    setMenuOpen(false);
    menuToggleRef.current?.focus();
  };

  const handlePlainNavClick = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (pathname !== normalizePathname(href)) return;

    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinkClass = (href: string) =>
    isNavLinkActive(pathname, href) ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem;

  const mobileNavLinkClass = (href: string) =>
    isNavLinkActive(pathname, href)
      ? `${styles.mobileNavItem} ${styles.navItemActive}`
      : styles.mobileNavItem;

  const renderNavLink = (link: (typeof NAV_LINKS)[number], className: string) => {
    const ariaCurrent = isNavLinkActive(pathname, link.href) ? "page" : undefined;
    const isPlain = !hasHash(link.href) && link.href !== ROUTES.projects;

    return (
      <NavRouteLink
        key={link.href}
        href={link.href}
        className={className}
        aria-current={ariaCurrent}
        onNavigate={isPlain ? undefined : closeMenu}
        onPlainClick={isPlain ? handlePlainNavClick(link.href) : undefined}
      >
        {link.text}
      </NavRouteLink>
    );
  };

  return (
    <>
      <header
        className={styles.headerRoot}
        {...(overAnnouncement ? { "data-over-announcement": "" } : {})}
      >
        <div className={styles.header}>
          <div ref={headerBarRef} className={styles.headerContainer}>
            <HomeLink className={styles.logoSection} onClick={closeMenu}>
              <Image
                src="/icon192.png"
                className={styles.logoImg}
                alt=""
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
                ref={menuToggleRef}
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
            <nav
              ref={mobileNavRef}
              id={MOBILE_NAV_ID}
              className={styles.mobileMenu}
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => renderNavLink(link, mobileNavLinkClass(link.href)))}
            </nav>
          )}
        </div>
      </header>
      {isResponsive && menuOpen && (
        <div className={styles.overlay} onClick={closeMenuRestoreFocus} />
      )}
    </>
  );
};
