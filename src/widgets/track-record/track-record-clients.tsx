"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { HOME_PAGE_TEXTS, type ClientStudio } from "@/shared/constants/data";
import { useRevealInView } from "@/shared/ui/motion";
import {
  PROJECT_CONTENT_DELAY,
  PROJECT_FEATURED_CARD_STEP,
} from "@/shared/ui/motion";
import styles from "./track-record.module.scss";

interface ClientLogoCellProps {
  client: ClientStudio;
  staggerDelay: number;
}

function ClientLogoCell({ client, staggerDelay }: ClientLogoCellProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inViewOnce = useRevealInView(ref, { once: true });
  const inViewRepeat = useRevealInView(ref, { once: false, margin: "0px" });
  const reduceMotion = useReducedMotion();
  const hasFadedIn = useRef(false);
  const wasInView = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  useEffect(() => {
    if (!inViewOnce || hasFadedIn.current) return;

    const timeoutId = window.setTimeout(() => {
      hasFadedIn.current = true;
      setIsVisible(true);

      if (!reduceMotion) {
        requestAnimationFrame(() => setIsPopping(true));
      }
    }, staggerDelay * 1000);

    return () => window.clearTimeout(timeoutId);
  }, [inViewOnce, staggerDelay, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      wasInView.current = inViewRepeat;
      return;
    }

    if (inViewRepeat && !wasInView.current && hasFadedIn.current) {
      setIsPopping(false);
      requestAnimationFrame(() => setIsPopping(true));
    }

    wasInView.current = inViewRepeat;
  }, [inViewRepeat, reduceMotion]);

  const handleLogoPopEnd = () => {
    setIsPopping(false);
  };

  if (!client.logoSrc) return null;

  return (
    <a
      ref={ref}
      href={client.href}
      className={styles.client}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span
        className={[
          styles.clientContent,
          isVisible ? styles.clientContentVisible : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className={styles.clientLogoMotion}>
          <Image
            src={client.logoSrc}
            alt=""
            width={client.logoWidth ?? 160}
            height={client.logoHeight ?? 48}
            sizes="(max-width: 768px) 40vw, 160px"
            className={[
              styles.clientLogo,
              isPopping ? styles.clientLogoPop : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onAnimationEnd={handleLogoPopEnd}
          />
        </span>
        <span className={styles.clientName}>{client.name}</span>
      </span>
    </a>
  );
}

interface TrackRecordClientsProps {
  clients: ClientStudio[];
  showHeader?: boolean;
  title?: string;
  description?: string;
}

export function TrackRecordClients({
  clients,
  showHeader = true,
  title = HOME_PAGE_TEXTS.trackRecord.clientsTitle,
  description = HOME_PAGE_TEXTS.trackRecord.clientsDescription,
}: TrackRecordClientsProps) {
  return (
    <div className={styles.clients}>
      {showHeader ? (
        <div className={styles.clientsHeader}>
          <h3 className={styles.clientsTitle}>{title}</h3>
          <p className={styles.clientsDescription}>{description}</p>
        </div>
      ) : null}
      <div className={styles.clientRow}>
        {clients.map((client, index) => (
          <ClientLogoCell
            key={client.name}
            client={client}
            staggerDelay={PROJECT_CONTENT_DELAY + index * PROJECT_FEATURED_CARD_STEP}
          />
        ))}
      </div>
    </div>
  );
}
