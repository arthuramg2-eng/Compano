const CDN = 'https://de.cdn-website.com/d6a2614a823743da9875be7d4ec06cf4/dms3rep/multi'

export interface SpecRow {
  label_fr: string
  label_en: string
  value_fr: string
  value_en: string
}

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
  images: string[]
  price_fr: string
  price_en: string
  size_fr: string
  size_en: string
  pills_fr: string[]
  pills_en: string[]
  desc_fr: string
  desc_en: string
  specs: ModelSpecs
  mechanical_fr: SpecRow[]
  mechanical_en: SpecRow[]
}

const MECH_FZ_FR: SpecRow[] = [
  { label_fr: 'Cadre',           label_en: 'Frame',         value_fr: 'Aluminium 6061',                              value_en: '6061 aluminum' },
  { label_fr: 'Freins',          label_en: 'Brakes',        value_fr: 'Disques hydrauliques',                        value_en: 'Hydraulic disc' },
  { label_fr: 'Manettes',        label_en: 'Brake levers',  value_fr: 'Avec coupe-moteur',                           value_en: 'With motor cutoff' },
  { label_fr: 'Potence',         label_en: 'Stem',          value_fr: 'Ajustable en aluminium',                      value_en: 'Adjustable aluminum' },
  { label_fr: 'Dérailleur',      label_en: 'Derailleur',    value_fr: 'S-Ride RD-200 8 vitesses (compat. Shimano)',  value_en: 'S-Ride RD-200 8-speed (Shimano compat.)' },
  { label_fr: 'Cassette',        label_en: 'Cassette',      value_fr: 'DNP 13-32T 8 vitesses',                       value_en: 'DNP 13-32T 8-speed' },
  { label_fr: 'Plateau avant',   label_en: 'Chainring',     value_fr: '52T',                                         value_en: '52T' },
  { label_fr: 'Jantes',          label_en: 'Rims',          value_fr: '26 po · aluminium double parois',             value_en: '26" double-wall aluminum' },
  { label_fr: 'Pneus',           label_en: 'Tires',         value_fr: 'CST E-Series 26×1.90 anti-crevaison',         value_en: 'CST E-Series 26×1.90 puncture-resistant' },
  { label_fr: 'Accessoires',     label_en: 'Accessories',   value_fr: 'Porte-bagages, ailes, lumières LED, poignées confort', value_en: 'Rear rack, fenders, LED lights, comfort grips' },
  { label_fr: 'Poids',           label_en: 'Weight',        value_fr: 'Vélo 25 kg · Batterie 3,6 kg',               value_en: 'Bike 25 kg · Battery 3.6 kg' },
]

// shared FR/EN for mech — same data, label language varies
const MECH_FZ: SpecRow[] = MECH_FZ_FR

