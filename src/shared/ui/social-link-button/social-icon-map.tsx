"use client";

import type { ComponentType } from "react";
import { FaGithub, FaDiscord, FaYoutube, FaXTwitter, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { BetterBedrockIcon } from "@/shared/ui/better-bedrock-icon";
import type { SocialIconId } from "@/shared/constants/data";

export type SocialIconComponent = ComponentType<{ size: number; "aria-hidden"?: boolean }>;

export const SOCIAL_ICON_MAP: Record<SocialIconId, SocialIconComponent> = {
  github: FaGithub,
  discord: FaDiscord,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  mail: FaEnvelope,
  betterbedrock: ({ size }) => <BetterBedrockIcon size={size} />,
};
