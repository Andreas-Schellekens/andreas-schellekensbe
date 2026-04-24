"use server";

import { headers } from "next/headers";

const CONTACT_EMAIL = "andreas.schellekens8@gmail.com";
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  reason?: "validation" | "activation" | "send";
  providerMessage?: string;
};

type FormSubmitResult = {
  success?: string | boolean;
  message?: string;
};

function readValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = readValue(formData, "website");
  if (honeypot) {
    return { status: "success" };
  }

  const name = readValue(formData, "name");
  const email = readValue(formData, "email");
  const subject = readValue(formData, "subject");
  const message = readValue(formData, "message");

  if (
    name.length < 2 ||
    name.length > 120 ||
    !EMAIL_PATTERN.test(email) ||
    subject.length < 2 ||
    subject.length > 140 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return { status: "error", reason: "validation" };
  }

  try {
    const incomingHeaders = await headers();
    const origin = incomingHeaders.get("origin");
    const referer = incomingHeaders.get("referer");

    const response = await fetch(FORM_SUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(origin ? { Origin: origin } : {}),
        ...(referer ? { Referer: referer } : {}),
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        _subject: `Portfolio contact: ${subject}`,
        _template: "table",
        _captcha: "false",
      }),
      cache: "no-store",
    });

    const rawBody = await response.text();
    let parsed: FormSubmitResult | null = null;

    try {
      parsed = JSON.parse(rawBody) as FormSubmitResult;
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      return {
        status: "error",
        reason: "send",
        providerMessage: parsed?.message ?? `Request failed with status ${response.status}.`,
      };
    }

    const submitSucceeded = parsed?.success === true || parsed?.success === "true";
    if (!submitSucceeded) {
      const providerMessage = parsed?.message ?? "The email provider did not confirm delivery.";
      const activationNeeded = /activat/i.test(providerMessage);

      return {
        status: "error",
        reason: activationNeeded ? "activation" : "send",
        providerMessage,
      };
    }

    return { status: "success" };
  } catch {
    return { status: "error", reason: "send" };
  }
}
