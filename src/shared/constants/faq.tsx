import Link from "next/link";
import { HashLink } from "@/shared/ui/hash-link";

import {
  commissionFaqItemHref,
  commissionSectionHref,
  contactFormHref,
  contactSectionHref,
  homeSectionHref,
  SECTION_IDS,
} from "./anchors";

import type { FAQItem } from "./types";

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What value do you bring to my project?",

    slug: "value",

    answerText:
      "I specialize in custom Bedrock JsonUI built around real constraints, player flow, and clean integration with your pack and scripts - work shipped for studios and server teams. See Selected Projects for recent examples.",

    answer: (
      <>
        I specialize in custom Bedrock JsonUI built around real constraints,
        player flow, and clean integration with your pack and scripts - work
        shipped for studios and server teams.{" "}
        <HashLink href={homeSectionHref(SECTION_IDS.selectedWork)}>
          See Selected Projects
        </HashLink>{" "}
        for recent examples.
      </>
    ),
  },

  {
    question: "Are you currently accepting new commissions?",

    slug: "availability",

    answerText:
      "Yes. I am accepting custom Bedrock JsonUI commissions. Share your ideas, sketches, mockups, or a short scope outline when you reach out - the more context, the faster I can reply with sensible next steps. Send a message on the contact page and I will review your project. For what I take on and what I do not, see the scope FAQ.",

    answer: (
      <>
        Yes. I am accepting custom Bedrock JsonUI commissions. Share your ideas,
        sketches, mockups, or a short scope outline when you reach out - the more
        context, the faster I can reply with sensible next steps. Send a message
        on the{" "}
        <Link href={contactFormHref()}>contact page</Link> and I will review your
        project. For what I take on and what I do not, see the{" "}
        <HashLink href={commissionFaqItemHref("scope")}>scope FAQ</HashLink>.
      </>
    ),
  },

  {
    question:
      "Do you focus on frontend UI or backend development in Minecraft Bedrock?",

    slug: "scope",

    answerText:
      "Bedrock JsonUI is my main commission work - especially server forms and custom HUDs, plus chest UIs, connected menus, chat or pause screen work, and other interface screens. I also handle resource packs, entities, Molang, and UI animation where the project needs it. I do not write complex Behavior Pack backend logic, but I structure UI for ScriptAPI integration. Web development is separate - reach out on Discord DM first. Not sure your idea fits? Message me on the contact page anyway.",

    answer: (
      <>
        Bedrock JsonUI is my main commission work - especially server forms and
        custom HUDs, plus chest UIs, connected menus, chat or pause screen work,
        and other interface screens. I also handle resource packs, entities,
        Molang, and UI animation where the project needs it. I do not write
        complex Behavior Pack backend logic, but I structure UI for ScriptAPI
        integration. Web development is separate - reach out on Discord DM first.
        Not sure your idea fits?{" "}
        <Link href={contactFormHref()}>Message me</Link> anyway.{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionServices)}>
          See what I build
        </HashLink>
        .
      </>
    ),
  },

  {
    question:
      "Do I need to provide complete UI designs, or do you handle the styling?",

    slug: "mockups",

    answerText:
      "A clear plan or visual reference helps a lot. I strongly recommend mockups before we start - from you, an artist, or your studio team. I can handle interface design and styling, but building visuals from scratch takes longer and costs more. A rough sketch, screenshot, or text outline still works when the direction is clear.",

    answer: (
      <>
        A clear plan or visual reference helps a lot. I strongly recommend
        mockups before we start - from you, an artist, or your studio team. I
        can handle interface design and styling, but building visuals from
        scratch takes longer and costs more. A rough sketch, screenshot, or text
        outline still works when the direction is clear.{" "}
        <HashLink
          href={commissionSectionHref(SECTION_IDS.commissionRequirements)}
        >
          Review what I need from you
        </HashLink>
        .
      </>
    ),
  },

  {
    question: "What is your typical turnaround time for commissions?",

    slug: "turnaround",

    answerText:
      "Timelines depend on scope, complexity, and my current schedule. Simple UI work is often about 3 to 7 days; larger custom UI sets often need a few weeks. I give a clear estimate after we review your requirements.",

    answer: (
      <>
        Timelines depend on scope, complexity, and my current schedule. Simple UI
        work is often about 3 to 7 days; larger custom UI sets often need a few
        weeks. I give a clear estimate after we review your requirements.{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionProcess)}>
          See the commission process
        </HashLink>{" "}
        or{" "}
        <Link href={contactFormHref()}>get in touch</Link>
        .
      </>
    ),
  },

  {
    question: "How do you handle project pricing and payments?",

    slug: "pricing",

    answerText:
      "Pricing is based on scope after we review the project, so it can vary. For straightforward commissions, 50% upfront and 50% on delivery is common. Studios usually negotiate a separate contract; for other clients we agree terms professionally case by case.",

    answer: (
      <>
        Pricing is based on scope after we review the project, so it can vary.
        For straightforward commissions, 50% upfront and 50% on delivery is
        common. Studios usually negotiate a separate contract; for other clients
        we agree terms professionally case by case.{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionDelivery)}>
          See delivery and support
        </HashLink>{" "}
        or{" "}
        <Link href={contactFormHref()}>get in touch</Link>
        .
      </>
    ),
  },

  {
    question: "How many revisions are included?",

    slug: "revisions",

    answerText:
      "We agree on revision rounds when we lock scope. I share work at checkpoints; reasonable layout and flow fixes within that scope are part of the build. Bigger changes or extra screens are quoted before I continue.",

    answer: (
      <>
        We agree on revision rounds when we lock scope. I share work at
        checkpoints; reasonable layout and flow fixes within that scope are part
        of the build. Bigger changes or extra screens are quoted before I
        continue.{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionProcess)}>
          See the commission process
        </HashLink>
        .
      </>
    ),
  },

  {
    question: "What payment methods do you accept?",

    slug: "payments",

    answerText:
      "PayPal, bank transfer, or card payment are standard options. I am also open to other payment methods - we agree the details in the contract before work starts.",

    answer: (
      <>
        PayPal, bank transfer, or card payment are standard options. I am also
        open to other payment methods - we agree the details in the contract
        before work starts.{" "}
        <HashLink href={commissionFaqItemHref("pricing")}>
          See pricing and payment terms
        </HashLink>
        .
      </>
    ),
  },

  {
    question: "What happens if a future Minecraft update breaks the UI?",

    slug: "support",

    answerText:
      "Minecraft Bedrock updates frequently change UI files, which can affect custom screens - though major breakage is uncommon in practice. For commissioned work, I include 30 days of support after delivery for layout issues caused by official game updates. After that, maintenance can be arranged as needed.",

    answer: (
      <>
        Minecraft Bedrock updates frequently change UI files, which can affect
        custom screens - though major breakage is uncommon in practice. For
        commissioned work, I include 30 days of support after delivery for layout
        issues caused by official game updates. After that, maintenance can be
        arranged as needed.{" "}
        <HashLink href={commissionSectionHref(SECTION_IDS.commissionDelivery)}>
          See delivery and support
        </HashLink>
        .
      </>
    ),
  },

  {
    question: "Do I receive full ownership and raw source files of the UI?",

    slug: "ownership",

    answerText:
      "Yes for standard commissions - you receive the production files we agreed on. Large commercial or studio work may need custom licensing or IP terms.",

    answer: (
      <>
        Yes for standard commissions - you receive the production files we
        agreed on. Large commercial or studio work may need custom licensing or
        IP terms.{" "}
        <HashLink href={commissionFaqItemHref("pricing")}>
          See pricing and payment terms
        </HashLink>
        .
      </>
    ),
  },

  {
    question: "Can we sign an NDA or keep the project confidential?",

    slug: "nda",

    answerText:
      "Yes. Studios often need NDAs or confidentiality terms - we can agree that before the scope review. File ownership still follows the agreed commission terms.",

    answer: (
      <>
        Yes. Studios often need NDAs or confidentiality terms - we can agree that
        before the scope review. File ownership still follows the agreed
        commission terms.{" "}
        <HashLink href={commissionFaqItemHref("ownership")}>
          See ownership and source files
        </HashLink>
        .
      </>
    ),
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

const contactAvailabilityFaq = FAQ_ITEMS.find((item) => item.slug === "availability");

export const CONTACT_FAQ_ITEMS = [
  FAQ_ITEMS.find((item) => item.slug === "value")!,
  contactAvailabilityFaq
    ? {
        ...contactAvailabilityFaq,
        answerText:
          "Yes. I am accepting custom Bedrock JsonUI commissions. Share your ideas, sketches, mockups, or a short scope outline in the form below - the more context, the faster I can reply with sensible next steps. For what I take on, limits, and web work, see the scope FAQ on the commissions page.",
        answer: (
          <>
            Yes. I am accepting custom Bedrock JsonUI commissions. Share your
            ideas, sketches, mockups, or a short scope outline in the{" "}
            <HashLink href={contactSectionHref(SECTION_IDS.contactForm)}>
              form above
            </HashLink>{" "}
            - the more context, the faster I can reply with sensible next steps.
            For what I take on, limits, and web work, see the{" "}
            <HashLink href={commissionFaqItemHref("scope")}>scope FAQ</HashLink>{" "}
            on the commissions page.
          </>
        ),
      }
    : contactAvailabilityFaq!,
];
