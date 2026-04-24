"use client";

import { motion, useMotionValue } from "framer-motion";
import { useActionState, type PointerEvent } from "react";
import ReactiveBackdrop from "../components/portfolio/reactive-backdrop";
import { useLanguage } from "../components/language-provider";
import { type ContactFormState, sendContactMessage } from "./actions";

const CONTACT_EMAIL = "andreas.schellekens8@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/andreas-schellekens/";
const GITHUB_URL = "https://github.com/Andreas-Schellekens";
const initialContactFormState: ContactFormState = { status: "idle" };

const content = {
  nl: {
    badge: "Contact",
    title: "Start je project",
    intro: "Gebruik dit formulier en ik stuur je zo snel mogelijk een antwoord terug.",
    formTitle: "Stuur een bericht",
    formBody: "Vertel kort over je project, timing en doelen. Je bericht wordt rechtstreeks doorgestuurd naar mijn mailbox.",
    nameLabel: "Naam",
    emailLabel: "E-mailadres",
    subjectLabel: "Onderwerp",
    messageLabel: "Bericht",
    submitLabel: "Bericht verzenden",
    sendingLabel: "Bezig met verzenden...",
    idleMessage: "Ik antwoord normaal binnen 1-2 werkdagen.",
    successMessage: "Bedankt! Je bericht is verzonden.",
    validationMessage: "Controleer je invoer en probeer opnieuw.",
    activationMessage: "Eerst het FormSubmit-activatiemailtje openen en op 'Activate Form' klikken.",
    sendErrorMessage: "Verzenden is niet gelukt. Probeer straks opnieuw.",
    detailsTitle: "Andere manieren om contact op te nemen",
    detailsBody: "Je kan me ook bereiken via onderstaande links.",
    linkedInLabel: "LinkedIn",
    githubLabel: "GitHub",
  },
  en: {
    badge: "Contact",
    title: "Start your project",
    intro: "Use this form and I will get back to you as soon as possible.",
    formTitle: "Send a message",
    formBody: "Share a short summary of your project, timing, and goals. Your message is sent directly to my inbox.",
    nameLabel: "Name",
    emailLabel: "Email address",
    subjectLabel: "Subject",
    messageLabel: "Message",
    submitLabel: "Send message",
    sendingLabel: "Sending...",
    idleMessage: "I usually reply within 1-2 working days.",
    successMessage: "Thanks! Your message has been sent.",
    validationMessage: "Please check your input and try again.",
    activationMessage: "Please open the FormSubmit activation email and click 'Activate Form' first.",
    sendErrorMessage: "Sending failed. Please try again later.",
    detailsTitle: "Other ways to connect",
    detailsBody: "You can also reach me through these links.",
    linkedInLabel: "LinkedIn",
    githubLabel: "GitHub",
  },
} as const;

export default function ContactPage() {
  const { language } = useLanguage();
  const t = content[language];
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactFormState);

  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    cursorX.set(x);
    cursorY.set(y);
  };

  const resetCursorPosition = () => {
    cursorX.set(50);
    cursorY.set(50);
  };

  const statusMessage =
    state.status === "success"
      ? t.successMessage
      : state.status === "error"
        ? state.reason === "validation"
          ? t.validationMessage
          : state.reason === "activation"
            ? t.activationMessage
            : state.providerMessage ?? t.sendErrorMessage
        : t.idleMessage;

  const statusClass =
    state.status === "success"
      ? "contact-form-message-success"
      : state.status === "error"
        ? "contact-form-message-error"
        : "contact-form-message-idle";

  return (
    <div className="portfolio-root" onPointerMove={handlePointerMove} onPointerLeave={resetCursorPosition}>
      <ReactiveBackdrop cursorX={cursorX} cursorY={cursorY} />

      <main className="portfolio-main">
        <motion.section
          className="portfolio-section space-y-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-pill">
            <span className="hero-pill-dot" />
            {t.badge}
          </p>
          <h1 className="portfolio-section-title">{t.title}</h1>
          <p className="portfolio-section-subtitle">{t.intro}</p>
        </motion.section>

        <section className="portfolio-section grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            className="portfolio-contact-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="portfolio-contact-title text-3xl">{t.formTitle}</h2>
            <p className="portfolio-contact-body">{t.formBody}</p>

            <form action={formAction} className="contact-form">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" />

              <label className="contact-form-field">
                <span className="contact-form-label">{t.nameLabel}</span>
                <input
                  className="contact-form-input"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={120}
                />
              </label>

              <label className="contact-form-field">
                <span className="contact-form-label">{t.emailLabel}</span>
                <input
                  className="contact-form-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={180}
                />
              </label>

              <label className="contact-form-field">
                <span className="contact-form-label">{t.subjectLabel}</span>
                <input
                  className="contact-form-input"
                  type="text"
                  name="subject"
                  required
                  minLength={2}
                  maxLength={140}
                />
              </label>

              <label className="contact-form-field">
                <span className="contact-form-label">{t.messageLabel}</span>
                <textarea
                  className="contact-form-textarea"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={7}
                />
              </label>

              <button type="submit" disabled={pending} className="portfolio-btn-primary w-full sm:w-auto">
                {pending ? t.sendingLabel : t.submitLabel}
              </button>

              <p className={`contact-form-message ${statusClass}`} aria-live="polite">
                {statusMessage}
              </p>
            </form>
          </motion.article>

          <motion.aside
            className="trajectory-card space-y-5"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.04, duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">{t.detailsTitle}</h2>
              <p className="trajectory-card-body">{t.detailsBody}</p>
            </div>

            <div className="space-y-2">
              <p className="contact-form-label">{t.emailLabel}</p>
              <p className="break-words text-slate-100">{CONTACT_EMAIL}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="portfolio-btn-secondary"
              >
                {t.linkedInLabel}
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="portfolio-btn-secondary">
                {t.githubLabel}
              </a>
            </div>
          </motion.aside>
        </section>
      </main>
    </div>
  );
}
