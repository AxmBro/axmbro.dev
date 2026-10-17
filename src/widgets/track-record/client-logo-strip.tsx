import Image from "next/image";
import { HOME_PAGE_TEXTS, type ClientStudio } from "@/shared/constants/data";
import { getClientLogoStyle } from "./lib/get-client-logo-style";
import styles from "./client-logo-strip.module.scss";

interface ClientLogoStripProps {
  clients: ClientStudio[];
}

/** Home hero band: one muted row of client logos (static - no marquee under 8 logos, `site` playbook). */
export function ClientLogoStrip({ clients }: ClientLogoStripProps) {
  return (
    <div className={styles.strip}>
      <p className={styles.label}>{HOME_PAGE_TEXTS.hero.clientsLabel}</p>
      <ul className={styles.logos}>
        {clients
          .filter((client): client is ClientStudio & { logoSrc: string } =>
            Boolean(client.logoSrc),
          )
          .map((client) => {
            const logo = getClientLogoStyle(client);

            return (
              <li key={client.name} className={styles.item}>
                <a
                  href={client.href}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={client.name}
                >
                  <span className={styles.logoBox} style={logo.style}>
                    <Image
                      src={client.logoSrc}
                      alt={client.name}
                      width={logo.width}
                      height={logo.height}
                      sizes="96px"
                      className={styles.logo}
                    />
                  </span>
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
