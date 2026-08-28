"use client";

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { JoinedTabs } from "@/shared/ui/joined-tabs";
import {
  clearContactFormDraft,
  getSavedContactFormDraft,
  saveContactFormDraft,
} from "@/shared/lib/contact-form-draft";
import { sendEmailAction } from "./api/send-email";
import { CONTACT_FORM_INTENTS } from "@/shared/constants/data";
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

const getSubmitHint = (email: string, message: string) => {
  if (!emailRegex.test(email.trim())) {
    return "Enter a valid email address to send your brief.";
  }

  if (message.trim() === "") {
    return "Add your project brief in the message field.";
  }

  if (isMessageOnlyPreset(message)) {
    return "Add your project scope and details below the preset.";
  }

  return null;
};

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [activeIntent, setActiveIntent] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isReady =
    emailRegex.test(email.trim()) &&
    !isMessageOnlyPreset(message) &&
    status === "idle";
  const submitHint = getSubmitHint(email, message);
  const showSubmitHint =
    hasInteracted && !isReady && status === "idle" && submitHint !== null;

  useEffect(() => {
    const draft = getSavedContactFormDraft();
    if (draft) {
      setEmail(draft.email);
      setMessage(draft.message);
      setActiveIntent(draft.activeIntent);
      if (draft.email || draft.message || draft.activeIntent) {
        setHasInteracted(true);
      }
    }
  }, []);

  useEffect(() => {
    if (status === "success") {
      clearContactFormDraft();
      return;
    }

    saveContactFormDraft({ email, message, activeIntent });
  }, [email, message, activeIntent, status]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isReady) return;

    setStatus("submitting");

    try {
      const response = await sendEmailAction(email, message);

      if (response.success) {
        setStatus("success");
        setEmail("");
        setMessage("");
        setActiveIntent(null);
        setHasInteracted(false);
        clearContactFormDraft();

        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, SUCCESS_STATUS_RESET_MS);
      } else {
        setStatus("error");

        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, ERROR_STATUS_RESET_MS);
      }
    } catch (error) {
      console.error(error);
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

  const markInteracted = () => {
    setHasInteracted(true);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    markInteracted();
    setEmail(e.target.value);
    resetStatusIfNeeded();
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    markInteracted();
    const nextMessage = e.target.value;
    setMessage(nextMessage);

    if (activeIntent && !messageMatchesIntent(nextMessage, activeIntent)) {
      setActiveIntent(null);
    }

    resetStatusIfNeeded();
  };

  const handleIntentClick = (intentId: string, template: string) => {
    markInteracted();
    setActiveIntent(intentId);
    setMessage((currentMessage) => applyIntentTemplate(currentMessage, template));
    resetStatusIfNeeded();
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            className={styles.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
            disabled={status === "submitting"}
          />
        </div>

        <div className={styles.intentWrapper}>
          <span className={styles.label} id="contact-project-type">
            Project Type (Optional)
          </span>
          <JoinedTabs
            options={CONTACT_FORM_INTENTS}
            activeId={activeIntent}
            aria-labelledby="contact-project-type"
            onChange={(id) => {
              const intent = CONTACT_FORM_INTENTS.find((item) => item.id === id);
              if (intent) {
                handleIntentClick(intent.id, intent.template);
              }
            }}
            size="small"
            disabled={status === "submitting"}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            className={styles.textarea}
            placeholder="Include the project scope, required screens, target Minecraft version, preferred timeline, and any mockups or textures you already have."
            value={message}
            onChange={handleMessageChange}
            required
            disabled={status === "submitting"}
          />
        </div>

        {showSubmitHint && (
          <p className={styles.submitHint} id="contact-submit-hint" role="status">
            {submitHint}
          </p>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          data-active={isReady ? "true" : "false"}
          disabled={!isReady}
          aria-describedby={showSubmitHint ? "contact-submit-hint" : undefined}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
        {(status === "success" || status === "error") && (
          <p
            className={styles.formStatus}
            data-status={status}
            role="status"
            aria-live="polite"
          >
            {status === "success"
              ? "Message sent. I will reply as soon as possible."
              : "Message could not be sent. Please try again or use email."}
          </p>
        )}
      </form>
    </div>
  );
};
