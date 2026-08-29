"use client";

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { JoinedTabs } from "@/shared/ui/joined-tabs";
import {
  clearContactFormDraft,
  getInitialContactFormDraft,
  saveContactFormDraft,
} from "@/shared/lib/contact-form-draft";
import { sendEmailAction } from "./api/send-email";
import { CONTACT_FORM_INTENTS, CONTACT_FORM_TEXTS } from "@/shared/constants/data";
import styles from "./contact-form.module.scss";

const SUCCESS_STATUS_RESET_MS = 15000;
const ERROR_STATUS_RESET_MS = 5000;

const isMessageOnlyPreset = (value: string) => {
  const trimmed = value.trim();
  if (trimmed === "") return true;

  return CONTACT_FORM_INTENTS.some((intent) => {
    const template = intent.template.trim();
    if (trimmed === template) return true;
    if (!trimmed.startsWith(template)) return false;
    return trimmed.slice(template.length).trim() === "";
  });
};

const findIntentForMessage = (value: string) =>
  CONTACT_FORM_INTENTS.find((intent) => value.startsWith(intent.template)) ?? null;

const messageMatchesIntent = (value: string, intentId: string) =>
  findIntentForMessage(value)?.id === intentId;

const applyIntentTemplate = (currentMessage: string, template: string) => {
  if (currentMessage.trim() === "") {
    return template;
  }

  const matchedIntent = findIntentForMessage(currentMessage);
  if (matchedIntent) {
    return template + currentMessage.slice(matchedIntent.template.length);
  }

  return template;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormField = "email" | "message";

type ContactFormValidation = {
  hint: string;
  fields: ContactFormField[];
};

const getFormValidation = (email: string, message: string): ContactFormValidation | null => {
  const invalidFields: ContactFormField[] = [];

  if (!emailRegex.test(email.trim())) {
    invalidFields.push("email");
  }

  if (message.trim() === "" || isMessageOnlyPreset(message)) {
    invalidFields.push("message");
  }

  if (invalidFields.length === 0) {
    return null;
  }

  if (invalidFields.includes("email")) {
    return {
      hint: CONTACT_FORM_TEXTS.validation.email,
      fields: invalidFields,
    };
  }

  if (message.trim() === "") {
    return {
      hint: CONTACT_FORM_TEXTS.validation.emptyMessage,
      fields: invalidFields,
    };
  }

  return {
    hint: CONTACT_FORM_TEXTS.validation.presetOnly,
    fields: invalidFields,
  };
};

export const ContactForm = () => {
  const [email, setEmail] = useState(() => getInitialContactFormDraft().email);
  const [discord, setDiscord] = useState(() => getInitialContactFormDraft().discord);
  const [message, setMessage] = useState(() => getInitialContactFormDraft().message);
  const [activeIntent, setActiveIntent] = useState(
    () => getInitialContactFormDraft().activeIntent,
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>(CONTACT_FORM_TEXTS.error);
  const [showValidation, setShowValidation] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const validation = getFormValidation(email, message);
  const isReady = validation === null && status === "idle";
  const showSubmitHint =
    showValidation && !isReady && status === "idle" && validation !== null;

  useEffect(() => {
    if (status === "success") {
      clearContactFormDraft();
      return;
    }

    saveContactFormDraft({ email, discord, message, activeIntent });
  }, [email, discord, message, activeIntent, status]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowValidation(true);

    if (!isReady) return;

    setStatus("submitting");

    try {
      const formData = new FormData(e.currentTarget);
      const honeypot = String(formData.get("company") ?? "");
      const response = await sendEmailAction(email, discord, message, honeypot);

      if (response.success) {
        setStatus("success");
        setEmail("");
        setDiscord("");
        setMessage("");
        setActiveIntent(null);
        setShowValidation(false);
        clearContactFormDraft();
        e.currentTarget.reset();

        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, SUCCESS_STATUS_RESET_MS);
      } else {
        setErrorMessage(
          response.reason === "unavailable"
            ? CONTACT_FORM_TEXTS.errorUnavailable
            : CONTACT_FORM_TEXTS.error,
        );
        setStatus("error");

        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, ERROR_STATUS_RESET_MS);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(CONTACT_FORM_TEXTS.error);
      setStatus("error");

      timeoutRef.current = setTimeout(() => {
        setStatus("idle");
      }, ERROR_STATUS_RESET_MS);
    }
  };

  const resetStatusIfNeeded = () => {
    if (status === "success" || status === "error") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setStatus("idle");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    resetStatusIfNeeded();
  };

  const handleDiscordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscord(e.target.value);
    resetStatusIfNeeded();
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nextMessage = e.target.value;
    setMessage(nextMessage);

    if (activeIntent && !messageMatchesIntent(nextMessage, activeIntent)) {
      setActiveIntent(null);
    }

    resetStatusIfNeeded();
  };

  const handleIntentClick = (intentId: string, template: string) => {
    setActiveIntent(intentId);
    setMessage((currentMessage) => applyIntentTemplate(currentMessage, template));
    resetStatusIfNeeded();
  };

  const handleIntentTabChange = (id: string) => {
    const intent = CONTACT_FORM_INTENTS.find((item) => item.id === id);
    if (intent) {
      handleIntentClick(intent.id, intent.template);
    }
  };

  const invalidFields = showValidation && validation ? validation.fields : [];

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="contact-email">
              {CONTACT_FORM_TEXTS.emailLabel}
            </label>
            <input
              id="contact-email"
              className={styles.input}
              type="email"
              name="email"
              autoComplete="email"
              placeholder={CONTACT_FORM_TEXTS.emailPlaceholder}
              value={email}
              onChange={handleEmailChange}
              data-invalid={invalidFields.includes("email") ? "true" : undefined}
              disabled={status === "submitting"}
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="contact-discord">
              {CONTACT_FORM_TEXTS.discordLabel}
            </label>
            <input
              id="contact-discord"
              className={styles.input}
              type="text"
              name="discord"
              autoComplete="off"
              placeholder={CONTACT_FORM_TEXTS.discordPlaceholder}
              value={discord}
              onChange={handleDiscordChange}
              disabled={status === "submitting"}
            />
          </div>
        </div>

        <div className={styles.intentWrapper}>
          <span className={styles.label} id="contact-project-type">
            {CONTACT_FORM_TEXTS.topicLabel}
          </span>
          <JoinedTabs
            options={CONTACT_FORM_INTENTS}
            activeId={activeIntent}
            aria-labelledby="contact-project-type"
            onChange={handleIntentTabChange}
            size="small"
            disabled={status === "submitting"}
          />
        </div>

        <textarea
          id="contact-message"
          className={styles.textarea}
          name="message"
          aria-label="Message"
          placeholder={CONTACT_FORM_TEXTS.messagePlaceholder}
          value={message}
          onChange={handleMessageChange}
          data-invalid={invalidFields.includes("message") ? "true" : undefined}
          disabled={status === "submitting"}
        />

        {showSubmitHint && (
          <p className={styles.submitHint} id="contact-submit-hint" role="status">
            {validation?.hint}
          </p>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          data-active={isReady ? "true" : "false"}
          disabled={status === "submitting"}
          aria-describedby={showSubmitHint ? "contact-submit-hint" : undefined}
        >
          {status === "submitting" ? CONTACT_FORM_TEXTS.submitting : CONTACT_FORM_TEXTS.submit}
        </button>
        {(status === "success" || status === "error") && (
          <p
            className={styles.formStatus}
            data-status={status}
            role="status"
            aria-live="polite"
          >
            {status === "success"
              ? CONTACT_FORM_TEXTS.success
              : errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};
