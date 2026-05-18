"use client";

import { useState, useRef, useEffect } from "react";
import { JoinedTabs } from "@/shared/ui/joined-tabs";
import styles from "./contact-form.module.scss";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [activeIntent, setActiveIntent] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isReady = emailRegex.test(email.trim()) && message.trim() !== "" && status === "idle";

  const intents = [
    {
      id: "custom-ui",
      label: "Custom UI",
      template: "Hello AxmBro! I'd like to order a custom UI for my Minecraft Bedrock project. Here is my concept: "
    },
    {
      id: "server-forms",
      label: "Server Forms",
      template: "Hello AxmBro! I'd like to order custom server forms for my Minecraft Bedrock project. Here is my concept: "
    },
    {
      id: "custom-hud",
      label: "Custom HUD",
      template: "Hello AxmBro! I'd like to order a custom HUD for my Minecraft Bedrock project. Here is my concept: "
    },
    {
      id: "web-dev",
      label: "Web Development",
      template: "Hello AxmBro! I'd like to talk about a web development project (e.g., custom landing page). Here is my concept: "
    },
    {
      id: "other",
      label: "Other",
      template: "Hello AxmBro! I'd like to inquire about a custom project. Here are the details: "
    }
  ];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isReady) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message, honeypot }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setMessage("");
        setHoneypot("");
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setter(e.target.value);
    if (setter === setMessage) {
      setActiveIntent(null);
    }
    if (status === "success" || status === "error") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setStatus("idle");
    }
  };

  const handleIntentClick = (intentId: string, template: string) => {
    setActiveIntent(intentId);
    setMessage(template);
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
        <input
          type="text"
          name="honeypot"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />
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
          <span className={styles.label}>What are you looking for? (Optional)</span>
          <JoinedTabs
            options={intents}
            activeId={activeIntent}
            onChange={(id) => {
              const intent = intents.find((i) => i.id === id);
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
            placeholder="Enter your message"
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
          data-status={status}
          disabled={status !== "idle"}
        >
          {status === "submitting" && "Sending..."}
          {status === "success" && "Message sent successfully! I will get back to you soon."}
          {status === "error" && "Failed to send message. Please check your connection or try again later."}
          {status === "idle" && (isReady ? "Send Message" : "Fill the form")}
        </button>
      </form>
    </div>
  );
};
