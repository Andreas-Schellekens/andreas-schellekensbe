"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import type { PortfolioLocale } from "./content";

type ContactStepperFormProps = {
  contact: PortfolioLocale["contact"];
};

type FormValues = {
  name: string;
  senderEmail: string;
  subject: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactStepperForm({ contact }: ContactStepperFormProps) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    senderEmail: "",
    subject: "",
    message: "",
  });

  const steps = contact.form.steps;
  const progress = ((step + 1) / steps.length) * 100;

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `[Portfolio] ${formValues.subject.trim() || contact.form.subjectLabel}`,
    );
    const body = encodeURIComponent(
      `${contact.form.nameLabel}: ${formValues.name.trim()}\n` +
        `${contact.form.senderEmailLabel}: ${formValues.senderEmail.trim()}\n\n` +
        `${contact.form.messageLabel}:\n${formValues.message.trim()}`,
    );

    return `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }, [
    contact.email,
    contact.form.messageLabel,
    contact.form.nameLabel,
    contact.form.senderEmailLabel,
    contact.form.subjectLabel,
    formValues.message,
    formValues.name,
    formValues.senderEmail,
    formValues.subject,
  ]);

  const setField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
    if (error) setError("");
  };

  const validateCurrentStep = () => {
    if (step === 0) {
      if (!formValues.name.trim() || !formValues.senderEmail.trim()) {
        setError(contact.form.requiredError);
        return false;
      }

      if (!emailPattern.test(formValues.senderEmail.trim())) {
        setError(contact.form.invalidEmailError);
        return false;
      }
    }

    if (step === 1 && (!formValues.subject.trim() || !formValues.message.trim())) {
      setError(contact.form.requiredError);
      return false;
    }

    setError("");
    return true;
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;
    setStep((previous) => Math.min(previous + 1, steps.length - 1));
  };

  const goBack = () => {
    setError("");
    setStep((previous) => Math.max(previous - 1, 0));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateCurrentStep()) return;
    window.location.href = mailtoHref;
  };

  return (
    <form className="contact-stepper-shell" onSubmit={handleSubmit}>
      <div className="contact-stepper-progress-track" aria-hidden>
        <motion.span
          className="contact-stepper-progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <ol className="contact-stepper-list" aria-label={steps.join(" / ")}>
        {steps.map((label, index) => (
          <li key={label} className="contact-stepper-item">
            <span className={`contact-stepper-index ${index <= step ? "contact-stepper-index-active" : ""}`}>
              {index + 1}
            </span>
            <span className={`contact-stepper-label ${index === step ? "contact-stepper-label-active" : ""}`}>
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="contact-stepper-panel-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="contact-stepper-panel"
          >
            {step === 0 && (
              <div className="contact-stepper-fields">
                <label className="contact-stepper-field">
                  <span>{contact.form.nameLabel}</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formValues.name}
                    onChange={setField}
                    placeholder={contact.form.namePlaceholder}
                  />
                </label>
                <label className="contact-stepper-field">
                  <span>{contact.form.senderEmailLabel}</span>
                  <input
                    type="email"
                    name="senderEmail"
                    autoComplete="email"
                    value={formValues.senderEmail}
                    onChange={setField}
                    placeholder={contact.form.senderEmailPlaceholder}
                  />
                </label>
              </div>
            )}

            {step === 1 && (
              <div className="contact-stepper-fields">
                <label className="contact-stepper-field">
                  <span>{contact.form.subjectLabel}</span>
                  <input
                    type="text"
                    name="subject"
                    value={formValues.subject}
                    onChange={setField}
                    placeholder={contact.form.subjectPlaceholder}
                  />
                </label>
                <label className="contact-stepper-field">
                  <span>{contact.form.messageLabel}</span>
                  <textarea
                    name="message"
                    value={formValues.message}
                    onChange={setField}
                    placeholder={contact.form.messagePlaceholder}
                    rows={5}
                  />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="contact-stepper-review">
                <h3>{contact.form.reviewTitle}</h3>
                <dl>
                  <div>
                    <dt>{contact.form.nameLabel}</dt>
                    <dd>{formValues.name}</dd>
                  </div>
                  <div>
                    <dt>{contact.form.senderEmailLabel}</dt>
                    <dd>{formValues.senderEmail}</dd>
                  </div>
                  <div>
                    <dt>{contact.form.subjectLabel}</dt>
                    <dd>{formValues.subject}</dd>
                  </div>
                  <div>
                    <dt>{contact.form.messageLabel}</dt>
                    <dd>{formValues.message}</dd>
                  </div>
                </dl>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {error ? <p className="contact-stepper-error">{error}</p> : null}

      <div className="contact-stepper-actions">
        <button
          type="button"
          className="contact-stepper-btn contact-stepper-btn-secondary"
          onClick={goBack}
          disabled={step === 0}
        >
          {contact.form.backLabel}
        </button>

        {step < steps.length - 1 ? (
          <button type="button" className="contact-stepper-btn contact-stepper-btn-primary" onClick={goNext}>
            {contact.form.nextLabel}
          </button>
        ) : (
          <button type="submit" className="contact-stepper-btn contact-stepper-btn-primary">
            {contact.form.sendLabel}
          </button>
        )}
      </div>
    </form>
  );
}