export const MODELS: Model[] = [
  {
    slug: 'fz2-plus',
    name: 'FZ2+',
    image: `${CDN}/Compano-fz2-A.jpg`,
    images: [
      `${CDN}/Compano-fz2-A.jpg`,
    ],
    price_fr: '2 299 $',
    price_en: '$2,299',
    size_fr: 'Taille unique — 5pi4 à 5pi10',
    size_en: 'One size — 5\'4" to 5\'10"',
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
      weight: '25 kg',
      colors_fr: ['Blanc', 'Noir'],
      colors_en: ['White', 'Black'],
    },
    mechanical_fr: MECH_FZ,
    mechanical_en: MECH_FZ,
  },
  {
    slug: 'fz3-plus',
    name: 'FZ3+',
    image: `${CDN}/Compano-fz3-A.jpg`,
    images: [
      `${CDN}/Compano-fz3-A.jpg`,
      `${CDN}/4603.jpg`,
      `${CDN}/4602.jpg`,
      `${CDN}/4626.jpg`,
      `${CDN}/46058.jpg`,
      `${CDN}/4607.jpg`,
      `${CDN}/11206804.jpg`,
      `${CDN}/11206808.jpg`,
      `${CDN}/4470.jpg`,
      `${CDN}/11206815.jpg`,
      `${CDN}/4482.jpg`,
      `${CDN}/4491.jpg`,
      `${CDN}/4472.jpg`,
      `${CDN}/11206818.jpg`,
    ],
    price_fr: '2 699 $',
    price_en: '$2,699',
    size_fr: 'Taille unique — 5pi4 à 5pi10',
    size_en: 'One size — 5\'4" to 5\'10"',
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
      weight: '25 kg',
      colors_fr: ['Blanc craie', 'Bleu minuit'],
      colors_en: ['Chalk white', 'Midnight blue'],
    },
    mechanical_fr: MECH_FZ,
    mechanical_en: MECH_FZ,
  },
  {
    slug: 'se2',
    name: 'SE2',
    image: `${CDN}/se2-imageA.png`,
    images: [
      `${CDN}/se2-imageA.png`,
    ],
    price_fr: '2 499 $',
    price_en: '$2,499',
    size_fr: 'Taille unique',
    size_en: 'One size',
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
    mechanical_fr: [
      { label_fr: 'Cadre',       label_en: 'Frame',      value_fr: 'Aluminium — batterie intégrée',  value_en: 'Aluminum — integrated battery' },
      { label_fr: 'Freins',      label_en: 'Brakes',     value_fr: 'Disques hydrauliques',           value_en: 'Hydraulic disc' },
      { label_fr: 'Accessoires', label_en: 'Accessories',value_fr: 'Lumières LED',                   value_en: 'LED lights' },
    ],
    mechanical_en: [
      { label_fr: 'Cadre',       label_en: 'Frame',      value_fr: 'Aluminium — batterie intégrée',  value_en: 'Aluminum — integrated battery' },
      { label_fr: 'Freins',      label_en: 'Brakes',     value_fr: 'Disques hydrauliques',           value_en: 'Hydraulic disc' },
      { label_fr: 'Accessoires', label_en: 'Accessories',value_fr: 'Lumières LED',                   value_en: 'LED lights' },
    ],
  },
  {
    slug: 'rx1-plus',
    name: 'RX1+',
    image: `${CDN}/4661-1d3de360.jpg`,
    images: [
      `${CDN}/4661-1d3de360.jpg`,
    ],
    price_fr: '2 999 $',
    price_en: '$2,999',
    size_fr: 'Taille unique',
    size_en: 'One size',
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
    mechanical_fr: [
      { label_fr: 'Cadre',         label_en: 'Frame',         value_fr: 'Aluminium 6061',                     value_en: '6061 aluminum' },
      { label_fr: 'Freins',        label_en: 'Brakes',        value_fr: 'Disques hydrauliques',               value_en: 'Hydraulic disc' },
      { label_fr: 'Manettes',      label_en: 'Brake levers',  value_fr: 'Avec coupe-moteur',                  value_en: 'With motor cutoff' },
      { label_fr: 'Batterie',      label_en: 'Battery',       value_fr: 'Amovible par le dessus',             value_en: 'Top-removable' },
      { label_fr: 'Accessoires',   label_en: 'Accessories',   value_fr: 'Porte-bagages, ailes, lumières LED', value_en: 'Rear rack, fenders, LED lights' },
    ],
    mechanical_en: [
      { label_fr: 'Cadre',         label_en: 'Frame',         value_fr: 'Aluminium 6061',                     value_en: '6061 aluminum' },
      { label_fr: 'Freins',        label_en: 'Brakes',        value_fr: 'Disques hydrauliques',               value_en: 'Hydraulic disc' },
      { label_fr: 'Manettes',      label_en: 'Brake levers',  value_fr: 'Avec coupe-moteur',                  value_en: 'With motor cutoff' },
      { label_fr: 'Batterie',      label_en: 'Battery',       value_fr: 'Amovible par le dessus',             value_en: 'Top-removable' },
      { label_fr: 'Accessoires',   label_en: 'Accessories',   value_fr: 'Porte-bagages, ailes, lumières LED', value_en: 'Rear rack, fenders, LED lights' },
    ],
  },
]

export function getModelBySlug(slug: string): Model | undefined {
  return MODELS.find((m) => m.slug === slug)
}

export function getOtherModels(slug: string): Model[] {
  return MODELS.filter((m) => m.slug !== slug).slice(0, 3)
}
