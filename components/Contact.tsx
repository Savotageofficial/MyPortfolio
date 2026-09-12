"use client";
import { useState, type FormEvent } from "react";
// EmailJS public configuration.
const EMAILJS_SERVICE_ID = "service_1tri3ko";
const EMAILJS_TEMPLATE_ID = "template_ya4rnes";
const EMAILJS_PUBLIC_KEY = "GcPBSs3DgtvYXQOt4";
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  // Form validation and delivery.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim(),
      email = String(data.get("email") ?? "").trim(),
      message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: name, from_email: email, message, reply_to: email },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    // Contact details and message form.
    <section className="contact container section" id="contact">
      <div className="contact-copy">
        <div className="section-label rule-label reveal">05 / Contact</div>
        <h2 className="reveal">
          Let&apos;s work
          <br />
          <em>together</em>
        </h2>
        <p className="body-copy reveal">
          Have a project in mind? I&apos;m always open to discussing new
          opportunities and interesting collaborations.
        </p>
        <div className="contact-detail reveal">
          <span className="section-label">Email</span>
          <a href="mailto:mohamedsafwat7706@gmail.com">
            mohamedsafwat7706@gmail.com
          </a>
        </div>
        <div className="contact-detail reveal">
          <span className="section-label">Location</span>
          <span>Cairo, Egypt (Remote-friendly)</span>
        </div>
        <div className="socials reveal">
          <a
            href="https://github.com/Savotageofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://linkedin.com/in/mohamed-safwat-169968314/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <form id="contact-form" className="reveal" onSubmit={handleSubmit}>
        <label htmlFor="name" className="section-label">
          Your name
        </label>
        <input
          name="name"
          id="name"
          placeholder="Jane Smith"
          required
          autoComplete="name"
          maxLength={100}
        />
        <label htmlFor="email" className="section-label">
          Email address
        </label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="jane@example.com"
          required
          autoComplete="email"
        />
        <label htmlFor="message" className="section-label">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          placeholder="Tell me about your project…"
          required
          maxLength={5000}
        ></textarea>
        <button
          type="submit"
          className="solid-button"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send message"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
        <p className="form-note" id="form-note" role="status">
          {status === "sent"
            ? "Message sent. Thank you for getting in touch!"
            : status === "error"
              ? "Something went wrong. Please email me directly."
              : ""}
        </p>
      </form>
    </section>
  );
}
