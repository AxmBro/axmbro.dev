export interface LegalItem {
  title: string;
  text: string;
}

export const PRIVACY_POLICY_ITEMS: LegalItem[] = [
  {
    title: "Introduction",
    text: "This Privacy Policy explains how axmbro.dev processes personal data when you use the website and its contact form. We respect your privacy and process all data transparently and in compliance with current legal regulations (GDPR)."
  },
  {
    title: "Data Controller",
    text: "The sole administrator of your personal data collected via this website is AxmBro (owner of the axmbro.dev portfolio website)."
  },
  {
    title: "Data Collected via Contact Form",
    text: "When you submit a message using our contact form, we collect your email address and any personal information you choose to include in the message body. We do not use marketing newsletters."
  },
  {
    title: "Website Analytics",
    text: "We use Vercel Analytics for basic page views (no cookies). Google Analytics 4 runs only if you accept analytics cookies in the banner."
  },
  {
    title: "Cookies",
    text: "You can accept or reject analytics cookies on your first visit. Rejecting disables GA4. Clear site data to choose again."
  },
  {
    title: "Purpose & Legal Basis",
    text: "Contact form data is processed to respond to your message (consent when sending). Analytics helps measure site usage. GA4 requires your cookie consent."
  },
  {
    title: "Data Retention",
    text: "Your personal data is stored only for as long as necessary to carry out the communication, answer your queries, or until you explicitly request its complete removal."
  },
  {
    title: "Your Rights",
    text: "You have the right to access your personal data, request rectification, request restriction of processing, or demand complete deletion of your records from our inbox at any time."
  }
];

export const TERMS_OF_USE_ITEMS: LegalItem[] = [
  {
    title: "Use of the Site",
    text: "This site is a personal portfolio showcasing my work. You may view the content for personal purposes only."
  },
  {
    title: "Intellectual Property",
    text: "All content (text, images, code) is the property of AxmBro - owner of the axmbro.dev website. Do not copy, modify, or redistribute it without written permission."
  },
  {
    title: "No Warranty",
    text: "The site is provided \"as is\". I am not liable for any errors, omissions, or damages arising from its use."
  },
  {
    title: "External Links",
    text: "I am not responsible for content on third-party websites linked here."
  },
  {
    title: "Changes to Terms",
    text: "I may update these Terms at any time. Continued use after changes constitutes acceptance."
  },
  {
    title: "Governing Law",
    text: "These Terms are governed by the laws of Poland."
  }
];
