"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent, type ReactNode } from "react";
import PageShell from "../../components/portfolio/page-shell";
import { portfolioContent } from "../../components/portfolio/content";
import { useLanguage } from "../../components/language-provider";

// Contact details are the same in every language.
const { email: CONTACT_EMAIL, linkedinUrl: LINKEDIN_URL, githubUrl: GITHUB_URL } = portfolioContent.nl.contact;
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormState = {
  status: "idle" | "success" | "error";
  reason?: "validation" | "activation" | "send";
};

type FormSubmitResult = {
  success?: string | boolean;
  message?: string;
};

const initialContactFormState: ContactFormState = { status: "idle" };

const FIELDS = ["name", "email", "subject", "message"] as const;

type FieldName = (typeof FIELDS)[number];
type FieldValues = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;

function readField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function validateField(field: FieldName, value: string, errors: ContactCopy["errors"]): string | undefined {
  switch (field) {
    case "name":
      if (!value) return errors.nameRequired;
      if (value.length < 2) return errors.nameTooShort;
      return undefined;
    case "email":
      if (!value) return errors.emailRequired;
      if (!EMAIL_PATTERN.test(value)) return errors.emailInvalid;
      return undefined;
    case "subject":
      if (!value) return errors.subjectRequired;
      if (value.length < 2) return errors.subjectTooShort;
      return undefined;
    case "message":
      if (!value) return errors.messageRequired;
      if (value.length < 10) return errors.messageTooShort(value.length);
      return undefined;
  }
}

function validateAll(values: FieldValues, errors: ContactCopy["errors"]): FieldErrors {
  const result: FieldErrors = {};
  for (const field of FIELDS) {
    const error = validateField(field, values[field], errors);
    if (error) result[field] = error;
  }
  return result;
}

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
    validationMessage: "Niet alle velden zijn correct ingevuld. Bekijk de meldingen hierboven.",
    errors: {
      nameRequired: "Vul je naam in.",
      nameTooShort: "Je naam moet minstens 2 tekens lang zijn.",
      emailRequired: "Vul je e-mailadres in.",
      emailInvalid: "Dit lijkt geen geldig e-mailadres. Bijvoorbeeld: naam@voorbeeld.be",
      subjectRequired: "Vul een onderwerp in.",
      subjectTooShort: "Het onderwerp moet minstens 2 tekens lang zijn.",
      messageRequired: "Schrijf een bericht.",
      messageTooShort: (length: number) => `Je bericht moet minstens 10 tekens lang zijn (nu ${length}).`,
    },
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
    validationMessage: "Some fields need attention. Check the messages above.",
    errors: {
      nameRequired: "Please enter your name.",
      nameTooShort: "Your name needs at least 2 characters.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "This does not look like a valid email address, e.g. name@example.com",
      subjectRequired: "Please enter a subject.",
      subjectTooShort: "The subject needs at least 2 characters.",
      messageRequired: "Please write a message.",
      messageTooShort: (length: number) => `Your message needs at least 10 characters (currently ${length}).`,
    },
    activationMessage: "Please open the FormSubmit activation email and click 'Activate Form' first.",
    sendErrorMessage: "Sending failed. Please try again later.",
    detailsTitle: "Other ways to connect",
    detailsBody: "You can also reach me through these links.",
    linkedInLabel: "LinkedIn",
    githubLabel: "GitHub",
  },
} as const;

type ContactCopy = (typeof content)[keyof typeof content];

export default function ContactView() {
  const { language } = useLanguage();
  const t = content[language];
  const [state, setState] = useState(initialContactFormState);
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Once a field shows an error, re-check it while the visitor types so the message clears as soon as it is fixed.
  const handleFieldInput = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const field = target.name as FieldName;
    if (!fieldErrors[field]) return;

    const error = validateField(field, target.value.trim(), t.errors);
    const next = { ...fieldErrors, [field]: error };
    setFieldErrors(next);
    if (state.reason === "validation" && FIELDS.every((name) => !next[name])) {
      setState(initialContactFormState);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (readField(formData, "website").length > 0) {
      setState({ status: "success" });
      form.reset();
      return;
    }

    const values: FieldValues = {
      name: readField(formData, "name"),
      email: readField(formData, "email"),
      subject: readField(formData, "subject"),
      message: readField(formData, "message"),
    };
    const { name, email, subject, message } = values;

    const errors = validateAll(values, t.errors);
    setFieldErrors(errors);

    const firstInvalid = FIELDS.find((field) => errors[field]);
    if (firstInvalid) {
      setState({ status: "error", reason: "validation" });
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setPending(true);

    try {
      const response = await fetch(FORM_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: `Portfolio contact: ${subject}`,
          _template: "table",
          _captcha: "false",
          _url: window.location.href,
        }),
      });

      const rawBody = await response.text();
      let parsed: FormSubmitResult | null = null;

      try {
        parsed = JSON.parse(rawBody) as FormSubmitResult;
      } catch {
        parsed = null;
      }

      const submitSucceeded = response.ok && (parsed?.success === true || parsed?.success === "true");
      if (!submitSucceeded) {
        // The provider's message is English-only, so log it and show our own localized text.
        const providerMessage = parsed?.message ?? `Request failed with status ${response.status}.`;
        console.error("Contact form submission failed:", providerMessage);

        setState({
          status: "error",
          reason: /activat/i.test(providerMessage) ? "activation" : "send",
        });
        return;
      }

      setState({ status: "success" });
      form.reset();
    } catch {
      setState({ status: "error", reason: "send" });
    } finally {
      setPending(false);
    }
  };

  const statusMessage =
    state.status === "success"
      ? t.successMessage
      : state.status === "error"
        ? state.reason === "validation"
          ? t.validationMessage
          : state.reason === "activation"
            ? t.activationMessage
            : t.sendErrorMessage
        : t.idleMessage;

  const statusClass =
    state.status === "success"
      ? "contact-form-message-success"
      : state.status === "error"
        ? "contact-form-message-error"
        : "contact-form-message-idle";

  return (
    <PageShell>
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

          <form onSubmit={handleSubmit} onInput={handleFieldInput} noValidate className="contact-form">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />

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
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
              />
              <FieldError id="name-error">{fieldErrors.name}</FieldError>
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
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
              <FieldError id="email-error">{fieldErrors.email}</FieldError>
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
                aria-invalid={Boolean(fieldErrors.subject)}
                aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
              />
              <FieldError id="subject-error">{fieldErrors.subject}</FieldError>
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
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
              />
              <FieldError id="message-error">{fieldErrors.message}</FieldError>
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
    </PageShell>
  );
}

function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <span id={id} className="contact-form-field-error">
      {children}
    </span>
  );
}
