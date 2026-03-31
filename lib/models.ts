export interface ModelSpecs {
  motor: string
  torque: string
  battery: string
  range_assist: string
  range_throttle: string
  sensors: string
  weight: string
  colors_fr: string[]
  colors_en: string[]
  note_fr?: string
  note_en?: string
}

export interface Model {
  slug: string
  name: string
  image: string
  pills_fr: string[]
  pills_en: string[]
  desc_fr: string
  desc_en: string
  specs: ModelSpecs
}

export const MODELS: Model[] = [
  {
    slug: 'fz2-plus',
    name: 'FZ2+',
    image: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/Compano-fz2-A.jpg',
    pills_fr: ['500W', '36V 13Ah', '90 km'],
    pills_en: ['500W', '36V 13Ah', '56 mi'],
    desc_fr: "Motorisé 500W, autonomie 90 km. Capteur cadence + torque. L'entrée de gamme sans compromis.",
    desc_en: '500W rear motor, 90km range. Cadence + torque sensors. The accessible choice, no compromise.',
    specs: {
      motor: '500W roue arrière',
      torque: '60 Nm',
      battery: '36V 13Ah (468Wh)',
      range_assist: '90 km',
      range_throttle: '50 km',
      sensors: 'Cadence + Torque',
      weight: 'À confirmer',
      colors_fr: ['Blanc', 'Noir'],
      colors_en: ['White', 'Black'],
    },
  },
  {
    slug: 'fz3-plus',
    name: 'FZ3+',
    image: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/Compano-fz3-A.jpg',
    pills_fr: ['500W', '36V 20Ah', '140 km'],
    pills_en: ['500W', '36V 20Ah', '87 mi'],
    desc_fr: 'Batterie 720Wh, 140 km d\'autonomie. Double capteur 2-en-1. Le meilleur rapport perf/confort.',
    desc_en: '720Wh battery, 140km range. Dual sensor 2-in-1. Best performance-to-comfort ratio.',
    specs: {
      motor: '500W roue arrière',
      torque: '60 Nm',
      battery: '36V 20Ah (720Wh)',
      range_assist: '140 km',
      range_throttle: '50 km',
      sensors: 'Cadence + Torque (2-en-1)',
      weight: 'À confirmer',
      colors_fr: ['Blanc', 'Noir'],
      colors_en: ['White', 'Black'],
    },
  },
  {
    slug: 'se2',
    name: 'SE2',
    image: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/se2-imageA.png',
    pills_fr: ['Batterie intégrée', 'Urbain'],
    pills_en: ['Integrated battery', 'Urban'],
    desc_fr: 'Batterie cachée dans le cadre, recharge rapide. Léger et agile — le compagnon de la ville.',
    desc_en: 'Battery hidden inside the frame, fast charging. Light and nimble — your urban companion.',
    specs: {
      motor: 'À confirmer',
      torque: 'À confirmer',
      battery: 'Intégrée au cadre',
      range_assist: 'À confirmer',
      range_throttle: 'À confirmer',
      sensors: 'À confirmer',
      weight: 'À confirmer',
      colors_fr: ['Noir'],
      colors_en: ['Black'],
      note_fr: 'Recharge ultra-rapide, poids plume',
      note_en: 'Ultra-fast charging, lightweight',
    },
  },
  {
    slug: 'rx1-plus',
    name: 'RX1+',
    image: 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi/4661-1d3de360.jpg',
    pills_fr: ['500W · 48V', '720Wh', 'Puissance max'],
    pills_en: ['500W · 48V', '720Wh', 'Max power'],
    desc_fr: 'Moteur 48V 500W, 60Nm, batterie amovible par le dessus. Pour les côtes les plus abruptes.',
    desc_en: "48V 500W motor, 60Nm torque, top-removable battery. For Canada's steepest hills.",
    specs: {
      motor: '500W roue arrière + pédalier',
      torque: '60 Nm',
      battery: '48V 15Ah (720Wh) — amovible par le dessus',
      range_assist: 'À confirmer',
      range_throttle: 'À confirmer',
      sensors: 'Cadence (roue arrière) + Torque (pédalier)',
      weight: 'À confirmer',
      colors_fr: ['Noir'],
      colors_en: ['Black'],
    },
  },
]

export function getModelBySlug(slug: string): Model | undefined {
  return MODELS.find((m) => m.slug === slug)
}

export function getOtherModels(slug: string): Model[] {
  return MODELS.filter((m) => m.slug !== slug).slice(0, 2)
}
