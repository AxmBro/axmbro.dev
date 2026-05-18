export interface LegalItem {
  title: string;
  content: string;
}

export const PRIVACY_POLICY_ITEMS: LegalItem[] = [
  {
    title: "Introduction",
    content: "This Privacy Policy explains how axmbro.dev processes personal data when you use the website and its contact form. We respect your privacy and process all data transparently and in compliance with current legal regulations (GDPR)."
  },
  {
    title: "Data Controller",
    content: "The sole administrator of your personal data collected via this website is AxmBro (owner of the axmbro.dev portfolio website)."
  },
  {
    title: "Data Collected via Contact Form",
    content: "When you submit a message using our contact form, we collect your email address, and any personal information you choose to include in the message body. We do not use tracking cookies or marketing newsletters."
  },
  {
    title: "Purpose & Legal Basis",
    content: "We process your personal data exclusively to respond to your inquiries, provide support, and manage communication. The legal basis for processing is your explicit consent (by sending the form) and our legitimate interest in communicating with users."
  },
  {
    title: "Data Retention",
    content: "Your personal data is stored only for as long as necessary to carry out the communication, answer your queries, or until you explicitly request its complete removal."
  },
  {
    title: "Your Rights",
    content: "You have the right to access your personal data, request rectification, request restriction of processing, or demand complete deletion of your records from our inbox at any time."
  }
];

export const TERMS_OF_USE_ITEMS: LegalItem[] = [
  {
    title: "Use of the Site",
    content: "This site is a personal portfolio showcasing my work. You may view the content for personal purposes only."
  },
  {
    title: "Intellectual Property",
    content: "All content (text, images, code) is the property of Axmbro - owner of axmbro.dev website. Do not copy, modify, or redistribute it without written permission."
  },
  {
    title: "No Warranty",
    content: "The site is provided \"as is\". I am not liable for any errors, omissions, or damages arising from its use."
  },
  {
    title: "External Links",
    content: "I am not responsible for content on third-party websites linked here."
  },
  {
    title: "Changes to Terms",
    content: "I may update these Terms at any time. Continued use after changes constitutes acceptance."
  },
  {
    title: "Governing Law",
    content: "These Terms are governed by the laws of Poland."
  }
];
