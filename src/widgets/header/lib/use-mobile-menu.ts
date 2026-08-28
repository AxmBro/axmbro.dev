import { useEffect, useRef, useState } from "react";

export const useMobileMenu = () => {
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenuRestoreFocus = () => {
    setMenuOpen(false);
    menuToggleRef.current?.focus();
  };

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

  return {
    menuOpen,
    menuToggleRef,
    mobileNavRef,
    closeMenu,
    toggleMenu,
    closeMenuRestoreFocus,
  };
};
