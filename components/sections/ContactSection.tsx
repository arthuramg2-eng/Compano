'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { submitContact, type ContactState } from '@/app/[locale]/nous-joindre/actions'

const PHOTO = 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/DSC_7707.jpg'

export default function ContactSection() {
  const t = useTranslations('pages.contact')
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, null)

  return (
    <div className="min-h-screen pt-[72px] grid grid-cols-1 lg:grid-cols-2">

      {/* ── Photo ───────────────────────────────────────── */}
      <div className="relative hidden lg:block">
        <Image
          src={PHOTO}
          alt=""
          fill
          className="object-cover object-center"
          sizes="50vw"
          priority
        />
      </div>

      {/* ── Formulaire ──────────────────────────────────── */}
      <div className="bg-white flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-20">
        <div className="max-w-[480px] w-full mx-auto">

          {/* Eyebrow */}
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-orange font-medium mb-4">
            {t('eyebrow')}
          </p>

          {/* Titre */}
          <h1
            className="font-condensed font-black uppercase text-brand-black whitespace-pre-line mb-6"
            style={{ fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: '0.92' }}
          >
            {t('title')}
          </h1>

          {/* Notice SAV */}
          <p className="font-sans text-[11px] text-brand-black/55 leading-[1.7] mb-10 border-l-2 border-orange/40 pl-4">
            {t('notice')}
          </p>

          {/* Succès */}
          {state?.success ? (
            <div className="border border-brand-lgray2 bg-brand-cream p-8">
              <p className="font-condensed font-bold uppercase text-brand-black tracking-[0.08em] text-[18px] mb-2">
                {t('success_title')}
              </p>
              <p className="font-sans text-[14px] text-brand-gray leading-[1.75]">
                {t('success_msg')}
              </p>
            </div>
          ) : (
            <form action={action} className="flex flex-col gap-6">

              {/* Erreur globale */}
              {state?.error && (
                <p className="font-sans text-[12px] text-red-500 tracking-[0.05em]">
                  {t('error_msg')}
                </p>
              )}

              <Field label={t('name')} name="name" type="text" required />
              <Field label={t('email')} name="email" type="email" required />
              <Field label={t('phone')} name="phone" type="tel" />
              <Field label={t('message')} name="message" type="textarea" required />

              <button
                type="submit"
                disabled={pending}
                className="mt-2 flex items-center justify-center gap-3 bg-orange text-white font-sans font-medium text-[12px] tracking-[0.28em] uppercase px-8 py-4 transition-opacity duration-200 disabled:opacity-50"
              >
                {pending ? '…' : t('submit')}
                {!pending && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  )
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string
  name: string
  type: 'text' | 'email' | 'tel' | 'textarea'
  required?: boolean
}) {
  const base =
    'w-full bg-white border border-brand-lgray2 font-sans text-[14px] text-brand-black px-4 py-3 outline-none focus:border-orange transition-colors duration-200 resize-none'

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-[10px] tracking-[0.28em] uppercase text-brand-black/55 font-medium">
        {label}{required && <span className="text-orange ml-0.5">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea name={name} rows={5} required={required} className={base} />
      ) : (
        <input type={type} name={name} required={required} className={base} />
      )}
    </div>
  )
}
