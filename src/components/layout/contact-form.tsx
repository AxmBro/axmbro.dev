import React, { useState } from "react";
import styles from "./contact-form.module.css";
import { Button, ButtonColor } from "../button/Button";

const ConactForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, message }),
    });

    if (response.ok) {
      alert("Message sent!");
      setEmail("");
      setMessage("");
    } else {
      alert("Failed to send message.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.contactFormInput}
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required />
      <textarea
        className={styles.contactFormTextarea}
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required>
      </textarea>
      <button className={styles.contactFormSubmit} type="submit">
        <Button text="Submit" style={{ width: "100%" }} buttonColor={ButtonColor.defaultEmpty2}>
        </Button>
      </button>
    </form>
  );
}

export { ConactForm };
