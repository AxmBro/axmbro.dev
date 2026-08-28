import type { ReactNode } from "react";

export type ProjectsBoardTab = "all" | "featured" | "personal" | "commissions";

export type ProjectType = "personal" | "commissions";

export interface ProjectItem {
  title: string;
  description: string;
  tags?: string[];
  imgSrc?: string;
  /** Detail-page hero only. Same folder as `imgSrc`; omit to use the card thumbnail. */
  heroImgSrc?: string;
  logoSrc?: string;
  star?: boolean;
  downloadLink?: string;
  url?: string;
  type?: ProjectType;
  date?: string;
  isPresent?: boolean;
}

export type ExperienceButton =
  | { text: string; href: string; projectsTab?: never }
  | { text: string; projectsTab: ProjectsBoardTab; href?: never };

export interface ExperienceItem {
  role: string;
  date: string;
  company: string;
  items: { name: ReactNode }[];
  buttons?: ExperienceButton[];
}

export interface SkillCard {
  title: string;
  items: { name: string; value: string }[];
}

export interface SocialLink {
  href: string;
  text: string;
  iconId: SocialIconId;
  copyText?: string;
  channel: "direct" | "extra";
}

export type SocialIconId =
  | "github"
  | "discord"
  | "youtube"
  | "twitter"
  | "instagram"
  | "mail"
  | "betterbedrock";

export interface ClientStudio {
  name: string;
  href: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export interface CommissionInfoItem {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  /** Plain-text answer for FAQPage JSON-LD (and default UI when `answer` is omitted). */
  answerText: string;
  /** Rich UI answer; defaults to `answerText`. */
  answer?: ReactNode;
  slug?: string;
}
