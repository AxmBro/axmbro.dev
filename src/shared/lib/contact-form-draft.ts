import { CONTACT_FORM_INTENTS } from "@/shared/constants/data";

const CONTACT_FORM_EMAIL_KEY = "contactFormEmail";
const CONTACT_FORM_MESSAGE_KEY = "contactFormMessage";
const CONTACT_FORM_INTENT_KEY = "contactFormIntent";

export type ContactFormDraft = {
  email: string;
  message: string;
  activeIntent: string | null;
};

const isContactFormIntentId = (value: string) =>
  CONTACT_FORM_INTENTS.some((intent) => intent.id === value);

export const getSavedContactFormDraft = (): ContactFormDraft | null => {
  try {
    const email = sessionStorage.getItem(CONTACT_FORM_EMAIL_KEY) ?? "";
    const message = sessionStorage.getItem(CONTACT_FORM_MESSAGE_KEY) ?? "";
    const savedIntent = sessionStorage.getItem(CONTACT_FORM_INTENT_KEY);
    const activeIntent =
      savedIntent && isContactFormIntentId(savedIntent) ? savedIntent : null;

    if (!email && !message && !activeIntent) {
      return null;
    }

    return { email, message, activeIntent };
  } catch {
    return null;
  }
};

export const saveContactFormDraft = (draft: ContactFormDraft) => {
  try {
    if (draft.email) {
      sessionStorage.setItem(CONTACT_FORM_EMAIL_KEY, draft.email);
    } else {
      sessionStorage.removeItem(CONTACT_FORM_EMAIL_KEY);
    }

    if (draft.message) {
      sessionStorage.setItem(CONTACT_FORM_MESSAGE_KEY, draft.message);
    } else {
      sessionStorage.removeItem(CONTACT_FORM_MESSAGE_KEY);
    }

    if (draft.activeIntent) {
      sessionStorage.setItem(CONTACT_FORM_INTENT_KEY, draft.activeIntent);
    } else {
      sessionStorage.removeItem(CONTACT_FORM_INTENT_KEY);
    }
  } catch {}
};

export const clearContactFormDraft = () => {
  try {
    sessionStorage.removeItem(CONTACT_FORM_EMAIL_KEY);
    sessionStorage.removeItem(CONTACT_FORM_MESSAGE_KEY);
    sessionStorage.removeItem(CONTACT_FORM_INTENT_KEY);
  } catch {}
};
