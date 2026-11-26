'use client';

import { useActionState, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { sendContact, type ContactState, type ContactTopic } from '@/app/[locale]/(public)/contact/actions';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { LEAF_COLORS } from '@/lib/palette';

type FormText = Dictionary['contact']['form'];

const TOPICS: ContactTopic[] = ['booking', 'general', 'platform'];
const FILLS = Object.values(LEAF_COLORS).map((c) => c.fill);

const inputClass =
  'w-full rounded-2xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-navy focus:outline-none';

export function ContactForm({ text, locale }: { text: FormText; locale: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {
    status: 'idle',
    attempt: 0,
  });
  // Set once when the form first renders; the server rejects forms sent too fast.
  const [startedAt] = useState(() => Date.now());

  return (
    <section className="py-[var(--spacing-section)]">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl rounded-[32px] border border-line bg-card p-6 shadow-[0_14px_34px_rgba(29,53,112,0.06)] sm:p-10">
            {state.status === 'success' ? (
              <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
                <span className="flex gap-1.5" aria-hidden="true">
                  {FILLS.map((fill) => (
                    <span key={fill} className="leaf h-3.5 w-3.5" style={{ backgroundColor: fill }} />
                  ))}
                </span>
                <p className="max-w-md text-xl font-semibold text-ink">{text.successMessage}</p>
              </div>
            ) : (
              <form action={action} className="grid gap-6 sm:grid-cols-2">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="startedAt" value={startedAt} />
                {/* Honeypot: hidden from people, filled in by bots. */}
                <div className="absolute -start-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <Field label={text.nameLabel} htmlFor="cf-name">
                  <input id="cf-name" name="name" required maxLength={120} autoComplete="name" placeholder={text.namePlaceholder} className={inputClass} />
                </Field>
                <Field label={text.emailLabel} htmlFor="cf-email">
                  <input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" dir="ltr" placeholder={text.emailPlaceholder} className={`${inputClass} text-start`} />
                </Field>
                <Field label={text.countryLabel} htmlFor="cf-country">
                  <input id="cf-country" name="country" required maxLength={80} autoComplete="country-name" placeholder={text.countryPlaceholder} className={inputClass} />
                </Field>
                <Field label={text.phoneLabel} htmlFor="cf-phone">
                  <input id="cf-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" dir="ltr" placeholder={text.phonePlaceholder} className={`${inputClass} text-start`} />
                </Field>

                <fieldset className="sm:col-span-2">
                  <legend className="mb-3 font-semibold text-ink">{text.topicLabel}</legend>
                  <div className="flex flex-wrap gap-3">
                    {TOPICS.map((topic, i) => (
                      <label key={topic} className="cursor-pointer">
                        <input type="radio" name="topic" value={topic} required defaultChecked={i === 0} className="peer sr-only" />
                        <span className="flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy">
                          {text.topics[topic]}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Field label={text.messageLabel} htmlFor="cf-message" wide>
                  <textarea id="cf-message" name="message" rows={5} maxLength={5000} placeholder={text.messagePlaceholder} className={`${inputClass} resize-y`} />
                </Field>

                <div className="flex flex-col items-start gap-4 sm:col-span-2">
                  {(state.status === 'error' || state.status === 'invalid') && (
                    <p key={state.attempt} role="alert" className="rounded-2xl bg-leaf-red/10 px-4 py-3 text-ink">
                      {state.status === 'invalid' ? text.invalidMessage : text.errorMessage}
                    </p>
                  )}
                  <button type="submit" disabled={pending} className="pill h-[56px] bg-navy px-10 text-lg text-paper disabled:opacity-60">
                    {pending ? text.sendingText : text.submitText}
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function Field({ label, htmlFor, wide, children }: { label: string; htmlFor: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 ${wide ? 'sm:col-span-2' : ''}`}>
      <label htmlFor={htmlFor} className="font-semibold text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
