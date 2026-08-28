import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";
import { contactSectionHref, homeSectionHref, SECTION_IDS } from "./anchors";
import type { FAQItem } from "./types";

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What value do you bring to my project?",
    slug: "value",
    answerText:
      "You get a developer who builds JsonUI around Bedrock constraints and player flow, including custom HUDs, server forms, chest UIs, and menu systems that integrate with your resource pack and scripts. I can also take on matching responsive web work when needed. See Selected Work for recent examples.",
    answer: (
      <>
        You get a developer who builds JsonUI around Bedrock constraints and
        player flow, including custom HUDs, server forms, chest UIs, and menu
        systems that integrate with your resource pack and scripts. I can also
        take on matching responsive web work when needed.{" "}
        <HashLink href={homeSectionHref(SECTION_IDS.selectedWork)}>
          See Selected Work
        </HashLink>{" "}
        for recent examples.
      </>
    ),
  },
  {
    question: "Are you currently accepting new commissions?",
    slug: "availability",
    answerText:
      "Yes. I am currently accepting Minecraft Bedrock JsonUI commissions. Send your scope, target version, required screens, and any mockups or textures through the contact form so I can review the fit.",
    answer: (
      <>
        Yes. I am currently accepting Minecraft Bedrock JsonUI commissions. Send
        your scope, target version, required screens, and any mockups or textures
        through the{" "}
        <HashLink href={contactSectionHref(SECTION_IDS.startProject)}>
          contact form
        </HashLink>{" "}
        so I can review the fit.
      </>
    ),
  },
  {
    question:
      "Do you focus on frontend UI or backend development in Minecraft Bedrock?",
    slug: "scope",
    answerText:
      "In Minecraft Bedrock, I specialize entirely on the frontend side: custom JsonUI (HUDs, server forms, chest UIs, and other interfaces). I also handle resource packs, custom entities, Molang, and technical animations/render controllers. While I don't write complex backend Behavior Pack scripts, I structure my UIs to integrate cleanly with custom ScriptAPIs. On the web side, I am actively building my skills and currently consider myself beginner-to-intermediate in that field.",
  },
  {
    question:
      "Do I need to provide complete UI designs, or do you handle the styling?",
    slug: "mockups",
    answerText:
      "I highly prefer that you have a plan or visual concept ready before we start. If I have to design the interface layout completely from scratch, it will take more time, cost more, and increase the risk of back-and-forth changes. Even a rough sketch made in Paint, a screenshot, or a text outline works, but the cleaner and more detailed the mockup, the faster and more cost-effective the development process will be.",
  },
  {
    question: "What is your typical turnaround time for commissions?",
    slug: "turnaround",
    answerText:
      "For Minecraft Bedrock commissions, turnaround times vary depending on the depth of the project. Simple UI panels or adjustments take about 3 to 7 days, while complex custom UI overhauls typically require 1 to 3 weeks. For other projects, such as web development, timelines vary and are discussed and adjusted individually to meet your schedule. A precise timeline estimate will be provided after we review your exact requirements. More on Commissions.",
    answer: (
      <>
        For Minecraft Bedrock commissions, turnaround times vary depending on the
        depth of the project. Simple UI panels or adjustments take about 3 to 7
        days, while complex custom UI overhauls typically require 1 to 3 weeks.
        For other projects, such as web development, timelines vary and are
        discussed and adjusted individually to meet your schedule. A precise
        timeline estimate will be provided after we review your exact
        requirements.{" "}
        <HashLink href={contactSectionHref(SECTION_IDS.startProject)}>
          Start a Project
        </HashLink>.
      </>
    ),
  },
  {
    question: "How do you handle project pricing and payments?",
    slug: "pricing",
    answerText:
      "Pricing is calculated individually based on the project's specific scope and complexity. Once we agree on terms and technical requirements, I require a 50% upfront advance before starting development. The remaining 50% is paid upon successful completion and delivery of the assets. I am generally flexible and open to custom contracts or tailored business terms depending on your project needs.",
    answer: (
      <>
        Pricing is calculated individually based on the project&apos;s specific
        scope and complexity. Once we agree on terms and technical requirements,
        I require a 50% upfront advance before starting development. The
        remaining 50% is paid upon successful completion and delivery of the
        assets. I am generally flexible and open to custom contracts or tailored
        business terms depending on your project needs.{" "}
        <HashLink href={contactSectionHref(SECTION_IDS.startProject)}>
          Start a Project
        </HashLink>.
      </>
    ),
  },
  {
    question: "What happens if a future Minecraft update breaks the UI?",
    slug: "support",
    answerText:
      "Minecraft Bedrock updates frequently modify UI files, which can break custom screens. For all commissioned projects, I provide 30 days of free technical support after delivery to fix any layout issues caused by official game updates. After this period, updates or maintenance work can be arranged as needed.",
  },
  {
    question: "Do I receive full ownership and raw source files of the UI?",
    slug: "ownership",
    answerText:
      "Typically yes, but this is an individual matter depending on the scale and nature of the project. For standard, straightforward commissions, full file usage is included. For complex commercial platforms or large-scale integrations, custom licensing terms or an IP transfer fee may be negotiated based on your specific legal requirements.",
  },
];

const COMMISSION_FAQ_SLUGS = [
  "availability",
  "scope",
  "mockups",
  "turnaround",
  "pricing",
  "support",
  "ownership",
];

export const COMMISSION_FAQ_ITEMS = FAQ_ITEMS.filter(
  (item) => item.slug && COMMISSION_FAQ_SLUGS.includes(item.slug),
);

const CONTACT_FAQ_SLUGS = ["value", "availability"];

export const CONTACT_FAQ_ITEMS = FAQ_ITEMS.filter(
  (item) => item.slug && CONTACT_FAQ_SLUGS.includes(item.slug),
);
