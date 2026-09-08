import { useMemo, useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { company, mailLink, telLink, whatsappLink } from '../content/company.js'
import { Icon } from './Icons.jsx'
import { Button } from './UI.jsx'

const EMPTY = {
  name: '',
  organisation: '',
  phone: '',
  email: '',
  type: '',
  volumes: '',
  place: '',
  budget: '',
  message: '',
  consent: false,
}

/**
 * Pas de back-end sur cette version : le formulaire met en forme une demande
 * de devis complète, puis laisse l’acheteur l’envoyer par WhatsApp, e-mail ou
 * presse-papiers. Zéro contact perdu, zéro serveur à maintenir.
 */
export function QuoteForm({ context, compact = false }) {
  const { t, lang } = useLang()
  const [values, setValues] = useState(EMPTY)
  const [error, setError] = useState(false)
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((prev) => ({ ...prev, [k]: v }))
    if (error) setError(false)
  }

  const contextLabel = lang === 'ar' ? 'التشكيلة' : lang === 'en' ? 'Range' : 'Gamme'

  const message = useMemo(() => {
    const strip = (label) => String(label).replace(' *', '')
    const rows = [
      t('form.msgIntro'),
      context && `${contextLabel} : ${context}`,
      `${strip(t('form.name'))} : ${values.name}`,
      values.organisation && `${strip(t('form.company'))} : ${values.organisation}`,
      `${strip(t('form.phone'))} : ${values.phone}`,
      values.email && `${strip(t('form.email'))} : ${values.email}`,
      values.type && `${strip(t('form.type'))} : ${values.type}`,
      values.volumes && `${strip(t('form.size'))} : ${values.volumes}`,
      values.place && `${strip(t('form.place'))} : ${values.place}`,
      values.budget && `${strip(t('form.budget'))} : ${values.budget}`,
      values.message && `${strip(t('form.message'))} : ${values.message}`,
    ].filter(Boolean)
    return rows.join('\n')
  }, [values, context, t, lang, contextLabel])

  const submit = (e) => {
    e.preventDefault()
    const ok = values.name.trim().length > 1 && values.phone.trim().length > 5 && values.message.trim().length > 8 && values.consent
    if (!ok) return setError(true)
    setDone(true)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      setError(true)
    }
  }

  const typeOpts = t('form.typeOpts')
  const budgetOpts = t('form.budgetOpts')
  const emailHref = mailLink({
    subject: `${t('form.msgIntro')}${context ? ` — ${context}` : ''}`,
    body: message,
  })

  if (done) {
    return (
      <div className="card bg-paper p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-palm text-bone">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <h3 className="h3">{t('contact.success')}</h3>
            <p className="body-sm mt-2">{t('contact.successBody')}</p>
          </div>
        </div>

        <pre
          className="mt-6 max-h-60 overflow-auto whitespace-pre-wrap rounded-soft border border-line bg-bone p-4 text-start font-sans text-[0.8125rem] leading-relaxed text-ink-soft"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {message}
        </pre>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button href={whatsappLink(message)} target="_blank" rel="noopener" icon="whatsapp">
            {t('contact.sendWhatsapp')}
          </Button>
          {emailHref ? (
            <Button variant="ghost" href={emailHref} icon="mail">
              {t('contact.sendEmail')}
            </Button>
          ) : (
            <Button variant="ghost" href={telLink(0)} icon="phone">
              {t('cta.call')}
            </Button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <button type="button" onClick={copy} className="link-arrow !border-none !p-0">
            <Icon name="layers" size={14} />
            {copied ? t('contact.copied') : t('contact.copy')}
          </button>
          <button type="button" onClick={() => setDone(false)} className="link-arrow !border-none !p-0 text-stone">
            {t('form.submit')} ↺
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="card bg-paper p-6 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="h3">{t('contact.formTitle')}</h3>
        {context && <span className="chip">{context}</span>}
      </div>
      <p className="body-sm mt-2">{t('contact.formIntro')}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label={t('form.name')} id="qf-name" required>
          <input id="qf-name" className="input" placeholder={t('form.namePh')} value={values.name} onChange={set('name')} required autoComplete="name" />
        </Field>
        <Field label={t('form.company')} id="qf-orga">
          <input id="qf-orga" className="input" placeholder={t('form.companyPh')} value={values.organisation} onChange={set('organisation')} autoComplete="organization" />
        </Field>
        <Field label={t('form.phone')} id="qf-phone" required>
          <input id="qf-phone" type="tel" dir="ltr" className="input tabular" placeholder={t('form.phonePh')} value={values.phone} onChange={set('phone')} required autoComplete="tel" />
        </Field>
        <Field label={t('form.email')} id="qf-email">
          <input id="qf-email" type="email" dir="ltr" className="input" placeholder={t('form.emailPh')} value={values.email} onChange={set('email')} autoComplete="email" />
        </Field>
        <Field label={t('form.type')} id="qf-type" required>
          <div className="relative">
            <select id="qf-type" className="input appearance-none pe-9" value={values.type} onChange={set('type')} required>
              <option value="">{t('form.typePh')}</option>
              {typeOpts.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <Icon name="chevron" size={16} className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-stone" />
          </div>
        </Field>
        <Field label={t('form.size')} id="qf-size">
          <input id="qf-size" className="input" placeholder={t('form.sizePh')} value={values.volumes} onChange={set('volumes')} />
        </Field>
        <Field label={t('form.place')} id="qf-place">
          <input id="qf-place" className="input" placeholder={t('form.placePh')} value={values.place} onChange={set('place')} />
        </Field>
      </div>

      {!compact && (
        <div className="mt-5">
          <Field label={t('form.budget')} id="qf-budget">
            <div className="flex flex-wrap gap-2">
              {budgetOpts.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setValues((p) => ({ ...p, budget: p.budget === o ? '' : o }))}
                  aria-pressed={values.budget === o}
                  className={`chip transition-colors hover:border-palm/50 ${values.budget === o ? 'chip--active' : ''}`}
                >
                  {o}
                </button>
              ))}
            </div>
          </Field>
        </div>
      )}

      <div className="mt-5">
        <Field label={t('form.message')} id="qf-message" required>
          <textarea id="qf-message" rows={4} className="input resize-y" placeholder={t('form.messagePh')} value={values.message} onChange={set('message')} required />
        </Field>
      </div>

      <label className="mt-5 flex items-start gap-3 text-[0.8125rem] text-stone">
        <input type="checkbox" checked={values.consent} onChange={set('consent')} className="mt-1 h-4 w-4 accent-palm" />
        <span>{t('form.consent')}</span>
      </label>

      {error && (
        <p role="alert" className="mt-4 rounded-soft border border-clay/40 bg-clay/10 px-3 py-2 text-[0.8125rem] text-clay">
          {t('form.invalid')}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" className="min-w-52">
          {t('form.submit')}
        </Button>
        <a href={telLink(0)} className="link-arrow">
          {t('cta.call')} · <span dir="ltr">{company.phones[0].display}</span>
        </a>
      </div>
    </form>
  )
}

function Field({ label, id, required, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && <span className="text-clay"> *</span>}
      </label>
      {children}
    </div>
  )
}
