import { useState } from "react";
import styles from "./contact-form.module.css";
import { Button } from "../button/button";
import global_styles from "../../components/global/global-styles.module.css";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
    catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>

        <p>Email</p>
        <input
          className={`${global_styles.formInputText}`}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
      </div>
      <div>
        <p>Message</p>
        <textarea
          className={global_styles.formTextArea}
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required>
        </textarea>
      </div>
      <Button text="Submit" type="submit" style={{ width: "100%", minHeight: "2.75rem" }} buttonColor={(email && message) ? "default" : "defaultEmpty2"} />
    </form>
  );
}

export { ContactForm };
