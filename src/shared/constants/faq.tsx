import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { ProjectsBoardLink } from "@/shared/ui/projects-tag-link";

import { commissionSectionHref, contactFormHref, SECTION_IDS } from "./anchors";

import type { FAQItem } from "./types";

// One link per answer at most, and only when it leads somewhere the reader needs next.
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Who have you worked with?",

    slug: "clients",

    answerText:
      "Servers and studios such as InPvP (Zeqa), Mush Co, A30x1, and Radium Studio, plus private server owners and creators. My own texture pack, Better Bedrock, has passed 2 million downloads.",

    answer: (
      <>
        Servers and studios such as InPvP (Zeqa), Mush Co, A30x1, and Radium
        Studio, plus private server owners and creators. My own texture pack,
        Better Bedrock, has passed 2 million downloads.{" "}
        <ProjectsBoardLink tab="commissions">See client work</ProjectsBoardLink>.
      </>
    ),
  },

  {
    question: "Are you currently accepting new commissions?",

    slug: "availability",

    answerText:
      "Yes. I am accepting new Bedrock JsonUI commissions. Send your idea, sketches, or a short scope through the contact form, and I will reply with next steps.",

    answer: (
      <>
        Yes. I am accepting new Bedrock JsonUI commissions. Send your idea,
        sketches, or a short scope through the{" "}
        <Link href={contactFormHref()}>contact form</Link>, and I will reply with
        next steps.
      </>
    ),
  },

  {
    question: "Do you build only the UI, or backend logic too?",

    slug: "scope",

    answerText:
      "I build the UI side: JsonUI screens such as server forms, HUDs, chest UIs, menus, chat, and pause screens, plus resource packs, entities, Molang, and UI animation when needed. I do not write complex Behavior Pack logic, but I structure the UI so your ScriptAPI code can connect to it. For web projects, message me on Discord first.",

    answer: (
      <>
        I build the UI side: JsonUI screens such as server forms, HUDs, chest
        UIs, menus, chat, and pause screens, plus resource packs, entities,
        Molang, and UI animation when needed. I do not write complex Behavior
        Pack logic, but I structure the UI so your ScriptAPI code can connect to
        it. For web projects, message me on Discord first.{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionServices)}>
          See what I build
        </HashLink>
        .
      </>
    ),
  },

  {
    question: "Do I need to provide complete UI designs?",

    slug: "mockups",

    answerText:
      "Not complete ones, but a clear reference helps a lot. Mockups from you or your artist work best. I can design the interface too, but designing from scratch takes longer and costs more. A sketch, a screenshot, or a text outline works when the direction is clear.",
  },

  {
    question: "How long does a commission take?",

    slug: "turnaround",

    answerText:
      "It depends on scope, complexity, and my schedule. Simple UI work often takes 3 to 7 days; larger UI sets can take a few weeks. You get a clear estimate after we review your requirements.",
  },

  {
    question: "How do you price commissions?",

    slug: "pricing",

    answerText:
      "Every project is priced on its scope after we review it, so there is no fixed price list. For simple commissions, 50% upfront and 50% on delivery is common. Studios usually sign a separate contract.",
  },

  {
    question: "How many revisions are included?",

    slug: "revisions",

    answerText:
      "We agree on revision rounds when we set the scope. I share work at checkpoints, and reasonable layout and flow fixes within that scope are part of the build. Bigger changes or extra screens get a quote before I continue.",
  },

  {
    question: "What payment methods do you accept?",

    slug: "payments",

    answerText:
      "PayPal, bank transfer, or card. Other methods are possible - we agree on the details before work starts.",
  },

  {
    question: "What happens if a Minecraft update breaks the UI?",

    slug: "support",

    answerText:
      "Bedrock updates sometimes change UI files, which can affect custom screens, though serious breakage is rare. Commissioned work includes 30 days of support after delivery for layout issues caused by official game updates. Longer maintenance can be arranged.",
  },

  {
    question: "Do I get full ownership and the source files?",

    slug: "ownership",

    answerText:
      "Yes. For standard commissions you receive the production files we agreed on. Large commercial or studio projects may need custom license or IP terms.",
  },

  {
    question: "Can we sign an NDA or keep the project confidential?",

    slug: "nda",

    answerText:
      "Yes. Studios often need an NDA or confidentiality terms, and we can sign them before the scope review. File ownership still follows the agreed terms.",
  },
];

const COMMISSION_FAQ_SLUGS = [
  "availability",

  "scope",

  "mockups",

  "turnaround",

  "pricing",

  "revisions",

  "payments",

  "support",

  "ownership",

  "nda",
];

export const COMMISSION_FAQ_ITEMS = FAQ_ITEMS.filter(
  (item) => item.slug && COMMISSION_FAQ_SLUGS.includes(item.slug),
);

const faqBySlug = (slug: string) => FAQ_ITEMS.find((item) => item.slug === slug)!;

// On /contact the form sits right above, so the availability answer drops its link.
export const CONTACT_FAQ_ITEMS: FAQItem[] = [
  faqBySlug("clients"),
  {
    ...faqBySlug("availability"),
    answerText:
      "Yes. I am accepting new Bedrock JsonUI commissions. Send your idea, sketches, or a short scope through the form above, and I will reply with next steps.",
    answer: undefined,
  },
];
