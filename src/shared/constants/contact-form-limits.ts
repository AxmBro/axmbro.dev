// Shared field caps: the client sets maxLength for UX, the contact form server action
// re-checks the same numbers because a direct action call bypasses the form entirely.
export const CONTACT_FORM_LIMITS = {
  email: 254,
  discord: 64,
  message: 5000,
} as const;

export const CONTACT_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
