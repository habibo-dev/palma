import { useLang } from '../lib/i18n.jsx'
import { Button, Section } from '../components/UI.jsx'
import { Seo } from '../components/Seo.jsx'

export default function NotFound() {
  const { t } = useLang()
  return (
    <>
      <Seo path="/404" title={`404 — ${t('notFound.title')}`} />
      <Section tone="shell" className="!pt-[11rem] lg:!pt-[14rem]" tight>
        <div className="mx-auto max-w-xl text-center">
          <p className="num mx-auto w-fit">404</p>
          <h1 className="h1 mt-5">{t('notFound.title')}</h1>
          <p className="body-sm mt-4">{t('notFound.body')}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/">{t('notFound.cta')}</Button>
            <Button variant="ghost" to="/gammes">
              {t('cta.ranges')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
