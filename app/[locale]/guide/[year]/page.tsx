import { notFound } from 'next/navigation'
import Link from 'next/link'
import PdfViewer from './PdfViewer'

type Guide = {
  label: string
  pdf: string
  pdfEn?: string
  labelEn?: string
}

const GUIDES: Record<string, Guide> = {
  '2023': {
    label: 'Guide du propriétaire 2023 – 24',
    pdf: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/files/uploaded/Compano2023-v8-FR.pdf',
    pdfEn: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/files/uploaded/Compano2023-v8-EN.pdf',
    labelEn: "Owner's Guide 2023 – 24",
  },
  '2022': {
    label: 'Guide du propriétaire 2022',
    pdf: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/files/uploaded/Compano2022-FR.pdf',
    pdfEn: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/files/uploaded/Compano2022-EN.pdf',
    labelEn: "Owner's Guide 2022",
  },
  '2021': {
    label: 'Guide du propriétaire 2021',
    pdf: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/files/uploaded/Compano%202021FR_03.pdf',
  },
  '2020': {
    label: 'Guide du propriétaire 2020',
    pdf: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/files/uploaded/Compano%202020FR_V4_24_2020.pdf',
  },
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; year: string }>
}) {
  const { locale, year } = await params
  const guide = GUIDES[year]
  if (!guide) notFound()

  const isEn = locale === 'en'
  const activePdf = (isEn && guide.pdfEn) ? guide.pdfEn : guide.pdf
  const activeLabel = (isEn && guide.labelEn) ? guide.labelEn : guide.label
  const backHref = isEn ? '/en/outils' : '/outils'

  return (
    <div className="h-screen bg-white pt-[72px] flex flex-col overflow-hidden">

      {/* ── Bar supérieure ────────────────────────────────── */}
      <div className="border-b border-brand-lgray2 px-5 lg:px-12 py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={backHref}
            className="flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] uppercase text-brand-black/40 hover:text-brand-black transition-colors duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M12 7H2M6 3 2 7l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{locale === 'en' ? 'Back' : 'Retour'}</span>
          </Link>

          <div className="w-px h-4 bg-brand-lgray2" />

          <span
            className="font-condensed font-bold uppercase text-brand-black"
            style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', letterSpacing: '0.06em' }}
          >
            {activeLabel}
          </span>
        </div>

        <Link
          href={activePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-sans font-medium text-[11px] tracking-[0.2em] uppercase text-orange shrink-0"
        >
          <span>{isEn ? 'Download' : 'Télécharger'}</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 1v9M4.5 6.5 8 10l3.5-3.5M2 13h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* ── Visionneuse PDF ───────────────────────────────── */}
      <PdfViewer src={activePdf} title={activeLabel} />

    </div>
  )
}
