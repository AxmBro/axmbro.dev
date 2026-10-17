"use client";

import { useRef, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HomeLink } from "@/shared/ui/home-link";
import { NavRouteLink } from "@/shared/ui/nav-route-link";
import { HEADER_TEXTS, NAV_LINKS, SITE_BRAND } from "@/shared/constants/data";
import { ROUTES } from "@/shared/constants/routes";
import { normalizePathname } from "@/shared/lib/nav-active";
import {
  getHeaderNavLinkState,
  isPlainHeaderNavLink,
  scrollToTopOnSameRoute,
} from "./lib/header-nav";
import { useHomeAnnouncementInView } from "./lib/use-home-announcement-in-view";
import { useMobileMenu } from "./lib/use-mobile-menu";
import { useTabletNav } from "./lib/use-tablet-nav";
import { useStickyHeaderHeight } from "./lib/use-sticky-header-height";
import styles from "./header.module.scss";

const MOBILE_NAV_ID = "header-mobile-nav";

export const Header = () => {
  const headerBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const normalizedPath = normalizePathname(pathname);
  const isHome = normalizedPath === ROUTES.home;
  const isTablet = useTabletNav();
  const {
    menuOpen,
    menuToggleRef,
    mobileNavRef,
    closeMenu,
    toggleMenu,
    closeMenuRestoreFocus,
  } = useMobileMenu();

  useStickyHeaderHeight(headerBarRef, isTablet);
  const announcementInView = useHomeAnnouncementInView(isHome, headerBarRef, isTablet);

  const handlePlainNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    scrollToTopOnSameRoute(normalizedPath, href, event);
  };

  const renderNavLink = (link: (typeof NAV_LINKS)[number], baseClass: string) => {
    const navState = getHeaderNavLinkState(
      pathname,
      link.href,
      baseClass,
      styles.navItemActive,
    );
    const isPlain = isPlainHeaderNavLink(link.href);

    return (
      <NavRouteLink
        key={link.href}
        href={link.href}
        className={navState.className}
        aria-current={navState.ariaCurrent}
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
        {...(isHome && announcementInView ? { "data-over-announcement": "" } : {})}
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
              <span className={styles.logoText}>{SITE_BRAND.name}</span>
            </HomeLink>

            <nav className={styles.desktopNav} aria-label={HEADER_TEXTS.mainNavAria}>
              <ul className={styles.navList}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>{renderNavLink(link, styles.navItem)}</li>
                ))}
              </ul>
            </nav>

            {isTablet && (
              <button
                ref={menuToggleRef}
                type="button"
                onClick={toggleMenu}
                className={styles.menuToggle}
                aria-expanded={menuOpen}
                aria-controls={MOBILE_NAV_ID}
                aria-label={menuOpen ? HEADER_TEXTS.closeMenuAria : HEADER_TEXTS.openMenuAria}
              >
                <span className={styles.toggleText}>
                  {menuOpen ? HEADER_TEXTS.close : HEADER_TEXTS.menu}
                </span>
              </button>
            )}
          </div>

          {isTablet && menuOpen && (
            <nav
              ref={mobileNavRef}
              id={MOBILE_NAV_ID}
              className={styles.mobileMenu}
              aria-label={HEADER_TEXTS.mobileNavAria}
            >
              <ul className={styles.mobileNavList}>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>{renderNavLink(link, styles.mobileNavItem)}</li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>
      {isTablet && menuOpen && (
        <div className={styles.overlay} onClick={closeMenuRestoreFocus} />
      )}
    </>
  );
};
