"use client";

import { useState, type FormEvent, type HTMLInputTypeAttribute } from "react";
import { accountAction } from "./AccountLayout";

export type Field = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  inputMode?: "decimal";
};

export default function AccountForm({
  fields, action, busyLabel, busy, error, defaultEmail, onSubmit,
}: {
  fields: Field[];
  action: string;
  busyLabel: string;
  busy: boolean;
  error: string;
  defaultEmail?: string;
  onSubmit: (values: FormData) => Promise<void>;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const nextErrors: Record<string, string> = {};
    let firstInvalid: HTMLInputElement | undefined;

    for (const field of fields) {
      const input = form.elements.namedItem(field.name) as HTMLInputElement;
      const value = field.type === "password" ? input.value : input.value.trim();
      if (!value) {
        nextErrors[field.name] = `Enter ${field.label.toLowerCase()}.`;
      } else if (input.validity.typeMismatch) {
        nextErrors[field.name] = "Enter a valid email address.";
      } else if (field.inputMode === "decimal" && !/^\d+(?:[.,]\d+)?$/.test(value)) {
        nextErrors[field.name] = "Enter years of experience as a number, zero or greater.";
      }
      if (nextErrors[field.name]) firstInvalid ??= input;
    }

    setErrors(nextErrors);
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    void onSubmit(new FormData(form));
  }

  return (
    <form noValidate onSubmit={submit} aria-busy={busy} className="mt-5 grid gap-4">
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-semibold">{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            required
            type={field.type ?? "text"}
            autoComplete={field.autoComplete}
            inputMode={field.inputMode}
            autoCapitalize={field.type === "email" ? "none" : undefined}
            spellCheck={field.type === "email" ? false : undefined}
            defaultValue={field.name === "email" ? defaultEmail : undefined}
            aria-invalid={!!errors[field.name]}
            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            onChange={() => {
              if (errors[field.name]) setErrors(previous => ({ ...previous, [field.name]: "" }));
            }}
            className="mt-1 block min-h-12 w-full rounded-xl border border-[#868e9c] bg-white px-3 py-2 text-base focus:border-[#234fb8] focus:outline-2 focus:outline-offset-2 focus:outline-[#234fb8] aria-invalid:border-red-700"
          />
          {errors[field.name] && (
            <p id={`${field.name}-error`} role="alert" className="mt-1 text-sm text-red-800">{errors[field.name]}</p>
          )}
        </div>
      ))}
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button type="submit" disabled={busy} className={accountAction}>{busy ? busyLabel : action}</button>
      <p role="status" className="sr-only">{busy ? busyLabel : ""}</p>
    </form>
  );
}
