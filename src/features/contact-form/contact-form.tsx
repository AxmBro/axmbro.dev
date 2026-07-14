"use client";

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { JoinedTabs } from "@/shared/ui/joined-tabs";
import { sendEmailAction } from "./api/send-email";
import { CONTACT_FORM_INTENTS } from "@/shared/constants/data";
import styles from "./contact-form.module.scss";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [activeIntent, setActiveIntent] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isReady = emailRegex.test(email.trim()) && message.trim() !== "" && status === "idle";

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

        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, 15000);
      } else {
        setStatus("error");

        timeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");

      timeoutRef.current = setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  const handleInputChange = (setter: (val: string) => void) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setter(e.target.value);
    if (status === "success" || status === "error") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setStatus("idle");
    }
  };

  const handleIntentClick = (intentId: string, template: string) => {
    setActiveIntent(intentId);
    setMessage((currentMessage) => {
      const containsOnlyTemplate =
        currentMessage === "" ||
        CONTACT_FORM_INTENTS.some((intent) => intent.template === currentMessage);

      return containsOnlyTemplate ? template : currentMessage;
    });
    if (status === "success" || status === "error") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setStatus("idle");
    }
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
            onChange={handleInputChange(setEmail)}
            required
            disabled={status === "submitting"}
          />
        </div>

        <div className={styles.intentWrapper}>
          <span className={styles.label}>Project Type (Optional)</span>
          <JoinedTabs
            options={CONTACT_FORM_INTENTS}
            activeId={activeIntent}
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
            onChange={handleInputChange(setMessage)}
            required
            disabled={status === "submitting"}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          data-active={isReady ? "true" : "false"}
          disabled={!isReady}
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
