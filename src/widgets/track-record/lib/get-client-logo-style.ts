import type { CSSProperties } from "react";
import type { ClientStudio } from "@/shared/constants/data";

const CLIENT_LOGO_DEFAULT_WIDTH = 160;
const CLIENT_LOGO_DEFAULT_HEIGHT = 48;

/** Equal visual area: a 3:1 wordmark renders sqrt(3)x wider than a square mark, not 3x. */
export const getClientLogoStyle = (client: ClientStudio) => {
  const width = client.logoWidth ?? CLIENT_LOGO_DEFAULT_WIDTH;
  const height = client.logoHeight ?? CLIENT_LOGO_DEFAULT_HEIGHT;

  return {
    width,
    height,
    style: { "--client-logo-scale": Math.sqrt(width / height) } as CSSProperties,
  };
};
